import { getServerSideURL } from '@/lib/payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { authenticatedOrPublished } from '@/access/authenticated-or-published'
import { ContentBlock } from '@/blocks/content-block/config'
import { GalleryBlock } from '@/blocks/gallery-block/config'
import { MediaBlock } from '@/blocks/media-block/config'
import { slugField } from '@/fields/slug'
import { populateAuthors } from './hooks/populate-authors'
import { revalidateDelete, revalidatePost } from './hooks/revalidate-post'

export const Blog: CollectionConfig<'blog'> = {
  slug: 'blog',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  trash: true,
  access: {
    read: authenticatedOrPublished,
    create: () => process.env.NODE_ENV === 'development',
    delete: () => process.env.NODE_ENV === 'development',
    update: () => process.env.NODE_ENV === 'development',
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'blog'>
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    hideAPIURL: true,
    group: 'Acme',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        return `${getServerSideURL()}/blog/${data.slug}?draft=true`
      },
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
                    }),
                    BlocksFeature({
                      blocks: [MediaBlock, GalleryBlock, ContentBlock],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    UnorderedListFeature(),
                    OrderedListFeature(),
                    BoldFeature(),
                    ItalicFeature(),
                    UnderlineFeature(),
                    AlignFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'payload-uploads',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Company', value: 'company' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Newsroom', value: 'newsroom' },
        { label: 'Partners', value: 'partners' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Press', value: 'press' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Category of the blog post',
      },
      defaultValue: 'company',
      hasMany: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        hidden: process.env.NODE_ENV !== 'development',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
