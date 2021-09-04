// .tina/schema.ts
import { defineSchema, TinaCloudCollection } from '@tinacms/cli'


const globalSchema: TinaCloudCollection = {
    label: 'Global',
    name: 'global',
    path: 'content/global',
    fields: [
        {
            type: 'object',
            label: 'Header',
            name: 'header',
            fields: [
                {
                    type: 'object',
                    label: 'Nav Links',
                    name: 'nav',
                    list: true,
                    ui: {
                        defaultItem: {
                            href: 'home',
                            label: 'Home',
                        },
                    },
                    fields: [
                        {
                            type: 'string',
                            label: 'Link',
                            name: 'href',
                        },
                        {
                            type: 'string',
                            label: 'Label',
                            name: 'label',
                        },
                    ],
                },
            ],
        }
    ],
}


export default defineSchema({
    collections: [
        {
            label: 'Home',
            name: 'home',
            path: 'content/home',
            format: 'json',
            fields: [
                {
                    type: 'string',
                    label: 'Title',
                    name: 'title',
                },
                {
                    type: 'string',
                    label: 'description',
                    name: 'description',
                },
            ],
        },
        globalSchema,
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

