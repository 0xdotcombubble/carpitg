import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }: { params: { slug: string }, fetch: Function }) => {
  try {
    // Load all portfolio items using the API endpoint
    const response = await fetch('/api/content/portfolio');

    if (!response.ok) {
      throw error(response.status, 'Failed to load portfolio');
    }

    const allItems = await response.json();

    // Find the current portfolio item by slug
    const currentItem = allItems.find((item: any) => item.slug === params.slug);

    if (!currentItem) {
      throw error(404, 'Portfolio item not found');
    }

    // Get other portfolio items (excluding the current one)
    const otherItems = allItems.filter((item: any) => item.slug !== params.slug);

    return {
      item: currentItem,
      otherItems: otherItems
    };
  } catch (err) {
    console.error('Error loading portfolio item:', err);
    throw error(500, 'Failed to load portfolio data');
  }
};