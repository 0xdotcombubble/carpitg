import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }: { params: { slug: string }, fetch: Function }) => {
  try {
    // Load all pricing items using the API endpoint
    const response = await fetch('/api/content/pricing');

    if (!response.ok) {
      throw error(response.status, 'Failed to load pricing');
    }

    const allItems = await response.json();

    // Find the current pricing item by slug
    const currentItem = allItems.find((item: any) => item.slug === params.slug);

    if (!currentItem) {
      throw error(404, 'Pricing item not found');
    }

    // Get other pricing items (excluding the current one)
    const otherItems = allItems.filter((item: any) => item.slug !== params.slug);

    return {
      item: currentItem,
      otherItems: otherItems
    };
  } catch (err) {
    console.error('Error loading pricing item:', err);
    throw error(500, 'Failed to load pricing data');
  }
};