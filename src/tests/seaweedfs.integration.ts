/** Run explicitly against the isolated local stack: bun src/tests/seaweedfs.integration.ts */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { randomBytes, randomUUID } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import {
	CopyObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	HeadBucketCommand,
	HeadObjectCommand,
	ListObjectsV2Command,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'

const server = process.env.TEST_SERVER_URL || 'http://localhost:3000'
const endpoint = process.env.S3_ENDPOINT!
assert.match(server, /^http:\/\/(localhost|127\.0\.0\.1):\d+$/)
assert.match(endpoint, /^http:\/\/(localhost|127\.0\.0\.1):\d+$/)
assert.equal(
	execFileSync(
		'docker',
		[
			'inspect',
			'acme-seaweedfs',
			'--format',
			'{{ index .Config.Labels "com.docker.compose.project" }}',
		],
		{ encoding: 'utf8' },
	).trim(),
	'payload-seaweedfs-test',
	'This test must run against the dedicated payload-seaweedfs-test Compose project.',
)
const config = {
	endpoint,
	forcePathStyle: true,
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID!,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
	},
}
const s3 = new S3Client(config)
const buckets = [process.env.S3_BUCKET!, process.env.S3_PRIVATE_BUCKET!]
const run = randomUUID()
const results: { name: string; status: string; detail?: string }[] = []
const objects: { Bucket: string; Key: string }[] = []
const documents: { collection: string; id: string }[] = []
let cookie = ''
let userId = ''

async function check(name: string, fn: () => Promise<void>) {
	try {
		await fn()
		results.push({ name, status: 'PASS' })
		console.log(`PASS ${name}`)
	} catch (error) {
		results.push({ name, status: 'FAIL', detail: String(error) })
		throw error
	}
}

async function json(path: string, init: RequestInit = {}) {
	const res = await fetch(`${server}${path}`, {
		...init,
		headers: { 'Content-Type': 'application/json', ...init.headers },
	})
	const body = await res.json()
	assert.ok(res.ok, `${path}: ${res.status} ${JSON.stringify(body)}`)
	return { res, body }
}

async function bytes(Bucket: string, Key: string) {
	const result = await s3.send(new GetObjectCommand({ Bucket, Key }))
	return Buffer.from(await result.Body!.transformToByteArray())
}

try {
	await check('Both buckets are pre-created', async () => {
		for (const Bucket of buckets) await s3.send(new HeadBucketCommand({ Bucket }))
	})
	for (const Bucket of buckets) {
		await check(`S3 put/head/get/list/copy/delete: ${Bucket}`, async () => {
			const Key = `integration/${run}/original.txt`
			const copied = `integration/${run}/copy.txt`
			objects.push({ Bucket, Key }, { Bucket, Key: copied })
			const content = Buffer.from('SeaweedFS integration — exact bytes')
			await s3.send(new PutObjectCommand({ Bucket, Key, Body: content, ContentType: 'text/plain' }))
			const head = await s3.send(new HeadObjectCommand({ Bucket, Key }))
			assert.equal(head.ContentLength, content.length)
			assert.equal(head.ContentType, 'text/plain')
			assert.deepEqual(await bytes(Bucket, Key), content)
			const list = await s3.send(
				new ListObjectsV2Command({ Bucket, Prefix: `integration/${run}/` }),
			)
			assert.ok(list.Contents?.some((item) => item.Key === Key))
			await s3.send(new CopyObjectCommand({ Bucket, Key: copied, CopySource: `${Bucket}/${Key}` }))
			assert.deepEqual(await bytes(Bucket, copied), content)
			await s3.send(new DeleteObjectCommand({ Bucket, Key: copied }))
			await assert.rejects(
				s3.send(new HeadObjectCommand({ Bucket, Key: copied })),
				(e: any) => e.$metadata.httpStatusCode === 404,
			)
		})
		await check(`Anonymous read/list/write denied: ${Bucket}`, async () => {
			for (const [path, method] of [
				[`/${Bucket}/integration/${run}/original.txt`, 'GET'],
				[`/${Bucket}?list-type=2`, 'GET'],
				[`/${Bucket}/integration/${run}/unauthorized.txt`, 'PUT'],
			] as const) {
				const res = await fetch(`${endpoint}${path}`, { method })
				assert.equal(res.status, 403, `${method} ${path}`)
			}
		})
	}
	await check('Wrong credentials rejected', async () => {
		const wrong = new S3Client({
			...config,
			credentials: { ...config.credentials, secretAccessKey: randomBytes(24).toString('hex') },
		})
		try {
			await assert.rejects(
				wrong.send(new HeadBucketCommand({ Bucket: buckets[0] })),
				(e: any) => e.$metadata.httpStatusCode === 403,
			)
		} finally {
			wrong.destroy()
		}
	})
	await check('Presigned PUT and GET with content disposition', async () => {
		const Bucket = buckets[1]
		const Key = `integration/${run}/presigned.txt`
		objects.push({ Bucket, Key })
		const put = await getSignedUrl(
			s3,
			new PutObjectCommand({ Bucket, Key, Body: 'presigned contents' }),
			{ expiresIn: 120 },
		)
		const uploaded = await fetch(put, { method: 'PUT', body: 'presigned contents' })
		assert.ok(uploaded.ok, `Presigned PUT: ${uploaded.status} ${await uploaded.text()}`)
		const get = await getSignedUrl(
			s3,
			new GetObjectCommand({
				Bucket,
				Key,
				ResponseContentDisposition: 'attachment; filename="test.txt"',
			}),
			{ expiresIn: 120 },
		)
		const res = await fetch(get)
		assert.equal(res.status, 200)
		assert.equal(res.headers.get('content-disposition'), 'attachment; filename="test.txt"')
		assert.equal(await res.text(), 'presigned contents')
	})
	await check('12 MiB multipart upload preserves exact bytes', async () => {
		const Bucket = buckets[0]
		const Key = `integration/${run}/multipart.bin`
		objects.push({ Bucket, Key })
		const content = randomBytes(12 * 1024 * 1024)
		await new Upload({
			client: s3,
			params: { Bucket, Key, Body: content },
			partSize: 5 * 1024 * 1024,
		}).done()
		assert.deepEqual(await bytes(Bucket, Key), content)
	})
	await check('Better Auth test user can sign up and authenticate', async () => {
		const email = `seaweed-${run}@test.local`
		const password = randomBytes(24).toString('hex')
		const signup = await json('/api/auth/sign-up/email', {
			method: 'POST',
			body: JSON.stringify({ name: 'Storage Integration', email, password }),
		})
		userId = signup.body.user.id
		if (!signup.body.user.emailVerified) {
			// Verification is captured locally in Inbucket; no external email delivery.
			const mailbox = email.split('@')[0]
			let verification: string | undefined
			for (let attempt = 0; attempt < 20 && !verification; attempt++) {
				const messages = (await (
					await fetch(`http://localhost:9000/api/v1/mailbox/${mailbox}`)
				).json()) as any[]
				for (const message of messages) {
					const detail = await (
						await fetch(`http://localhost:9000/api/v1/mailbox/${mailbox}/${message.id}`)
					).json()
					verification = `${detail.body.text} ${detail.body.html}`
						.match(/http:\/\/localhost:3000\/api\/auth\/verify-email\?[^\s"<>]+/)?.[0]
						?.replaceAll('&amp;', '&')
				}
				if (!verification) await Bun.sleep(500)
			}
			assert.ok(verification, 'Local verification email not found')
			const res = await fetch(verification, { redirect: 'manual' })
			assert.ok(res.status < 400)
		}
		const login = await json('/api/auth/sign-in/email', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		})
		cookie = login.res.headers
			.getSetCookie()
			.map((value) => value.split(';')[0])
			.join('; ')
		assert.ok(cookie)
	})
	await check(
		'Payload public image upload generates sizes and stays publicly readable',
		async () => {
			const image = await sharp({
				create: { width: 1600, height: 1200, channels: 3, background: '#4477aa' },
			})
				.png()
				.toBuffer()
			const data = new FormData()
			data.set('_payload', JSON.stringify({ alt: 'SeaweedFS test image' }))
			data.set('file', new Blob([image], { type: 'image/png' }), `${run}.png`)
			const res = await fetch(`${server}/api/payload-uploads`, {
				method: 'POST',
				headers: { cookie },
				body: data,
			})
			const body = await res.json()
			assert.equal(res.status, 201, JSON.stringify(body))
			const doc = body.doc
			documents.push({ collection: 'payload-uploads', id: doc.id })
			assert.ok(doc.blurDataURL?.startsWith('data:'))
			assert.ok(doc.url.includes('/api/payload-uploads/file/'))
			for (const variant of [doc, ...Object.values(doc.sizes)] as any[]) {
				assert.ok(variant.filename)
				const response = await fetch(new URL(variant.url, server))
				assert.equal(response.status, 200)
				const stored = await bytes(buckets[0], `payload-uploads/${variant.filename}`)
				assert.deepEqual(Buffer.from(await response.arrayBuffer()), stored)
			}
			const range = await fetch(new URL(doc.url, server), { headers: { Range: 'bytes=0-9' } })
			assert.equal(range.status, 206)
			assert.equal((await range.arrayBuffer()).byteLength, 10)
		},
	)
	await check('Payload private file requires authentication', async () => {
		const data = new FormData()
		data.set('_payload', JSON.stringify({ title: 'SeaweedFS private test' }))
		data.set('file', new Blob(['private contents'], { type: 'text/plain' }), `${run}.txt`)
		const res = await fetch(`${server}/api/private-uploads`, {
			method: 'POST',
			headers: { cookie },
			body: data,
		})
		const body = await res.json()
		assert.equal(res.status, 201, JSON.stringify(body))
		documents.push({ collection: 'private-uploads', id: body.doc.id })
		const url = new URL(body.doc.url, server)
		const anon = await fetch(url)
		assert.ok([401, 403].includes(anon.status), `Anonymous private download: ${anon.status}`)
		const authenticated = await fetch(url, { headers: { cookie } })
		assert.equal(authenticated.status, 200)
		assert.equal(await authenticated.text(), 'private contents')
		assert.equal(
			(await fetch(`${endpoint}/${buckets[1]}/private-uploads/${body.doc.filename}`)).status,
			403,
		)
	})
	await check('Container recreation preserves S3 objects and Payload files', async () => {
		execFileSync(
			'docker',
			[
				'compose',
				'-p',
				'payload-seaweedfs-test',
				'up',
				'-d',
				'--force-recreate',
				'--wait',
				'seaweedfs',
			],
			{ stdio: 'inherit' },
		)
		for (const Bucket of buckets)
			assert.equal(
				(await bytes(Bucket, `integration/${run}/original.txt`)).toString(),
				'SeaweedFS integration — exact bytes',
			)
		for (const doc of documents) {
			const { body } = await json(`/api/${doc.collection}/${doc.id}`, { headers: { cookie } })
			assert.equal((await fetch(new URL(body.url, server), { headers: { cookie } })).status, 200)
		}
	})
	await check(
		'Payload deletion removes original files and all generated sizes from S3',
		async () => {
			for (const doc of documents) {
				const { body } = await json(`/api/${doc.collection}/${doc.id}`, { headers: { cookie } })
				const names = [
					body.filename,
					...Object.values(body.sizes || {}).map((size: any) => size.filename),
				]
				await json(`/api/${doc.collection}/${doc.id}`, { method: 'DELETE', headers: { cookie } })
				const Bucket = doc.collection === 'payload-uploads' ? buckets[0] : buckets[1]
				for (const filename of names)
					await assert.rejects(
						s3.send(new HeadObjectCommand({ Bucket, Key: `${doc.collection}/${filename}` })),
						(e: any) => e.$metadata.httpStatusCode === 404,
					)
			}
			documents.length = 0
		},
	)
} finally {
	for (const doc of documents)
		await fetch(`${server}/api/${doc.collection}/${doc.id}`, {
			method: 'DELETE',
			headers: { cookie },
		}).catch(() => undefined)
	for (const object of objects)
		await s3.send(new DeleteObjectCommand(object)).catch(() => undefined)
	if (userId && cookie)
		await fetch(`${server}/api/users/${userId}`, { method: 'DELETE', headers: { cookie } }).catch(
			() => undefined,
		)
	s3.destroy()
	mkdirSync('.scratch', { recursive: true })
	writeFileSync(
		'.scratch/seaweedfs-results.json',
		JSON.stringify({ testedAt: new Date().toISOString(), results }, null, 2),
	)
}
