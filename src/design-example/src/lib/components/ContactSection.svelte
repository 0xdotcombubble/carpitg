<script lang="ts">
	import { Mail, Phone, MapPin, Clock } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import type { SiteSettings } from '$lib/content';


	let formData = {
		name: '',
		email: '',
		phone: '',
		message: ''
	};

	function handleSubmit(e: Event) {
		e.preventDefault();
		console.log('Form submitted:', formData);
		formData = { name: '', email: '', phone: '', message: '' };
	}
</script>

<section id="contact" class="relative py-20 md:py-32 overflow-hidden md:bg-transparent bg-[#0D0D0D]">
	<!-- Mobile background - no bg-fixed to avoid iOS Safari issues -->
	<div
		class="md:hidden absolute inset-0 bg-cover bg-center"
		style="background-image: url('/background.jpg')"
	></div>
	<!-- Mobile overlay -->
	<div class="md:hidden absolute inset-0 bg-black/80"></div>

	<!-- Desktop background with bg-fixed -->
	<div
		class="hidden md:block absolute inset-0 bg-fixed bg-cover bg-center"
		style="background-image: url('/background.jpg')"
	></div>
	<!-- Desktop overlay -->
	<div class="hidden md:block absolute inset-0 bg-black/80"></div>

	<div class="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<div class="space-y-8">
				<div class="space-y-4">
  <div class="text-accent text-lg md:text-xl font-semibold tracking-widest">KAPCSOLAT</div>
					<h2 class="text-4xl md:text-5xl font-bold text-balance text-white">Foglalj időpontot most</h2>
					<p class="text-lg text-white/60 leading-relaxed">
						Hívj fel vagy küldj üzenetet - szívesen segítünk az autód szépítésében.
					</p>
				</div>

				<div class="space-y-6">
					<div class="flex gap-4">
  <div class="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
  <Phone class="w-6 h-6 text-accent" />
</div>
<div>
  <p class="font-semibold text-white">Telefon</p>
  <a href="tel:+36703339809" class="text-accent hover:text-accent/80">
    06 70 333 9809
  </a>
</div>
					</div>

					<div class="flex gap-4">
  <div class="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
  <Mail class="w-6 h-6 text-accent" />
</div>
<div>
  <p class="font-semibold text-white">Email</p>
  <a href="mailto:info@carpitgarage.hu" class="text-accent hover:text-accent/80">
    info@carpitgarage.hu
  </a>
</div>
					</div>

					<div class="flex gap-4">
  <div class="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
  <MapPin class="w-6 h-6 text-accent" />
</div>
						<div>
							<p class="font-semibold text-white">Cím</p>
							<p class="text-white/60">1172 Budapest, Cinkotai út 26.</p>
						</div>
					</div>

					<div class="flex gap-4">
  <div class="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
  <Clock class="w-6 h-6 text-accent" />
</div>
						<div>
							<p class="font-semibold text-white">Nyitva tartás</p>
							<p class="text-white/60">H-P: 08:00-20:00</p>
							<p class="text-white/60">Sz: 10:00-18:00</p>
							<p class="text-white/60">V: Zárva</p>
						</div>
					</div>
				</div>
			</div>

			<form on:submit={handleSubmit} class="space-y-6 bg-[#1A1A1A] p-8 rounded-lg border border-white/10">
              <div>
                <label for="name" class="block text-sm font-semibold text-white mb-2">Név</label>
                <input
                  id="name"
                  type="text"
                  bind:value={formData.name}
                  class="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 rounded-sm text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                  placeholder="Teljes név"
                  required
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-semibold text-white mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  bind:value={formData.email}
                  class="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 rounded-sm text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-semibold text-white mb-2">Telefon</label>
                <input
                  id="phone"
                  type="tel"
                  bind:value={formData.phone}
                  class="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 rounded-sm text-white placeholder-white/50 focus:border-accent focus:outline-none transition"
                  placeholder="06 70 XXX XXXX"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-white mb-2">Üzenet</label>
                <textarea
                  id="message"
                  bind:value={formData.message}
                  class="w-full px-4 py-3 bg-[#0D0D0D] border border-white/20 rounded-sm text-white placeholder-white/50 focus:border-accent focus:outline-none transition resize-none h-32"
                  placeholder="Írd le az autód típusát és az igényeidet..."
                  required
                ></textarea>
              </div>

                <button
                  type="submit"
                  class="w-full px-6 py-4 bg-accent text-white font-semibold rounded-sm hover:bg-accent/90 transition"
                >
                  Üzenet küldése
                </button>
			</form>
		</div>
	</div>
</section>