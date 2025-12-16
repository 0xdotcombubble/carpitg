import { error } from '@sveltejs/kit';

export const load = async ({ params, fetch }: { params: { slug: string }, fetch: Function }) => {
  try {
    // Load all services using the API endpoint
    const response = await fetch('/api/content/services');

    if (!response.ok) {
      throw error(response.status, 'Failed to load services');
    }

    const allServices = await response.json();

    // Find the current service by slug
    const currentService = allServices.find((service: any) => service.slug === params.slug);

    if (!currentService) {
      throw error(404, 'Service not found');
    }

    // Get other services (excluding the current one)
    const otherServices = allServices.filter((service: any) => service.slug !== params.slug);

    return {
      service: currentService,
      otherServices: otherServices
    };
  } catch (err) {
    console.error('Error loading service:', err);
    throw error(500, 'Failed to load service data');
  }
};