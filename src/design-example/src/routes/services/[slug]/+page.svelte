<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import SmoothScrollWrapper from '$lib/components/SmoothScrollWrapper.svelte';

  export let data;

  $: service = data.service;
  $: otherServices = data.otherServices;
  let isClient = false;

  onMount(() => {
    isClient = true;
  });
</script>

<svelte:head>
  <title>{service.metadata.title} | Carpit Garage</title>
  <meta name="description" content={service.metadata.description} />
</svelte:head>

<SmoothScrollWrapper>
  {#snippet children()}
    <!-- Service Detail Header -->
<section class="py-24 md:py-32 bg-gradient-to-b from-background to-card">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="text-center mb-16">
      <div class="flex items-center justify-center gap-3 mb-6">
        <span class="w-2 h-2 bg-accent rounded-full"></span>
        <span class="text-accent/80 font-medium tracking-wider text-sm uppercase">Szolgáltatás részletei</span>
        <span class="w-2 h-2 bg-accent rounded-full"></span>
      </div>
      
      <h1 class="font-display text-4xl md:text-6xl font-bold text-white mb-6">{service.metadata.title}</h1>
      
      <div class="flex justify-center gap-4 mb-8">
        <span class="bg-accent/10 px-4 py-2 border border-accent/20 backdrop-blur-sm inline-block">
          <span class="text-accent font-semibold">{service.metadata.price}</span>
        </span>
        <span class="bg-card px-4 py-2 border border-white/20 inline-block">
          <span class="text-white/80">{service.metadata.duration || '1-2 óra'}</span>
        </span>
      </div>
      
      <p class="text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-8">
        {service.metadata.description}
      </p>
      
      <div class="flex flex-wrap justify-center gap-3">
        {#each service.metadata.features || [] as feature}
          <span class="px-4 py-2 bg-card border border-white/20 text-white/80 text-sm">
            {feature}
          </span>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Service Content Section -->
<section class="py-16 md:py-24 bg-card">
  <div class="max-w-4xl mx-auto px-6 md:px-12">
    <div class="prose prose-invert max-w-none">
      <p class="text-white/80 leading-relaxed text-lg mb-8">
        {service.content}
      </p>
      
      {#if service.metadata.image}
        <div class="my-12">
          <img src={service.metadata.image} alt={service.metadata.title} class="w-full h-64 object-cover rounded-lg border border-white/20" />
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 md:py-24 bg-gradient-to-r from-card/30 to-card/10 border-t border-b border-white/10">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-6">
          Kérj ajánlatot ezen a szolgáltatáson
        </h2>
        <p class="text-white/70 font-light leading-relaxed mb-8">
          Minden autó egyedi, ezért személyre szabott ajánlatot készítünk Önnek.
        </p>
      </div>
      <div class="lg:text-right">
        <a
          href="tel:+36703339809"
          class="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold tracking-wide hover:bg-accent/90 transition-colors duration-300"
        >
          <span>Ajánlatkérés</span>
          <span class="text-xl">→</span>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Other Services Section -->
<section class="py-16 md:py-24 bg-background">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="text-center mb-12">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-4">
        Más szolgáltatások
      </h2>
      <p class="text-white/70 font-light">
        Fedezze fel teljes szolgáltatási palettánkat
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each otherServices as otherService}
        <a href="/services/{otherService.slug}" class="block group" data-sveltekit-preload-data="hover">
          <div class="bg-card border border-white/20 hover:border-accent/50 transition-all duration-300 p-6 h-full flex flex-col">
            <div class="flex-1">
              <h3 class="font-display text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {otherService.metadata.title}
              </h3>
              <p class="text-white/70 font-light text-sm mb-4">
                {otherService.metadata.description}
              </p>
            </div>
            <div class="mt-4">
              <span class="bg-accent/10 px-3 py-1 text-accent text-sm font-medium">
                {otherService.metadata.price}
              </span>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
  {/snippet}
</SmoothScrollWrapper>