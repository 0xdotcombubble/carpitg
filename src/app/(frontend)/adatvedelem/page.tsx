import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adatvédelmi Tájékoztató - CarPit Garage',
  description: 'A CarPit Garage adatvédelmi tájékoztatója és adatkezelési szabályzata',
}

export default function AdatvedelemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-[#0D0D0D] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Adatvédelmi Tájékoztató
          </h1>
          <p className="text-xl text-white/70">CarPit Garage</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-invert prose-orange max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Bevezetés</h2>
            <p className="text-white/80 mb-4">
              A CarPit Garage (továbbiakban: Adatkezelő) elkötelezett az Ön személyes adatainak
              védelme iránt. A jelen Adatvédelmi Tájékoztató ismerteti, hogyan gyűjtjük, használjuk
              és védjük az Ön személyes adatait.
            </p>
            <p className="text-white/80 mb-4">
              Az adatkezelés az Európai Unió Általános Adatvédelmi Rendeletének (GDPR) és a magyar
              információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII.
              törvénynek megfelelően történik.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Az Adatkezelő adatai</h2>
            <ul className="text-white/80 space-y-2">
              <li>Név: CarPit Garage</li>
              <li>Telefonszám: +36 70 333 9809</li>
              <li>E-mail: info@carpitgarage.hu</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. Kezelt személyes adatok köre</h2>
            <p className="text-white/80 mb-4">Az alábbi személyes adatokat kezeljük:</p>
            <ul className="text-white/80 space-y-2 list-disc list-inside">
              <li>Név</li>
              <li>Telefonszám</li>
              <li>E-mail cím</li>
              <li>Járművel kapcsolatos adatok (típus, rendszám)</li>
              <li>Időpontfoglalási adatok</li>
              <li>Szolgáltatási előzmények</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Az adatkezelés célja és jogalapja
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">4.1. Időpontfoglalás</h3>
              <ul className="text-white/80 space-y-2">
                <li>
                  <strong>Cél:</strong> Időpontfoglalás lebonyolítása és a szolgáltatás nyújtása
                </li>
                <li>
                  <strong>Jogalap:</strong> Szerződés teljesítése (GDPR 6. cikk (1) bekezdés b)
                  pont)
                </li>
                <li>
                  <strong>Adatkezelés időtartama:</strong> Az utolsó szolgáltatástól számított 5 év
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">4.2. Kapcsolattartás</h3>
              <ul className="text-white/80 space-y-2">
                <li>
                  <strong>Cél:</strong> Az Ön megkeresésére való válaszadás, kapcsolattartás
                </li>
                <li>
                  <strong>Jogalap:</strong> Az Ön hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont)
                </li>
                <li>
                  <strong>Adatkezelés időtartama:</strong> A megkeresés teljesítéséig, de maximum 1
                  év
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                4.3. Számviteli kötelezettség
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>
                  <strong>Cél:</strong> Számviteli és adózási kötelezettségek teljesítése
                </li>
                <li>
                  <strong>Jogalap:</strong> Jogi kötelezettség teljesítése (GDPR 6. cikk (1)
                  bekezdés c) pont)
                </li>
                <li>
                  <strong>Adatkezelés időtartama:</strong> A számviteli bizonylatokat 8 évig őrizzük
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Adattovábbítás, adatfeldolgozás
            </h2>
            <p className="text-white/80 mb-4">
              Az Adatkezelő az Ön személyes adatait harmadik fél számára nem továbbítja, kivéve:
            </p>
            <ul className="text-white/80 space-y-2 list-disc list-inside">
              <li>Jogi kötelezettség teljesítése esetén (pl. adóhatóság megkeresése)</li>
              <li>Az Ön kifejezett hozzájárulása esetén</li>
            </ul>
            <p className="text-white/80 mt-4">
              Az adatkezelés során igénybe vett adatfeldolgozók (pl. webtárhely szolgáltató,
              számviteli szolgáltató) csak az Adatkezelő utasításai szerint járhatnak el.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Az Ön jogai</h2>
            <p className="text-white/80 mb-4">A GDPR alapján az alábbi jogokkal rendelkezik:</p>
            <ul className="text-white/80 space-y-3 list-disc list-inside">
              <li>
                <strong>Tájékoztatáshoz való jog:</strong> Jogosult tájékoztatást kérni az
                adatkezelésről
              </li>
              <li>
                <strong>Hozzáférési jog:</strong> Jogosult hozzáférni a kezelt személyes adataihoz
              </li>
              <li>
                <strong>Helyesbítéshez való jog:</strong> Kérheti a pontatlan adatok helyesbítését
              </li>
              <li>
                <strong>Törléshez való jog:</strong> Kérheti adatai törlését (&quot;az
                elfeledtetéshez való jog&quot;)
              </li>
              <li>
                <strong>Adatkezelés korlátozásához való jog:</strong> Bizonyos esetekben kérheti az
                adatkezelés korlátozását
              </li>
              <li>
                <strong>Adathordozhatósághoz való jog:</strong> Jogosult az adatok géppel olvasható
                formában való kiadásához
              </li>
              <li>
                <strong>Tiltakozáshoz való jog:</strong> Jogosult tiltakozni az adatkezelés ellen
              </li>
            </ul>
            <p className="text-white/80 mt-4">
              Jogainak gyakorlásához forduljon hozzánk az info@carpitgarage.hu e-mail címen.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Jogorvoslati lehetőségek</h2>
            <p className="text-white/80 mb-4">
              Ha úgy érzi, hogy az adatkezelés sérti a GDPR rendelkezéseit, jogosult panaszt tenni a
              Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH):
            </p>
            <ul className="text-white/80 space-y-2">
              <li>Cím: 1055 Budapest, Falk Miksa utca 9-11.</li>
              <li>Postacím: 1363 Budapest, Pf. 9.</li>
              <li>Telefon: +36 1 391 1400</li>
              <li>E-mail: ugyfelszolgalat@naih.hu</li>
              <li>Weboldal: www.naih.hu</li>
            </ul>
            <p className="text-white/80 mt-4">Emellett jogosult bírósághoz fordulni is.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">8. Adatbiztonság</h2>
            <p className="text-white/80 mb-4">
              Az Adatkezelő megfelelő technikai és szervezési intézkedésekkel védi az Ön személyes
              adatait az illetéktelen hozzáférés, módosítás, továbbítás, nyilvánosságra hozatal,
              törlés vagy megsemmisítés, valamint a véletlen megsemmisülés ellen.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">9. Weboldal használata</h2>
            <p className="text-white/80 mb-4">
              A weboldal használata során automatikusan rögzítésre kerülnek az alábbi technikai
              adatok:
            </p>
            <ul className="text-white/80 space-y-2 list-disc list-inside">
              <li>IP cím</li>
              <li>Böngésző típusa és verziója</li>
              <li>Operációs rendszer</li>
              <li>Látogatás időpontja</li>
              <li>Meglátogatott oldalak</li>
            </ul>
            <p className="text-white/80 mt-4">
              Ezek az adatok statisztikai célokat szolgálnak és a látogatás után törlésre kerülnek.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">10. Módosítások</h2>
            <p className="text-white/80 mb-4">
              Az Adatkezelő fenntartja a jogot a jelen Adatvédelmi Tájékoztató módosítására. A
              módosítások a weboldalon történő közzététellel lépnek hatályba.
            </p>
          </section>

          <section className="mb-12">
            <p className="text-white/60 text-sm">Utolsó frissítés: 2025. január 1.</p>
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
