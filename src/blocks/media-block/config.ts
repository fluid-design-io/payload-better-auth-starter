import type { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlock",
  imageURL: "/images/blocks/media-block.png",
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "payload-uploads",
      required: true,
    },
  ],
};
