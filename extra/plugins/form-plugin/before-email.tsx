import AcmeTemplate from '@/lib/email/email-template'

import type { BeforeEmail } from '@payloadcms/plugin-form-builder/types'
import { render } from '@react-email/render'
import parse from 'html-react-parser'

const beforeEmail: BeforeEmail = (emailsToSend, _beforeChangeParams) => {
  // modify the emails in any way before they are sent
  return Promise.all(
    emailsToSend.map(async (email) => ({
      ...email,
      html: await render(<AcmeTemplate heading={email.subject} content={parse(email.html)} />),
    }))
  )
}

export default beforeEmail
