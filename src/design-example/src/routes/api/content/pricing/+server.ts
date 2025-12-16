import { json } from '@sveltejs/kit';

// Pre-built pricing data for fast response
export async function GET() {
  try {
    // This data is pre-built and optimized for fast delivery
    const pricingItems = [
      {
        "slug": "belso-tisztitas",
        "metadata": {
          "id": "1",
          "title": "Belső Tisztítás",
          "slug": "belso-tisztitas",
          "category": "Kárpittisztítás",
          "description": "Teljes belső tér tisztítás és kondicionálás prémium anyagokkal",
          "price": "35.000 Ft",
          "duration": "3-4 óra",
          "image": "/images/image09.jpg",
          "order": 1,
          "popular": false,
          "features": [
            "Kárpit és bőr tisztítás",
            "Műszerfal ápolás",
            "Ablak tisztítás belülről",
            "Padló és lábtartó tisztítás",
            "Légkondicionáló tisztítás"
          ],
          "content": "Komplett belső tér tisztítás és kondicionálás prémium anyagokkal. A szolgáltatás magában foglalja a teljes belső tér alapos tisztítását, kárpit és bőr felületek kondicionálását."
        },
        "content": "Komplett belső tér tisztítás és kondicionálás prémium anyagokkal. A szolgáltatás magában foglalja a teljes belső tér alapos tisztítását, kárpit és bőr felületek kondicionálását."
      },
      {
        "slug": "kulso-mosas",
        "metadata": {
          "id": "2",
          "title": "Külső Mosás",
          "slug": "kulso-mosas",
          "category": "Külső ápolás",
          "description": "Teljes külső mosás, szárítás és alapvédelem",
          "price": "8.000 Ft",
          "duration": "1-2 óra",
          "image": "/images/image01.jpg",
          "order": 2,
          "popular": true,
          "features": [
            "Kézi autómosás",
            "Szárítás",
            "Alapvédelem",
            "Felni tisztítás",
            "Ablak tisztítás"
          ],
          "content": "Teljes külső autómosás, szárítás és alapvédelem. A szolgáltatás magában foglalja a kézi autómosást, felni tisztítást és alapvédelem felvitelét."
        },
        "content": "Teljes külső autómosás, szárítás és alapvédelem. A szolgáltatás magában foglalja a kézi autómosást, felni tisztítást és alapvédelem felvitelét."
      },
      {
        "slug": "keramia-bevonat",
        "metadata": {
          "id": "3",
          "title": "Kerámia Bevonat",
          "slug": "keramia-bevonat",
          "category": "Festékvédelem",
          "description": "3 éves kerámia bevonat teljes külső védelemmel",
          "price": "120.000 Ft",
          "duration": "2 nap",
          "image": "/images/6d89f7c3.jpg",
          "order": 3,
          "popular": true,
          "features": [
            "3 éves kerámia bevonat",
            "Teljes külső védelem",
            "UV sugárzás elleni védelem",
            "Környezeti szennyeződések elleni védelem",
            "Fényjavítás"
          ],
          "content": "3 éves kerámia bevonat teljes külső védelemmel. A kerámia bevonat hosszú távú védelmet biztosít az UV sugárzás és a környezeti szennyeződések ellen."
        },
        "content": "3 éves kerámia bevonat teljes külső védelemmel. A kerámia bevonat hosszú távú védelmet biztosít az UV sugárzás és a környezeti szennyeződések ellen."
      },
      {
        "slug": "poliras-wax",
        "metadata": {
          "id": "4",
          "title": "Polírozás és Wax",
          "slug": "poliras-wax",
          "category": "Festékápolás",
          "description": "Teljes polírozás és prémium wax bevonat",
          "price": "45.000 Ft",
          "duration": "1 nap",
          "image": "/images/image04.jpg",
          "order": 4,
          "popular": false,
          "features": [
            "Teljes polírozás",
            "Prémium wax bevonat",
            "Festék javítás",
            "Fényjavítás",
            "Vízhajtó hatás"
          ],
          "content": "Teljes polírozás és prémium wax bevonat. A szolgáltatás magában foglalja a festék javítást, fényjavítást és vízhajtó hatású bevonat felvitelét."
        },
        "content": "Teljes polírozás és prémium wax bevonat. A szolgáltatás magában foglalja a festék javítást, fényjavítást és vízhajtó hatású bevonat felvitelét."
      },
      {
        "slug": "komplett-csomag",
        "metadata": {
          "id": "5",
          "title": "Komplett Csomag",
          "slug": "komplett-csomag",
          "category": "Teljes szolgáltatás",
          "description": "Teljes autóápolás belül és kívül",
          "price": "75.000 Ft",
          "duration": "2 nap",
          "image": "/images/image05.jpg",
          "order": 5,
          "popular": true,
          "features": [
            "Teljes belső tisztítás",
            "Teljes külső mosás",
            "Polírozás",
            "Wax bevonat",
            "Kerámia bevonat"
          ],
          "content": "Teljes autóápolás belül és kívül. A szolgáltatás magában foglalja a teljes belső tisztítást, külső mosást, polírozást, wax bevonatot és kerámia bevonatot."
        },
        "content": "Teljes autóápolás belül és kívül. A szolgáltatás magában foglalja a teljes belső tisztítást, külső mosást, polírozást, wax bevonatot és kerámia bevonatot."
      },
      {
        "slug": "bronze-csomag",
        "metadata": {
          "id": "6",
          "title": "Bronze Csomag",
          "slug": "bronze-csomag",
          "category": "Alapcsomag",
          "description": "Alapvető autómosás és belső tisztítás",
          "price": "15.000 Ft",
          "duration": "2-3 óra",
          "image": "/images/image06.jpg",
          "order": 6,
          "popular": false,
          "features": [
            "Külső autómosás",
            "Belső tisztítás",
            "Felni tisztítás",
            "Ablak tisztítás",
            "Szárítás"
          ],
          "content": "Alapvető autómosás és belső tisztítás. A szolgáltatás magában foglalja a külső autómosást, belső tisztítást, felni tisztítást és ablak tisztítást."
        },
        "content": "Alapvető autómosás és belső tisztítás. A szolgáltatás magában foglalja a külső autómosást, belső tisztítást, felni tisztítást és ablak tisztítást."
      }
    ];

    return json(pricingItems);
  } catch (error) {
    console.error('Error loading pricing items:', error);
    return json([]);
  }
}
