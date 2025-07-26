import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks/revalidate-global";

export const GlobalPrivacy: GlobalConfig<"global-privacy"> = {
  slug: "global-privacy",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures, defaultFeatures }) => [
          ...rootFeatures,
          ...defaultFeatures,
        ],
      }),
    },
  ],
  hooks: {
    afterChange: [(args) => revalidateGlobal(args, "global-privacy")],
  },
};
