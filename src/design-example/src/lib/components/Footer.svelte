<script lang="ts">
	import { Facebook, Instagram } from 'lucide-svelte';
	import type { SiteSettings } from '$lib/content';

	export let siteSettings: SiteSettings;

	const fallbackContactData = {
		phone: '+36703339809',
		email: 'info@carpitgarage.hu',
		address: '1172 Budapest\nCinkotai út 26.',
		instagram: 'https://www.instagram.com/carpit_grg',
		facebook: 'https://www.facebook.com/share/16mtfkk7VR/',
	};

	// Use fallback data if not available
	const contactData = { ...fallbackContactData, ...siteSettings };
</script>

<footer class="relative border-t border-white/10 py-12 md:py-16 bg-[#0D0D0D]">
	<div class="max-w-7xl mx-auto px-4 md:px-8">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-center md:text-left">
			<div>
				<div class="flex justify-center md:justify-start mb-4">
					<img
						src="/logo.svg"
						alt="CarPit Garage Logo"
						class="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-0 saturate-100"
						style="filter: invert(27%) sepia(96%) saturate(5471%) hue-rotate(355deg) brightness(104%) contrast(94%)"
					/>
				</div>
				<p class="text-white/60">
					Professzionális autókozmetika és detailing. Az autód megérdemli a legjobbat -
					precizitás, gondosság és minőség.
				</p>
				<div class="flex justify-center md:justify-start gap-4 mt-6">
  <a
  href={contactData.instagram}
  target="_blank"
  rel="noopener noreferrer"
  class="text-accent hover:text-accent/80 transition"
>
						<Instagram size={20} />
					</a>
  <a
  href={contactData.facebook}
  target="_blank"
  rel="noopener noreferrer"
  class="text-accent hover:text-accent/80 transition"
>
						<Facebook size={20} />
					</a>
				</div>
			</div>

			<div>
				<h4 class="font-semibold text-white mb-4">Szolgáltatások</h4>
  <ul class="space-y-2 text-white/60">
  <li>
    <a href="#services" class="hover:text-accent transition">
      Polírozás
    </a>
  </li>
  <li>
    <a href="#services" class="hover:text-accent transition">
      Kerámia bevonat
    </a>
  </li>
  <li>
    <a href="#services" class="hover:text-accent transition">
      Kárpittisztítás
    </a>
  </li>
  <li>
    <a href="#services" class="hover:text-accent transition">
      Nano bevonat
    </a>
  </li>
</ul>
			</div>

			<div>
				<h4 class="font-semibold text-white mb-4">Cég</h4>
  <ul class="space-y-2 text-white/60">
  <li>
    <a href="#portfolio" class="hover:text-accent transition">
      Portfólió
    </a>
  </li>
  <li>
    <a href="#pricing" class="hover:text-accent transition">
      Árlista
    </a>
  </li>
  <li>
    <a href="#services" class="hover:text-accent transition">
      Szolgáltatások
    </a>
  </li>
  <li>
    <a href="#contact" class="hover:text-accent transition">
      Kapcsolat
    </a>
  </li>
</ul>
			</div>

			<div>
				<h4 class="font-semibold text-white mb-4">Elérhetőség</h4>
  <ul class="space-y-2 text-white/60">
  <li>
    <a href="tel:{contactData.phone}" class="hover:text-accent transition">
      {contactData.phone.replace('+36', '06 ').replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')}
    </a>
  </li>
  <li>
    <a href="mailto:{contactData.email}" class="hover:text-accent transition">
      {contactData.email}
    </a>
  </li>
</ul>
			</div>
		</div>

		<div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between md:items-center text-white/60 text-sm">
			<p class="text-center md:text-left">&copy; 2025 Carpit Garage. Minden jog fenntartva.</p>
  <div class="flex justify-center md:justify-end gap-6 mt-4 md:mt-0">
  <a href="/adatvedelem" class="hover:text-accent transition">
    Adatvédelem
  </a>
  <a href="/aszf" class="hover:text-accent transition">
    ÁSZF
  </a>
</div>
		</div>
	</div>
</footer>