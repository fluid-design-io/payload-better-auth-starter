import {
  BoldFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
} from "@payloadcms/richtext-lexical";
import type { Config } from "payload";

export const defaultLexical: Config["editor"] = lexicalEditor({
  features: ({ defaultFeatures, rootFeatures }) => {
    return [
      ...defaultFeatures,
      ...rootFeatures,
      InlineToolbarFeature(),
      ParagraphFeature(),
      UnderlineFeature(),
      HeadingFeature({
        enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
      }),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: ["blog"],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ("name" in field && field.name === "url") return false;
            return true;
          });

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: "url",
              type: "text",
              admin: {
                condition: ({ linkType }) => linkType !== "internal",
              },
              label: ({ t }) => t("fields:enterURL"),
              required: true,
            },
          ];
        },
      }),
    ];
  },
});
