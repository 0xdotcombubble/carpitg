import { json } from '@sveltejs/kit';

// Pre-built services data for fast response
export async function GET() {
  try {
    // This data is pre-built and optimized for fast delivery
    const services = [
      {
        "slug": "belso-tisztitas",
        "metadata": {
          "id": "1",
          "title": "Belső tisztítás",
          "slug": "belso-tisztitas",
          "description": "Teljes belső takarítás, kárpittisztítás, műszerfal ápolása",
          "price": "15,000 Ft-tól",
          "icon": "sparkles",
          "order": 1,
          "featured": true,
          "content": "Teljes körű belső autótisztítási szolgáltatás, amely magában foglalja a kárpittisztítást, műszerfal ápolását és minden belső felület alapos megtisztítását."
        },
        "content": "Teljes körű belső autótisztítási szolgáltatás, amely magában foglalja a kárpittisztítást, műszerfal ápolását és minden belső felület alapos megtisztítását."
      },
      {
        "slug": "kulso-mosas",
        "metadata": {
          "id": "2",
          "title": "Külső mosás",
          "slug": "kulso-mosas",
          "description": "Kézi autómosás, szárítás, alapvédelem",
          "price": "8,000 Ft-tól",
          "icon": "shield",
          "order": 2,
          "featured": false,
          "content": "Kézi autómosás, szárítás és alapvédelem. A szolgáltatás magában foglalja a külső felületek alapos megtisztítását és védőbevonat felvitelét."
        },
        "content": "Kézi autómosás, szárítás és alapvédelem. A szolgáltatás magában foglalja a külső felületek alapos megtisztítását és védőbevonat felvitelét."
      },
      {
        "slug": "wax-vedelem",
        "metadata": {
          "id": "3",
          "title": "Wax védelem",
          "slug": "wax-vedelem",
          "description": "Prémium wax bevonat a tartós fényért",
          "price": "12,000 Ft-tól",
          "icon": "droplet",
          "order": 3,
          "featured": false,
          "content": "Prémium wax bevonat a tartós fényért és védelmért. A szolgáltatás magában foglalja a festék felületek alapos megtisztítását és prémium wax bevonat felvitelét."
        },
        "content": "Prémium wax bevonat a tartós fényért és védelmért. A szolgáltatás magában foglalja a festék felületek alapos megtisztítását és prémium wax bevonat felvitelét."
      },
      {
        "slug": "kerek-tisztitas",
        "metadata": {
          "id": "4",
          "title": "Kerék tisztítás",
          "slug": "kerek-tisztitas",
          "description": "Alapos kerék és felnimosás, speciális ápolószerekkel",
          "price": "6,000 Ft-tól",
          "icon": "wind",
          "order": 4,
          "featured": false,
          "content": "Alapos kerék és felnimosás speciális ápolószerekkel. A szolgáltatás magában foglalja a kerékárok tisztítását és a felnik fényesre ápolását."
        },
        "content": "Alapos kerék és felnimosás speciális ápolószerekkel. A szolgáltatás magában foglalja a kerékárok tisztítását és a felnik fényesre ápolását."
      },
      {
        "slug": "motor-tisztitas",
        "metadata": {
          "id": "5",
          "title": "Motor tisztítás",
          "slug": "motor-tisztitas",
          "description": "Motortér tisztítása és ápolása szakszerűen",
          "price": "10,000 Ft-tól",
          "icon": "flame",
          "order": 5,
          "featured": false,
          "content": "Motortér tisztítása és ápolása szakszerűen. A szolgáltatás magában foglalja a motor felületek alapos megtisztítását és védőbevonat felvitelét."
        },
        "content": "Motortér tisztítása és ápolása szakszerűen. A szolgáltatás magában foglalja a motor felületek alapos megtisztítását és védőbevonat felvitelét."
      },
      {
        "slug": "komplett-csomag",
        "metadata": {
          "id": "6",
          "title": "Komplett csomag",
          "slug": "komplett-csomag",
          "description": "Teljes autóápolás belül és kívül",
          "price": "35,000 Ft-tól",
          "icon": "zap",
          "order": 6,
          "featured": true,
          "content": "Teljes autóápolás belül és kívül. A szolgáltatás magában foglalja a teljes belső tisztítást, külső ápolást, polírozást és védőbevonatokat."
        },
        "content": "Teljes autóápolás belül és kívül. A szolgáltatás magában foglalja a teljes belső tisztítást, külső ápolást, polírozást és védőbevonatokat."
      }
    ];

    return json(services);
  } catch (error) {
    console.error('Error loading services:', error);
    return json([]);
  }
}
