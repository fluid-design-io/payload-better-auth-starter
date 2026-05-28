import AcmeTemplate from '@/lib/email/email-template'

import type { BeforeEmail } from '@payloadcms/plugin-form-builder/types'
import { render } from '@react-email/render'

const beforeEmail: BeforeEmail = (emailsToSend, _beforeChangeParams) => {
	return Promise.all(
		emailsToSend.map(async (email) => {
			const heading = email.subject?.trim() || 'New form submission'
			const html = email.html?.trim()

			return {
				...email,
				html: await render(
					<AcmeTemplate heading={heading} content={html ? <RawEmailHtml html={html} /> : null} />,
				),
			}
		}),
	)
}

function RawEmailHtml({ html }: { html: string }) {
	return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default beforeEmail
