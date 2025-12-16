import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'order', 'updatedAt'],
    listSearchableFields: ['title', 'description', 'category'],
  },
  access: {
    read: () => true, // Public read access
    create: ({ req }) => Boolean(req.user), // Only authenticated users can create
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Service Title',
      required: true,
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      label: 'Service Description',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      required: true,
      admin: {
        description: 'e.g., "35.000 Ft-tól" or "Ártól függően"',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'Exterior Cleaning', value: 'exterior' },
        { label: 'Interior Cleaning', value: 'interior' },
        { label: 'Paint Protection', value: 'protection' },
        { label: 'Detailing', value: 'detailing' },
        { label: 'Special Services', value: 'special' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Service Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Service Image',
      admin: {
        description: 'Optional image to showcase this service',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Service',
      defaultValue: false,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.order) {
          data.order = Date.now() // Simple ordering system
        }
        return data
      },
    ],
  },
}