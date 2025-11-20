const products = {
    'belem-dagua': {
        id: 'belem-dagua',
        name: 'BELÉM D\'ÁGUA',
        shortDescription: 'castanha do pará, copaíba balsam, benzoin',
        description: [
            'An exotic fragrance that evokes the mysteries of the Amazon. Notes of castanha do pará combine with the warmth of copaíba balsam and the depth of benzoin, creating a unique aromatic experience that transports you to the Brazilian rainforests.',
            'Inspired by the city of Belém and the waters of the Amazon, this perfume represents the natural wealth of Brazil and the ancestral connection to the land.'
        ],
        image: 'resources/img/belem_dagua.jpeg',
        carouselImages: [
            'resources/img/belem_dagua.jpeg',
            'resources/img/achinech.jpeg',
            'resources/img/lumiere_karelia.jpeg',
            'resources/img/reflection.jpg'
        ],
        topNotes: 'Castanha do Pará, Green Citrus',
        heartNotes: 'Copaíba Balsam, Cedar Wood',
        baseNotes: 'Benzoin, Amber',
        olfactoryFamily: 'Woody Aromatic',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'venetian-velvet': {
        id: 'venetian-velvet',
        name: 'VENETIAN VELVET',
        shortDescription: 'neroli, bergamot, haitian vetiver, cashmere wood',
        description: [
            'A sophisticated fragrance that captures the elegance of Venice. Notes of neroli and bergamot blend with the earthy richness of Haitian vetiver and the soft warmth of cashmere wood, creating a luxurious aromatic journey.',
            'Inspired by the opulent fabrics and romantic canals of Venice, this perfume embodies timeless refinement and understated luxury.'
        ],
        image: 'resources/img/venetian_vetiver.jpeg',
        carouselImages: [
            'resources/img/venetian_vetiver.jpeg',
            'resources/img/ahlam_marrakech.jpeg',
            'resources/img/manhattan_cuir.jpeg',
            'resources/img/reflection.jpg'
        ],
        topNotes: 'Neroli, Bergamot',
        heartNotes: 'Haitian Vetiver, Green Accord',
        baseNotes: 'Cashmere Wood, White Musk',
        olfactoryFamily: 'Woody Citrus',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'ahlam-marrakech': {
        id: 'ahlam-marrakech',
        name: 'AHLAM MARRAKECH',
        shortDescription: 'saffron, moroccan rose, oud, amber',
        description: [
            'An enchanting fragrance that captures the spirit of Marrakech. Precious saffron and moroccan rose intertwine with the deep mystery of oud and the warmth of amber, creating an intoxicating oriental experience.',
            'Inspired by the vibrant souks and ancient palaces of Morocco, this perfume evokes dreams and desires under the North African sun.'
        ],
        image: 'resources/img/ahlam_marrakech.jpeg',
        carouselImages: [
            'resources/img/ahlam_marrakech.jpeg',
            'resources/img/venetian_vetiver.jpeg',
            'resources/img/kyoto_amber.jpg',
            'resources/img/layali_sahara.jpg'
        ],
        topNotes: 'Saffron, Pink Pepper',
        heartNotes: 'Moroccan Rose, Jasmine',
        baseNotes: 'Oud, Amber, Patchouli',
        olfactoryFamily: 'Oriental Floral',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'manhattan-cuir': {
        id: 'manhattan-cuir',
        name: 'MANHATTAN CUIR',
        shortDescription: 'cardamom, suede leather, iris, cedarwood',
        description: [
            'A bold urban fragrance that embodies the energy of Manhattan. Spicy cardamom and luxurious suede leather combine with elegant iris and grounding cedarwood, creating a powerful and sophisticated scent.',
            'Inspired by the skyline and cosmopolitan spirit of New York City, this perfume represents modern luxury and confident elegance.'
        ],
        image: 'resources/img/manhattan_cuir.jpeg',
        carouselImages: [
            'resources/img/manhattan_cuir.jpeg',
            'resources/img/venetian_vetiver.jpeg',
            'resources/img/lumiere_karelia.jpeg',
            'resources/img/partenope.jpg'
        ],
        topNotes: 'Cardamom, Black Pepper',
        heartNotes: 'Suede Leather, Iris Root',
        baseNotes: 'Cedarwood, Tonka Bean',
        olfactoryFamily: 'Leather Spicy',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'achinech': {
        id: 'achinech',
        name: 'ACHINECH',
        shortDescription: 'bergamot, sea salt, rosemary, fig, white musk',
        description: [
            'A fresh fragrance that captures the coastal serenity of the Canary Islands. Bright bergamot and crisp sea salt blend with aromatic rosemary, sweet fig, and soft white musk, creating an invigorating yet calming scent.',
            'Inspired by the azure waters and sun-drenched shores of Tenerife, this perfume embodies the essence of summer and carefree moments by the sea.'
        ],
        image: 'resources/img/achinech.jpeg',
        carouselImages: [
            'resources/img/achinech.jpeg',
            'resources/img/partenope.jpg',
            'resources/img/reflection.jpg',
            'resources/img/belem_dagua.jpeg'
        ],
        topNotes: 'Bergamot, Sea Salt, Lemon',
        heartNotes: 'Rosemary, Fig Leaf',
        baseNotes: 'White Musk, Driftwood',
        olfactoryFamily: 'Aquatic Fresh',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'lumiere-karelia': {
        id: 'lumiere-karelia',
        name: 'LUMIÈRE KARELIA',
        shortDescription: 'pine, juniper, wild lavander, birchwood',
        description: [
            'A nordic fragrance that evokes the mystical forests of Karelia. Fresh pine and juniper combine with aromatic wild lavender and the gentle warmth of birchwood, creating a pure and serene scent.',
            'Inspired by the pristine landscapes and midnight sun of Northern Europe, this perfume captures the quiet beauty and natural harmony of the wilderness.'
        ],
        image: 'resources/img/lumiere_karelia.jpeg',
        carouselImages: [
            'resources/img/lumiere_karelia.jpeg',
            'resources/img/belem_dagua.jpeg',
            'resources/img/venetian_vetiver.jpeg',
            'resources/img/achinech.jpeg'
        ],
        topNotes: 'Pine Needle, Juniper Berry',
        heartNotes: 'Wild Lavender, Eucalyptus',
        baseNotes: 'Birchwood, Moss',
        olfactoryFamily: 'Aromatic Woody',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'kyoto-amber': {
        id: 'kyoto-amber',
        name: 'KYOTO AMBER',
        shortDescription: 'incense, yuzu, hinoki wood, amber resin',
        description: [
            'A contemplative Japanese fragrance that honors ancient traditions. Sacred incense and bright yuzu blend with the sacred hinoki wood and the depth of amber resin, creating a meditative and spiritual experience.',
            'Inspired by the temples and zen gardens of Kyoto, this perfume embodies mindfulness, tranquility, and the refined aesthetics of Japanese culture.'
        ],
        image: 'resources/img/kyoto_amber.jpg',
        carouselImages: [
            'resources/img/kyoto_amber.jpg',
            'resources/img/ahlam_marrakech.jpeg',
            'resources/img/layali_sahara.jpg',
            'resources/img/manhattan_cuir.jpeg'
        ],
        topNotes: 'Incense, Yuzu',
        heartNotes: 'Hinoki Wood, Green Tea',
        baseNotes: 'Amber Resin, Sandalwood',
        olfactoryFamily: 'Woody Oriental',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'layali-sahara': {
        id: 'layali-sahara',
        name: 'LAYALI SAHARA',
        shortDescription: 'orange blossom, jasmine, sandalwood, vanilla',
        description: [
            'A sensual fragrance that captures desert romance. Luminous orange blossom and jasmine intertwine with creamy sandalwood and sweet vanilla, creating a warm and enchanting scent.',
            'Inspired by starlit nights in the Sahara desert, this perfume evokes the magic, mystery, and timeless allure of Arabian tales.'
        ],
        image: 'resources/img/layali_sahara.jpg',
        carouselImages: [
            'resources/img/layali_sahara.jpg',
            'resources/img/ahlam_marrakech.jpeg',
            'resources/img/kyoto_amber.jpg',
            'resources/img/reflection.jpg'
        ],
        topNotes: 'Orange Blossom, Bergamot',
        heartNotes: 'Jasmine, Tuberose',
        baseNotes: 'Sandalwood, Vanilla, Musk',
        olfactoryFamily: 'Floral Oriental',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'reflection': {
        id: 'reflection',
        name: 'REFLECTION',
        shortDescription: 'cucumber, bergamot, raspberry, lychee, musk',
        description: [
            'A modern fresh fragrance that captures pure clarity. Crisp cucumber and bright bergamot blend with sweet raspberry, exotic lychee, and soft musk, creating a clean and uplifting scent.',
            'Inspired by moments of self-reflection and personal clarity, this perfume embodies freshness, optimism, and contemporary elegance.'
        ],
        image: 'resources/img/reflection.jpg',
        carouselImages: [
            'resources/img/reflection.jpg',
            'resources/img/achinech.jpeg',
            'resources/img/partenope.jpg',
            'resources/img/venetian_vetiver.jpeg'
        ],
        topNotes: 'Cucumber, Bergamot, Raspberry',
        heartNotes: 'Lychee, Rose Water',
        baseNotes: 'White Musk, Blonde Woods',
        olfactoryFamily: 'Fresh Fruity',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    },
    'partenope': {
        id: 'partenope',
        name: 'PARTENOPE',
        shortDescription: 'marine breeze, lime zest, vetiver, driftwood',
        description: [
            'A coastal Italian fragrance that evokes the Bay of Naples. Fresh marine breeze and zesty lime combine with earthy vetiver and weathered driftwood, creating a breezy and sophisticated scent.',
            'Inspired by the ancient Greek name for Naples and the siren of mythology, this perfume captures the allure of the Mediterranean coast and timeless Italian elegance.'
        ],
        image: 'resources/img/partenope.jpg',
        carouselImages: [
            'resources/img/partenope.jpg',
            'resources/img/achinech.jpeg',
            'resources/img/reflection.jpg',
            'resources/img/venetian_vetiver.jpeg'
        ],
        topNotes: 'Marine Breeze, Lime Zest',
        heartNotes: 'Vetiver, Sea Lavender',
        baseNotes: 'Driftwood, Ambergris',
        olfactoryFamily: 'Aquatic Woody',
        concentration: 'Eau de Parfum',
        volume: '50ml / 1.6 fl oz',
        price: '€200.00',
        previousPrice: '€250.00'
    }
};
