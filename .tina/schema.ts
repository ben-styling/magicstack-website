// .tina/schema.ts
import { defineSchema } from '@tinacms/cli'

export default defineSchema({
  collections: [
    {
      label: 'Features',
      name: 'feature',
      path: 'content/features',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Short description',
          name: 'shortDescription',
        },
      ],
    },
  ],
})



