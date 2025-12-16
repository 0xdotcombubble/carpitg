import { json } from '@sveltejs/kit';

// Pre-built portfolio data for fast response
export async function GET() {
  try {
    // This data is pre-built and optimized for fast delivery
    const portfolioItems = [
      {
        "slug": "audi-rs6-keramia",
        "metadata": {
          "id": "1",
          "title": "Audi RS6 - Kerámia Bevonat",
          "slug": "audi-rs6-keramia",
          "category": "Kerámia bevonat",
          "description": "3 éves kerámia bevonat teljes külső védelemmel",
          "image": "/images/6d89f7c3.jpg",
          "order": 1,
          "featured": true,
          "content": "3 éves kerámia bevonat teljes külső védelemmel egy Audi RS6-on. A kerámia bevonat hosszú távú védelmet biztosít az UV sugárzás és a környezeti szennyeződések ellen."
        },
        "content": "3 éves kerámia bevonat teljes külső védelemmel egy Audi RS6-on. A kerámia bevonat hosszú távú védelmet biztosít az UV sugárzás és a környezeti szennyeződések ellen."
      },
      {
        "slug": "bmw-m3-poliras",
        "metadata": {
          "id": "2",
          "title": "BMW M3 - Polírozás",
          "slug": "bmw-m3-poliras",
          "category": "Polírozás",
          "description": "Teljes polírozás és fényjavítás",
          "image": "/images/cdc50fa5.jpg",
          "order": 2,
          "featured": false,
          "content": "Teljes polírozás és fényjavítás egy BMW M3-on. A szolgáltatás magában foglalja a festék javítást és fényjavítást."
        },
        "content": "Teljes polírozás és fényjavítás egy BMW M3-on. A szolgáltatás magában foglalja a festék javítást és fényjavítást."
      },
      {
        "slug": "mclaren-720s",
        "metadata": {
          "id": "3",
          "title": "McLaren 720S - Komplett Ápolás",
          "slug": "mclaren-720s",
          "category": "Komplett ápolás",
          "description": "Teljes belső és külső ápolás",
          "image": "/images/5ebb0280.jpg",
          "order": 3,
          "featured": true,
          "content": "Teljes belső és külső ápolás egy McLaren 720S-on. A szolgáltatás magában foglalja a teljes belső tisztítást és külső ápolást."
        },
        "content": "Teljes belső és külső ápolás egy McLaren 720S-on. A szolgáltatás magában foglalja a teljes belső tisztítást és külső ápolást."
      },
      {
        "slug": "mercedes-amg-komplett",
        "metadata": {
          "id": "4",
          "title": "Mercedes AMG - Komplett Csomag",
          "slug": "mercedes-amg-komplett",
          "category": "Komplett csomag",
          "description": "Teljes autóápolás belül és kívül",
          "image": "/images/image07.jpg",
          "order": 4,
          "featured": false,
          "content": "Teljes autóápolás belül és kívül egy Mercedes AMG-n. A szolgáltatás magában foglalja a teljes belső tisztítást, külső ápolást és kerámia bevonatot."
        },
        "content": "Teljes autóápolás belül és kívül egy Mercedes AMG-n. A szolgáltatás magában foglalja a teljes belső tisztítást, külső ápolást és kerámia bevonatot."
      },
      {
        "slug": "porsche-911-belso",
        "metadata": {
          "id": "5",
          "title": "Porsche 911 - Belső Tisztítás",
          "slug": "porsche-911-belso",
          "category": "Belső tisztítás",
          "description": "Teljes belső tér tisztítás és ápolás",
          "image": "/images/image08.jpg",
          "order": 5,
          "featured": false,
          "content": "Teljes belső tér tisztítás és ápolás egy Porsche 911-en. A szolgáltatás magában foglalja a kárpit és bőr felületek alapos tisztítását és ápolását."
        },
        "content": "Teljes belső tér tisztítás és ápolás egy Porsche 911-en. A szolgáltatás magában foglalja a kárpit és bőr felületek alapos tisztítását és ápolását."
      }
    ];

    return json(portfolioItems);
  } catch (error) {
    console.error('Error loading portfolio items:', error);
    return json([]);
  }
}
