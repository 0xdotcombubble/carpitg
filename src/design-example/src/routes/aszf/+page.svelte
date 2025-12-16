<script lang="ts">
	import { page } from '$app/stores';
	import SmoothScrollWrapper from '$lib/components/SmoothScrollWrapper.svelte';
</script>

<svelte:head>
	<title>Általános Szerződési Feltételek - CarPit Garage</title>
	<meta name="description" content="CarPit Garage általános szerződési feltételei és szolgáltatási feltételei.">
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

		<h1 class="text-4xl font-bold mb-8 text-accent">Általános Szerződési Feltételek</h1>

		<div class="prose prose-invert max-w-none">
			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">1. Általános rendelkezések</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					Jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) a CarPit Garage által nyújtott
					autókozmetikai és detailing szolgáltatásokra vonatkoznak.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">2. Szolgáltató adatai</h2>
				<div class="text-white/80 leading-relaxed mb-4">
					<p><strong>Név:</strong> CarPit Garage</p>
					<p><strong>Cím:</strong> 1172 Budapest, Cinkotai út 26.</p>
					<p><strong>Email:</strong> info@carpitgarage.hu</p>
					<p><strong>Telefon:</strong> +36 70 333 9809</p>
				</div>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">3. Szolgáltatások</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					Szolgáltatásaink körébe tartoznak:
				</p>
				<ul class="list-disc list-inside text-white/80 space-y-2 mb-4">
					<li>Autó külső és belső tisztítás</li>
					<li>Polírozás</li>
					<li>Kerámia bevonat alkalmazás</li>
					<li>Kárpittisztítás</li>
					<li>Egyéb autókozmetikai szolgáltatások</li>
				</ul>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">4. Árak és fizetés</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					Az árak a szolgáltatás megkezdésekor érvényes árjegyzék szerint alakulnak.
					Az árak forintban értendők és tartalmazzák az ÁFÁ-t.
				</p>
				<p class="text-white/80 leading-relaxed mb-4">
					Fizetés készpénzzel vagy bankkártyával lehetséges a szolgáltatás elvégzését követően.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">5. Időpont foglalás</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					Időpontfoglalás telefonon vagy emailben lehetséges. A foglalás visszaigazolással válik érvényessé.
				</p>
				<p class="text-white/80 leading-relaxed mb-4">
					Lemondás esetén kérjük, legalább 24 órával korábban jelezzék.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">6. Garancia</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					Szolgáltatásainkra garanciát vállalunk az alábbiak szerint:
				</p>
				<ul class="list-disc list-inside text-white/80 space-y-2 mb-4">
					<li>Polírozás: 3 hónap</li>
					<li>Kerámia bevonat: 1-3 év (típustól függően)</li>
					<li>Belső tisztítás: 1 hónap</li>
				</ul>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">7. Felelősség</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					A szolgáltató kellő szakértelemmel és gondossággal végzi a munkát.
					Meglévő sérülésekért felelősséget nem vállalunk.
				</p>
				<p class="text-white/80 leading-relaxed mb-4">
					Kérjük, a szolgáltatás megkezdése előtt jelezzék a meglévő sérüléseket.
				</p>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">8. Panaszkezelés</h2>
				<p class="text-white/80 leading-relaxed mb-4">
					Panaszaikat az alábbi elérhetőségeken jelenthetik be:
				</p>
				<ul class="list-disc list-inside text-white/80 space-y-2 mb-4">
					<li>Email: info@carpitgarage.hu</li>
					<li>Telefon: +36 70 333 9809</li>
					<li>Személyesen: 1172 Budapest, Cinkotai út 26.</li>
				</ul>
			</section>

			<section class="mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-white">9. Záró rendelkezések</h2>
				<p class="text-white/80 leading-relaxed">
					Jelen ÁSZF 2024. december 15. napjától hatályos. A szolgáltató fenntartja a jogot
					az ÁSZF egyoldalú módosítására, melyet a honlapon közzétesz.
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