import type { Plugin } from "payload";
import { betterAuthPlugin } from "payload-auth/better-auth";
import { betterAuthPluginOptions } from "@/lib/auth/options";
import {
  s3StoragePluginPrivate,
  s3StoragePluginPublic,
} from "./s3-storage-plugin";
import { seoPlugin } from "./seo-plugin";

export const plugins: Plugin[] = [
  betterAuthPlugin(betterAuthPluginOptions),
  seoPlugin,
  //* [Extra] Form Plugin *//
  // formPlugin,
  s3StoragePluginPublic,
  s3StoragePluginPrivate,
];
