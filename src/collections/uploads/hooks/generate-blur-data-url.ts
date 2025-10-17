import type { CollectionBeforeChangeHook } from 'payload'
import sharp from 'sharp'
import type { PayloadUpload } from '@/payload-types'

export const generateBlurDataURL: CollectionBeforeChangeHook<PayloadUpload> = async ({
  req,
  operation,
  data,
}) => {
  if (!req.file || !req.file.data) {
    return data
  }

  const mimetype = req.file.mimetype

  const isValidImage = mimetype.startsWith('image/') && mimetype !== 'image/svg+xml'

  if (!isValidImage || data.blurDataURL) {
    return data
  }

  const buffer = await sharp(req.file.data).resize({ width: 8 }).toFormat('webp').toBuffer()

  const base64 = buffer.toString('base64')
  data.blurDataURL = `data:${mimetype};base64,${base64}`

  return data
}
