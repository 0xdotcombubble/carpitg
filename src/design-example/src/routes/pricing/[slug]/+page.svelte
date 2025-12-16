<script lang="ts">
  import { onMount } from 'svelte';
  import SmoothScrollWrapper from '$lib/components/SmoothScrollWrapper.svelte';

  export let data;

  $: pricingItem = data.item;
  $: otherItems = data.otherItems;
  let isClient = false;

  onMount(() => {
    isClient = true;
  });
</script>

<svelte:head>
  <title>{pricingItem.metadata.title} | Carpit Garage Árak</title>
  <meta name="description" content={pricingItem.metadata.description} />
</svelte:head>

<SmoothScrollWrapper>
  {#snippet children()}
    <!-- Pricing Detail Header -->
<section class="py-24 md:py-32 bg-gradient-to-b from-background to-card">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="text-center mb-16">
      <div class="flex items-center justify-center gap-3 mb-6">
        <span class="w-2 h-2 bg-accent rounded-full"></span>
        <span class="text-accent/80 font-medium tracking-wider text-sm uppercase">Ár részletei</span>
        <span class="w-2 h-2 bg-accent rounded-full"></span>
      </div>
      
      <h1 class="font-display text-4xl md:text-6xl font-bold text-white mb-6">{pricingItem.metadata.title}</h1>
      
      <div class="flex justify-center gap-4 mb-8">
        <span class="bg-accent/10 px-4 py-2 border border-accent/20 backdrop-blur-sm inline-block">
          <span class="text-accent font-semibold">{pricingItem.metadata.price}</span>
        </span>
        <span class="bg-card px-4 py-2 border border-white/20 inline-block">
          <span class="text-white/80">{pricingItem.metadata.duration}</span>
        </span>
        <span class="bg-card px-4 py-2 border border-white/20 inline-block">
          <span class="text-white/80">{pricingItem.metadata.category}</span>
        </span>
      </div>
      
      <p class="text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-8">
        {pricingItem.metadata.description}
      </p>
    </div>
  </div>
</section>

<!-- Pricing Content Section -->
<section class="py-16 md:py-24 bg-card">
  <div class="max-w-6xl mx-auto px-6 md:px-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div class="prose prose-invert max-w-none">
        <h2 class="font-display text-2xl font-bold text-white mb-6">Szolgáltatás részletei</h2>
        <p class="text-white/80 leading-relaxed text-lg mb-8">
          {pricingItem.content}
        </p>
        
        <h3 class="font-display text-xl font-bold text-white mb-4 mt-8">A csomag tartalmazza</h3>
        <ul class="list-disc list-inside text-white/80 space-y-2">
          {#each pricingItem.metadata.features || [] as feature}
            <li>{feature}</li>
          {/each}
        </ul>
      </div>
      
      <div>
        <img src={pricingItem.metadata.image} alt={pricingItem.metadata.title} class="w-full h-96 object-cover rounded-lg border border-white/20 shadow-2xl" />
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 md:py-24 bg-gradient-to-r from-card/30 to-card/10 border-t border-b border-white/10">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-6">
          Foglaljon időpontot ezen a csomagon
        </h2>
        <p class="text-white/70 font-light leading-relaxed mb-8">
          Válassza ezt a csomagot és élvezze autójának újjászületését.
        </p>
      </div>
      <div class="lg:text-right">
        <a
          href="tel:+36703339809"
          class="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold tracking-wide hover:bg-accent/90 transition-colors duration-300"
        >
          <span>Időpont foglalás</span>
          <span class="text-xl">→</span>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Other Pricing Items Section -->
<section class="py-16 md:py-24 bg-background">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="text-center mb-12">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-4">
        Más csomagok
      </h2>
      <p class="text-white/70 font-light">
        Tekintse meg teljes árlistánkat
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each otherItems as item}
        <a href="/pricing/{item.slug}" class="block group" data-sveltekit-preload-data="hover">
          <div class="bg-card border border-white/20 hover:border-accent/50 transition-all duration-300 p-6 h-full flex flex-col">
            <div class="flex-1">
              <h3 class="font-display text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {item.metadata.title}
              </h3>
              <p class="text-white/70 font-light text-sm mb-4">
                {item.metadata.description}
              </p>
            </div>
            <div class="mt-4">
              <div class="flex justify-between items-end">
                <span class="bg-accent/10 px-3 py-1 text-accent text-sm font-medium">
                  {item.metadata.price}
                </span>
                <span class="text-white/60 text-xs">
                  {item.metadata.duration}
                </span>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
  {/snippet}
</SmoothScrollWrapper>