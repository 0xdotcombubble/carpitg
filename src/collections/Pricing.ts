import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Pricing: CollectionConfig = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing Package',
    plural: 'Pricing Packages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'popular', 'order', 'updatedAt'],
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
      label: 'Package Title',
      required: true,
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      label: 'Package Description',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      required: true,
      admin: {
        description: 'e.g., "45.000 Ft" or "85.000 - 120.000 Ft"',
      },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration',
      required: true,
      admin: {
        description: 'e.g., "2-3 óra" or "Egész nap"',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'Basic Package', value: 'basic' },
        { label: 'Premium Package', value: 'premium' },
        { label: 'Luxury Package', value: 'luxury' },
        { label: 'Custom Package', value: 'custom' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Package Features',
      required: true,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          label: 'Feature Description',
        },
        {
          name: 'included',
          type: 'checkbox',
          label: 'Included',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Package Image',
      admin: {
        description: 'Optional image to showcase this package',
      },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Included Services',
      admin: {
        description: 'Link to services included in this package',
      },
    },
    {
      name: 'popular',
      type: 'checkbox',
      label: 'Most Popular Package',
      defaultValue: false,
      admin: {
        description: 'Mark this package as the most popular choice',
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
      name: 'vehicleTypes',
      type: 'select',
      label: 'Suitable for Vehicle Types',
      hasMany: true,
      options: [
        { label: 'Small Car (Suzuki Swift, Fiat 500)', value: 'small' },
        { label: 'Medium Car (VW Golf, Ford Focus)', value: 'medium' },
        { label: 'Large Car (BMW 5 Series, Audi A6)', value: 'large' },
        { label: 'SUV/MPV', value: 'suv' },
        { label: 'Van/Truck', value: 'van' },
        { label: 'Luxury/Sports Car', value: 'luxury' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
      admin: {
        description: 'Any special conditions, disclaimers, or additional information',
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