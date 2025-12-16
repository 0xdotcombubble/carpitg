<script lang="ts">
	import { page } from '$app/stores';
	import SmoothScrollWrapper from '$lib/components/SmoothScrollWrapper.svelte';
</script>

<svelte:head>
	<title>Adatvédelmi Tájékoztató - CarPit Garage</title>
	<meta name="description" content="CarPit Garage adatvédelmi tájékoztatója és cookie kezelési szabályzata.">
</svelte:head>

<SmoothScrollWrapper>
	{#snippet children()}
		<main class="min-h-screen bg-[#0D0D0D] text-white">
	<div class="max-w-4xl mx-auto px-4 py-16">
		<div class="mb-8">
			<a href="/" class="text-accent hover:text-accent/80 transition-colors duration-300">
				← Vissza a főoldalra
			</a>
		</div>

		<h1 class="text-4xl font-bold mb-8 text-accent">Adatvédelmi Tájékoztató</h1>

		<div class="prose prose-invert max-w-none">
			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">1. Általános információk</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					A CarPit Garage elkötelezett az Ön személyes adatainak védelme mellett. Ez az adatvédelmi tájékoztató
					ismerteti, hogyan gyűjtjük, használjuk és védjük az Ön személyes adatait.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">2. Adatkezelő</h2>
				<div class="text-white/80 leading-relaxed mb-4">
					<p><strong>Név:</strong> CarPit Garage</p>
					<p><strong>Cím:</strong> 1172 Budapest, Cinkotai út 26.</p>
					<p><strong>Email:</strong> info@carpitgarage.hu</p>
					<p><strong>Telefon:</strong> +36 70 333 9809</p>
				</div>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">3. Gyűjtött adatok</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					A következő személyes adatokat gyűjthetjük:
				</p>
				<ul class="list-disc list-inside text-white/80 space-y-2 mb-4">
					<li>Név</li>
					<li>Email cím</li>
					<li>Telefonszám</li>
					<li>Üzenet tartalom</li>
				</ul>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">4. Adatkezelés célja</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					A személyes adatokat a következő célokra használjuk:
				</p>
				<ul class="list-disc list-inside text-white/80 space-y-2 mb-4">
					<li>Kapcsolatfelvétel és kommunikáció</li>
					<li>Szolgáltatások nyújtása</li>
					<li>Ajánlatok készítése</li>
					<li>Ügyfélszolgálat</li>
				</ul>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">5. Jogai</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					Önnek joga van:
				</p>
				<ul class="list-disc list-inside text-white/80 space-y-2 mb-4">
					<li>Hozzáférni személyes adataihoz</li>
					<li>Helyesbíteni pontatlan adatokat</li>
					<li>Törölni adatait</li>
					<li>Korlátozni az adatkezelést</li>
					<li>Adatokat átvinni másik szolgáltatóhoz</li>
				</ul>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">6. Kapcsolat</h2>
				<p class="text-white/80 leading-relaxed">
					Ha kérdései vannak az adatvédelemmel kapcsolatban, kérjük, lépjen kapcsolatba velünk
					az info@carpitgarage.hu email címen vagy a +36 70 333 9809 telefonszámon.
				</p>
			</section>

			<div class="text-sm text-white/60 mt-12 pt-8 border-t border-white/20">
				Utolsó frissítés: 2024. december 15.
			</div>
		</div>
	</div>
		</main>
	{/snippet}
</SmoothScrollWrapper>