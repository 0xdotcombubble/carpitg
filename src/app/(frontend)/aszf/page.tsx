import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Általános Szerződési Feltételek - CarPit Garage',
  description: 'A CarPit Garage autókozmetika szolgáltatásainak általános szerződési feltételei',
}

export default function ASZFPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-[#0D0D0D] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Általános Szerződési Feltételek
          </h1>
          <p className="text-xl text-white/70">CarPit Garage</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert prose-orange max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Általános rendelkezések</h2>
            <p className="text-white/80 mb-4">
              A jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) tartalmazzák a CarPit
              Garage (továbbiakban: Szolgáltató) által nyújtott autókozmetikai és detailing
              szolgáltatások igénybevételének feltételeit.
            </p>
            <p className="text-white/80 mb-4">
              A szolgáltatások megrendelésével az Ügyfél elfogadja a jelen ÁSZF-ben foglalt
              feltételeket.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. A Szolgáltató adatai</h2>
            <ul className="text-white/80 space-y-2">
              <li>Név: CarPit Garage</li>
              <li>Telefonszám: +36 70 333 9809</li>
              <li>E-mail: info@carpitgarage.hu</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. Szolgáltatások</h2>
            <p className="text-white/80 mb-4">A Szolgáltató az alábbi szolgáltatásokat nyújtja:</p>
            <ul className="text-white/80 space-y-2 list-disc list-inside">
              <li>Autómosás (külső és belső)</li>
              <li>Polírozás</li>
              <li>Kerámia bevonat</li>
              <li>Kárpittisztítás</li>
              <li>Nano bevonat</li>
              <li>Egyéb detailing szolgáltatások</li>
            </ul>
            <p className="text-white/80 mt-4">
              A szolgáltatások részletes leírása és árazása a weboldalon található.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. Időpontfoglalás</h2>
            <p className="text-white/80 mb-4">
              Az időpontfoglalás telefonon vagy e-mailben történik. A Szolgáltató az időpont
              visszaigazolásával kötelezettséget vállal a szolgáltatás elvégzésére.
            </p>
            <p className="text-white/80 mb-4">
              Az Ügyfél köteles az egyeztetett időpontban megjelenni, vagy legalább 24 órával
              korábban lemondani az időpontot.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Árak és fizetés</h2>
            <p className="text-white/80 mb-4">
              A szolgáltatások árai a weboldalon feltüntetett árak szerint alakulnak. Az árak
              tartalmazzák az anyagköltséget és a munkadíjat.
            </p>
            <p className="text-white/80 mb-4">
              A fizetés készpénzben vagy bankkártyával történik a szolgáltatás elvégzése után.
            </p>
            <p className="text-white/80 mb-4">
              A Szolgáltató fenntartja a jogot az árak módosítására. Az árak módosítása a már
              lefoglalt időpontokra nem vonatkozik.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Felelősség</h2>
            <p className="text-white/80 mb-4">
              A Szolgáltató gondosan végzi munkáját és a szakmai szabályok betartásával dolgozik.
            </p>
            <p className="text-white/80 mb-4">
              A Szolgáltató nem vállal felelősséget a jármű meglévő károsodásaiért, gyári hibákért
              vagy az Ügyfél által nem jelentett problémákért.
            </p>
            <p className="text-white/80 mb-4">
              Az Ügyfél köteles a járműben lévő értékeket elvinni vagy biztonságos helyen tárolni.
              A Szolgáltató nem vállal felelősséget a járműben hagyott tárgyakért.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Szavatosság és garancia</h2>
            <p className="text-white/80 mb-4">
              A Szolgáltató szavatosságot vállal az elvégzett munkák minőségéért. Reklamáció esetén
              a Szolgáltató megvizsgálja a problémát és szükség esetén díjmentesen javítja a hibát.
            </p>
            <p className="text-white/80 mb-4">
              Bizonyos szolgáltatásokra (pl. kerámia bevonat) külön garanciális feltételek
              vonatkoznak, amelyeket a Szolgáltató írásban közöl az Ügyféllel.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">8. Adatvédelem</h2>
            <p className="text-white/80 mb-4">
              A Szolgáltató az Ügyfél személyes adatait az{' '}
              <Link href="/adatvedelem" className="text-accent hover:text-accent/80 underline">
                Adatvédelmi Tájékoztatóban
              </Link>{' '}
              foglaltak szerint kezeli.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">9. Egyéb rendelkezések</h2>
            <p className="text-white/80 mb-4">
              A jelen ÁSZF-ben nem szabályozott kérdésekben a magyar jog, különösen a Polgári
              Törvénykönyv rendelkezései az irányadók.
            </p>
            <p className="text-white/80 mb-4">
              A Szolgáltató fenntartja a jogot a jelen ÁSZF módosítására. A módosítások a
              weboldalon történő közzététellel lépnek hatályba.
            </p>
          </section>

          <section className="mb-12">
            <p className="text-white/60 text-sm">
              Utolsó frissítés: 2025. január 1.
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            href="/"
            className="text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  )
}
