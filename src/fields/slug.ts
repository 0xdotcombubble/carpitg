import type { Field } from 'payload'

export function slugField(sourceField: string): Field {
  return {
    name: 'slug',
    type: 'text',
    label: 'Slug',
    unique: true,
    index: true,
    admin: {
      description: 'Auto-generated from title, or enter custom value',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (!value && data?.[sourceField]) {
            // Simple slugify function
            return data[sourceField]
              .toLowerCase()
              .replace(/[^a-z0-9áéíóöőúüű\s-]/g, '') // Keep Hungarian characters
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .replace(/-+/g, '-') // Replace multiple hyphens with single
              .trim()
          }
          return value
        },
      ],
    },
  }
}