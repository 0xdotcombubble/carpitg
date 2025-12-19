import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  labels: {
    singular: 'Portfolio Item',
    plural: 'Portfolio',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'order', 'updatedAt'],
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
      label: 'Project Title',
      required: true,
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      label: 'Project Description',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'Külső Tisztítás', value: 'Külső' },
        { label: 'Belső Tisztítás', value: 'Belső' },
        { label: 'Teljes Tisztítás', value: 'Teljes' },
        { label: 'Fényezés Korrekció', value: 'Fényezés' },
        { label: 'Kerámia Bevonat', value: 'Kerámia' },
        { label: 'Restaurálás', value: 'Restaurálás' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Project Image',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption',
        },
      ],
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Services Performed',
      admin: {
        description: 'Link to services that were performed on this project',
      },
    },
    {
      name: 'beforeAfter',
      type: 'group',
      label: 'Before/After Images',
      fields: [
        {
          name: 'before',
          type: 'upload',
          relationTo: 'media',
          label: 'Before Image',
        },
        {
          name: 'after',
          type: 'upload',
          relationTo: 'media',
          label: 'After Image',
        },
      ],
    },
    {
      name: 'vehicleInfo',
      type: 'group',
      label: 'Vehicle Information',
      fields: [
        {
          name: 'make',
          type: 'text',
          label: 'Vehicle Make',
        },
        {
          name: 'model',
          type: 'text',
          label: 'Vehicle Model',
        },
        {
          name: 'year',
          type: 'number',
          label: 'Year',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        description: 'Featured projects appear prominently on the homepage',
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
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.order) {
          data.order = Date.now()
        }
        return data
      },
    ],
  },
}
