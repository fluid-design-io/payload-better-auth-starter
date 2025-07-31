import type { BeforeEmail } from "@payloadcms/plugin-form-builder/types";
import { render } from "@react-email/render";
import parse from "html-react-parser";
import AcmeTemplate from "@/lib/email/email-template";

const beforeEmail: BeforeEmail = (emailsToSend, beforeChangeParams) => {
  // modify the emails in any way before they are sent
  return Promise.all(
    emailsToSend.map(async (email) => ({
      ...email,
      html: await render(
        <AcmeTemplate heading={email.subject} content={parse(email.html)} />
      ),
    }))
  );
};

export default beforeEmail;
