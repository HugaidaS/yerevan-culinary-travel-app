// lib/database/mock-data.ts
import type { Itinerary, MealType, Place, Tag } from '../src/shared/types'

export const tags: Array<Tag> = [
  { id: 'coffee', name: 'Coffee' },
  { id: 'sweets', name: 'Sweets' },
  { id: 'lightMeal', name: 'Light Meal' },
  { id: 'heavyFood', name: 'Heavy Food' },
  { id: 'streetFood', name: 'Street Food' },
  { id: 'historic', name: 'Historic' },
  { id: 'bestAtNight', name: 'Best at Night' },
  { id: 'veganFriendly', name: 'Vegan Friendly' },
  { id: 'requiresBooking', name: 'Requires Booking' },
]

// Meal types that admin can create/manage
export const mealTypes: Array<MealType> = [
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'dinner', name: 'Dinner' },
  { id: 'snack', name: 'Snack' },
]

// Places - admin creates these and assigns tags and meal types
export const places: Array<Place> = [
  {
    id: 'afrolab_roastery',
    name: 'Afrolab Roastery',
    lat: 40.1826266,
    lng: 44.512941,
    shortDescription: 'Specialty coffee roastery with bright, modern vibe.',
    longDescription:
      "Afrolab is one of Yerevan's first specialty coffee roasters, sourcing award-winning beans from around the world. The tropical-chic interior is filled with the aroma of freshly ground coffee. A perfect spot to start the day with a cappuccino or pour-over while soaking in Armenia's new-wave café culture.",
    factSnippet:
      "Armenian merchants were pioneers of Europe's café culture, opening the first coffeehouses in cities like Vienna and Paris in the 17th century.",
    averageCheckUSD: 17,
    googleMapsUrl: 'https://maps.app.goo.gl/xbbiiPE9CLPSapDe8',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/15401366/2a00000194fde505feb323cf51ca068b9231/XXXL',
    tagIds: ['coffee', 'lightMeal'],
    mealTypeIds: ['breakfast'],
  },
  {
    id: 'lumen_coffee',
    name: 'Lumen Coffee 1936',
    lat: 40.190212,
    lng: 44.5184034,
    shortDescription: 'Minimalist espresso bar with world-class brews.',
    longDescription:
      "Lumen Coffee is run by passionate local baristas on a mission to elevate coffee culture. Known for meticulous espresso shots and hand-brewed single origins, it's a cozy yet stylish space perfect for a focused morning or mid-day recharge.",
    factSnippet:
      'The café is located in a building that was once the ancient Luys bookstore, a hub for knowledge and ideas.',
    averageCheckUSD: 10,
    googleMapsUrl: 'https://maps.app.goo.gl/KoNsnsWaLPVpvtYGA',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/7740052/2a00000187994af0bd64e81fd9fd56dcac12/XXXL',
    tagIds: ['coffee', 'lightMeal'],
    mealTypeIds: ['breakfast'],
  },
  {
    id: 'sloyonka',
    name: 'Sloyonka Gastro Bakery & Coffee',
    lat: 40.1888302,
    lng: 44.5175321,
    shortDescription: 'Layered pastries, croissants, and fresh coffee.',
    longDescription:
      "Sloyonka ('puff pastry' in Russian) is famous for its buttery croissants, flaky nazook, and modern coffee drinks. The atmosphere blends the charm of a bakery with the buzz of a downtown hangout, attracting locals and travelers alike.",
    factSnippet:
      "Puff pastry techniques are part of Armenia's rich baking heritage, blending influences from Silk Road trade routes.",
    averageCheckUSD: 10,
    googleMapsUrl: 'https://maps.app.goo.gl/YTjc793oa63BUHwV8',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/15426074/2a000001970cfd5cbdfa1ad5bf285c33e14e/XXXL',
    tagIds: ['sweets', 'coffee', 'lightMeal'],
    mealTypeIds: ['breakfast'],
  },
  {
    id: 'lavash_restaurant',
    name: 'Lavash Restaurant',
    lat: 40.1830853,
    lng: 44.5161934,
    shortDescription: 'Stylish Armenian spot; fresh lavash & kyufta.',
    longDescription:
      'Lavash bakes the UNESCO-listed flatbread fresh in a clay tonir, right before your eyes. Their kyufta—hand-pounded veal mixed with bulgur—is tender and flavorful, served with herbs and broth. Breakfasts include eggs with basturma and seasonal jams.',
    factSnippet: 'The tradition of baking lavash in a tonir oven is on the UNESCO Intangible Cultural Heritage list.',
    averageCheckUSD: 20,
    googleMapsUrl: 'https://maps.app.goo.gl/fTTSLFmYuGBtwQcD8',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/14297579/2a00000196951a0ffadddb1fc5c91541f393/XXXL',
    tagIds: ['heavyFood', 'historic'],
    mealTypeIds: ['breakfast', 'lunch', 'dinner'],
  },
  {
    id: 'ost_lahmajo',
    name: 'OST Food & Wine',
    lat: 40.1859989,
    lng: 44.5073331,
    shortDescription: 'Beloved wood-fired lahmajo (Armenian pizza).',
    longDescription:
      'OST is a no-frills spot beloved for lahmajo hot from the wood-fired oven. Thin, spiced meat topping on crisp bread—best with a cold tan. Watch the bakers stretch and fire each order within minutes.',
    factSnippet:
      "Lahmajo's origins are a subject of debate; some historical accounts trace the dish back to ancient Armenian pagan traditions.",
    averageCheckUSD: 8,
    googleMapsUrl: 'https://maps.app.goo.gl/zonRbVWZb95buurx8',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/13457355/2a0000018ed2d90fa0831ef1392d3ec0ffc2/XXXL',
    tagIds: ['streetFood', 'heavyFood'],
    mealTypeIds: ['lunch'],
  },
  {
    id: 'tumanyan_shaurma',
    name: 'Tumanyan Shaurma',
    lat: 40.1831817,
    lng: 44.5165953,
    shortDescription: 'Local institution for Armenian-style shawarma.',
    longDescription:
      'Juicy chicken or pork shaved fresh from the spit, wrapped in lavash with tangy pickles and garlic sauce. Grab one and eat like a true Yerevantsi—fast, satisfying, and always fresh.',
    factSnippet:
      'This beloved spot is a local institution that has been serving up its famous shawarma since 1998, a true post-Soviet success story.',
    averageCheckUSD: 5,
    googleMapsUrl: 'https://maps.app.goo.gl/hwcbFNvudKsfyMfV9',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/10834132/2a0000018e0fc32b37c45af5d43493812e6e/XXXL',
    tagIds: ['streetFood', 'heavyFood'],
    mealTypeIds: ['lunch', 'dinner'],
  },
  {
    id: 'grand_candy_ponchikanots',
    name: 'Grand Candy Ponchikanots',
    lat: 40.1902272,
    lng: 44.5190332,
    shortDescription: 'Iconic custard-filled ponchik donuts.',
    longDescription:
      "Grand Candy's Ponchikanots is a nostalgic sweet paradise. Their ponchik—golden, airy donuts bursting with custard or chocolate—are best enjoyed warm with cocoa. A whimsical spot loved across generations.",
    factSnippet:
      'Ponchik, the beloved fried donut, became a staple snack in Soviet-era bakeries, making it a nostalgic treat for many Armenians.',
    averageCheckUSD: 4,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Candy+Ponchikanots+Yerevan',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/13477341/2a0000018fa07c716b8d328a25f113342982/XXXL',
    tagIds: ['sweets'],
    mealTypeIds: ['snack'],
  },
  {
    id: 'rubicone_gelato',
    name: 'Rubicone Gelato Boutique',
    lat: 40.1849177,
    lng: 44.5207167,
    shortDescription: 'Artisanal gelato with Armenian flavors.',
    longDescription:
      'Rubicone crafts small-batch gelato with Italian methods and Armenian soul. Expect seasonal flavors like apricot, mulberry, or thyme-honey—perfect for a sunny stroll.',
    factSnippet:
      "Apricot gelato pays homage to Armenia's national fruit, the apricot, featured in local culture and cuisine.",
    averageCheckUSD: 5,
    googleMapsUrl: 'https://maps.app.goo.gl/FfvHFMBYSnK59fgy7',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/12594487/2a0000019069d9804387b5d5f179ece1887b/XXXL',
    tagIds: ['sweets'],
    mealTypeIds: ['snack'],
  },
  {
    id: 'black_angus',
    name: 'Black Angus',
    lat: 40.1884531,
    lng: 44.5162799,
    shortDescription: 'Burger chain with premium Angus beef.',
    longDescription:
      'Black Angus delivers hearty burgers made from quality Angus beef. A casual, reliable choice when you need a break from traditional Armenian meals without sacrificing flavor.',
    factSnippet:
      "Founded in 2013, Black Angus represents a newer wave of Yerevan's culinary scene, offering a taste of international comfort food.",
    averageCheckUSD: 10,
    googleMapsUrl: 'https://maps.app.goo.gl/BtfpPxPBYJcPzHAG9',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/11374564/2a00000193ec15bde0a28b46a8a947c98e36/XXXL',
    tagIds: ['heavyFood'],
    mealTypeIds: ['lunch', 'dinner'],
  },
  {
    id: 'nani_streetfood',
    name: 'Nani National Streetfood',
    lat: 40.1827194,
    lng: 44.5165519,
    shortDescription: 'Armenian classics turned into handheld streetfood.',
    longDescription:
      'Nani reimagines national dishes for the street: dolma in bread, salads in ciabatta, and other creative takes on traditional flavors. Fun, tasty, and portable.',
    factSnippet:
      "Creative street-food twists showcase how the Armenian diaspora's adaptability keeps centuries-old recipes alive in modern urban life.",
    averageCheckUSD: 7,
    googleMapsUrl: 'https://maps.app.goo.gl/thBpia2Rj2nCu8ek8',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/16482798/2a00000198242401d56e35f32d510e73820b/XXXL',
    tagIds: ['streetFood', 'lightMeal'],
    mealTypeIds: ['lunch'],
  },
  {
    id: 'abovyan_12',
    name: 'Abovyan 12 (Courtyard Café & Gallery)',
    lat: 40.180898,
    lng: 44.5159627,
    shortDescription: 'Hidden courtyard via souvenir shop; magical at night.',
    longDescription:
      "Enter through the Dalan Art Gallery souvenir shop, next to a handmade chocolate & pomegranate wine store, and you'll find this charming courtyard café. Ideal for tea, salads, or grilled meats, with a gallery upstairs and evening fairy lights.",
    factSnippet:
      'This historic building was once home to a famous photography studio that captured icons like Charles Aznavour and Aram Khachaturian.',
    averageCheckUSD: 20,
    googleMapsUrl: 'https://maps.app.goo.gl/kdkhUhv8smVYsjuA8',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/2029876/2a0000016de98041ce7f2d2ce8afb9588df9/XXXL',
    tagIds: ['bestAtNight', 'historic'],
    mealTypeIds: ['lunch', 'dinner'],
  },
  {
    id: 'tavern_yerevan',
    name: 'Tavern Yerevan',
    lat: 40.1789456,
    lng: 44.5099982,
    shortDescription: 'Lively Armenian tavern with khorovats & music.',
    longDescription:
      'Tavern Yerevan is all about hearty khorovats, dolma, and fresh lavash, served with live folk music in a bustling atmosphere. A quintessential Armenian dining experience.',
    factSnippet:
      'In Armenian culture, khorovats (barbecue) is the national dish, symbolizing life lived to the fullest.',
    averageCheckUSD: 22,
    googleMapsUrl: 'https://maps.app.goo.gl/A7uQUJCGVXXZqmib7',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/5308697/2a0000017b87a044f0b0e82192ee22207784/XXXL',
    tagIds: ['heavyFood', 'requiresBooking'],
    mealTypeIds: ['lunch', 'dinner'],
  },
  {
    id: 'artashi_mot',
    name: 'Artashi Mot BBQ',
    lat: 40.1750376,
    lng: 44.5093087,
    shortDescription: 'Old-school khorovats with smoky charm.',
    longDescription:
      "Artashi Mot serves juicy skewers of pork, lamb, and quail grilled over grapevine coals. Expect generous herb plates, fire-roasted veggies, and a smoky aroma you'll carry home.",
    factSnippet:
      "Armenian barbecue, or khorovats, has ancient origins tied to the country's pastoral traditions and is a significant part of social gatherings.",
    averageCheckUSD: 18,
    googleMapsUrl: 'https://maps.app.goo.gl/7xsRsNr6gEyg2AQc9',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/15153151/2a000001967b28d3ae319a29805214c80332/XXXL',
    tagIds: ['heavyFood'],
    mealTypeIds: ['lunch', 'dinner'],
  },
  {
    id: 'zhengyalov_hats_teryan',
    name: 'Zhingyalov Hats (Teryan)',
    lat: 40.1868186,
    lng: 44.5195754,
    shortDescription: 'Artsakh herb-stuffed flatbread, vegan-friendly.',
    longDescription:
      "A delicate flatbread packed with up to 20 fresh herbs, griddled to order. Fragrant, healthy, and deeply rooted in Artsakh's food traditions.",
    factSnippet:
      'This unique flatbread from the Artsakh region became a traditional staple for Armenians in times of famine and war, symbolizing resilience.',
    averageCheckUSD: 5,
    googleMapsUrl: 'https://maps.app.goo.gl/5JbwyoVGNugNAggy6',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/13299246/2a0000018e357e3d1ea4736abd410748c998/XXXL',
    tagIds: ['veganFriendly', 'lightMeal'],
    mealTypeIds: ['lunch'],
  },
  {
    id: 'in_vino',
    name: 'In Vino',
    lat: 40.1870185,
    lng: 44.5089064,
    shortDescription: 'Wine alley staple; Armenian wines & platters.',
    longDescription:
      'Cozy and lined with bottles, In Vino offers an extensive Armenian wine list and light pairings—perfect for a relaxed evening.',
    factSnippet:
      "Saryan Street is the heart of Yerevan's wine revival, hosting an annual festival that celebrates Armenia's ancient winemaking heritage.",
    averageCheckUSD: 18,
    googleMapsUrl: 'https://maps.app.goo.gl/7YJ2x6UXBbgGBmWj6',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/13220791/2a0000019330673bbc10c1f36bfc3dd915c8/XXXL',
    tagIds: ['lightMeal'],
    mealTypeIds: ['dinner'],
  },
  {
    id: 'cafe_central',
    name: 'Café Central',
    lat: 40.1849139,
    lng: 44.5206053,
    shortDescription: 'Historic café for Armenian coffee & sherbet.',
    longDescription:
      'With old-world charm and sidewalk tables, Café Central is a classic for sipping Armenian coffee brewed in a jazzve or enjoying sweet floral sherbet.',
    factSnippet:
      'This café is named after the historic Viennese Café Central, a legendary hub for intellectuals like Freud and Trotsky, but was founded in Yerevan in 2005.',
    averageCheckUSD: 10,
    googleMapsUrl: 'https://maps.app.goo.gl/XbKKrBPNK2sPjbrT8',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/16230048/2a000001975062db9272ab5175b35a210003/XXXL',
    tagIds: ['coffee', 'historic'],
    mealTypeIds: ['breakfast'],
  },
  {
    id: 'kond_house',
    name: 'Kond House',
    lat: 40.18044,
    lng: 44.5029193,
    shortDescription: 'Historic neighborhood café & eatery in Kond.',
    longDescription:
      "Nestled in Yerevan's oldest district, Kond House blends history and hospitality. The cobblestone alleys outside lead to a rustic interior where traditional recipes meet modern presentation. Perfect for those who want their meal served with a side of architectural heritage.",
    factSnippet:
      "Kond is Yerevan's oldest quarter, an 'island of old Yerevan' with a unique history that largely escaped Soviet-era reconstruction.",
    averageCheckUSD: 20,
    googleMapsUrl: 'https://maps.app.goo.gl/gGDHy1zePcihqLa98',
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/6b/c1/af/interior-of-winer-garden.jpg?w=1100&h=600&s=1',
    tagIds: ['bestAtNight', 'historic'],
    mealTypeIds: ['lunch', 'dinner'],
  },
  {
    id: 'master_class_bbq',
    name: 'Master Class BBQ (Tumanyan)',
    lat: 40.182262,
    lng: 44.5178434,
    shortDescription: 'Famous Tumanyan Street spot for juicy kebabs.',
    longDescription:
      "Master Class BBQ is a carnivore's delight—plump, smoky kebabs grilled to perfection right on bustling Tumanyan Street. Known for consistency and generous portions, it's a favorite pre-wine-stop meal before exploring the nearby bars and cafes.",
    factSnippet:
      "The word khorovats (Armenian BBQ) is defined by one historian as an 'Armenian word for life lived to the fullest and the celebration of good weather'.",
    averageCheckUSD: 16,
    googleMapsUrl: 'https://maps.app.goo.gl/jN8GgLeyXw4631Cj9',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/14014133/2a00000193ca95eed73603f5d56a4741bc1a/XXXL',
    tagIds: ['heavyFood', 'streetFood'],
    mealTypeIds: ['lunch', 'dinner'],
  },
  {
    id: 'family_house',
    name: 'Family House',
    lat: 40.1789079,
    lng: 44.5049317,
    shortDescription: 'Locals love this spot for hinkali—rumored to be even better than in Georgia.',
    longDescription:
      'Family House is where Yerevan gathers to savor steaming plates of hinkali, the plump Georgian dumplings filled with juicy broth and spiced meat. Tucked near the city center, this restaurant has earned a loyal following among locals who insist its hinkali outshine even those across the border. The cozy, slightly old-school atmosphere makes it ideal for long dinners, late-night feasts, and sharing stories over generous portions of comfort food.',
    factSnippet:
      'Hinkali are traditionally eaten with your hands—bite, slurp the broth, then finish the dumpling. Forks are frowned upon!',
    averageCheckUSD: 10,
    googleMapsUrl: 'https://maps.app.goo.gl/NX3SxgtMsWLmp45R8',
    imageUrl: 'https://avatars.mds.yandex.net/get-altay/15157522/2a0000019434e2fa5803c59dfcf261f74624/XXXL',
    tagIds: ['bestAtNight', 'historic'],
    mealTypeIds: ['lunch', 'dinner'],
  },
]

// Itineraries - admin creates these and schedules places for specific meal types by day
export const itineraries: Array<Itinerary> = [
  {
    id: 'yerevan-1day',
    name: 'Yerevan in a Day',
    description: 'A perfect introduction to Armenian cuisine in one day',
    days: 1,
    schedule: [
      {
        dayNumber: 1,
        meals: [
          { placeId: 'afrolab_roastery', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'lavash_restaurant', mealTypeId: 'lunch', order: 2 },
          { placeId: 'grand_candy_ponchikanots', mealTypeId: 'snack', order: 3 },
          { placeId: 'abovyan_12', mealTypeId: 'dinner', order: 4 },
        ],
      },
    ],
  },
  {
    id: 'yerevan-3day',
    name: 'Armenian Food Journey',
    description: 'Explore the depths of Armenian culinary culture',
    days: 3,
    schedule: [
      {
        dayNumber: 1,
        meals: [
          { placeId: 'lumen_coffee', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'ost_lahmajo', mealTypeId: 'lunch', order: 2 },
          { placeId: 'rubicone_gelato', mealTypeId: 'snack', order: 3 },
          { placeId: 'tavern_yerevan', mealTypeId: 'dinner', order: 4 },
        ],
      },
      {
        dayNumber: 2,
        meals: [
          { placeId: 'sloyonka', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'nani_streetfood', mealTypeId: 'lunch', order: 2 },
          { placeId: 'grand_candy_ponchikanots', mealTypeId: 'snack', order: 3 },
          { placeId: 'in_vino', mealTypeId: 'dinner', order: 4 },
        ],
      },
      {
        dayNumber: 3,
        meals: [
          { placeId: 'cafe_central', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'artashi_mot', mealTypeId: 'lunch', order: 2 },
          { placeId: 'rubicone_gelato', mealTypeId: 'snack', order: 3 },
          { placeId: 'kond_house', mealTypeId: 'dinner', order: 4 },
        ],
      },
    ],
  },
  {
    id: 'yerevan-7day',
    name: 'Complete Armenian Culinary Experience',
    description: 'The ultimate week-long food adventure in Yerevan',
    days: 7,
    schedule: [
      {
        dayNumber: 1,
        meals: [
          { placeId: 'afrolab_roastery', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'master_class_bbq', mealTypeId: 'lunch', order: 2 },
          { placeId: 'rubicone_gelato', mealTypeId: 'snack', order: 3 },
          { placeId: 'abovyan_12', mealTypeId: 'dinner', order: 4 },
        ],
      },
      {
        dayNumber: 2,
        meals: [
          { placeId: 'sloyonka', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'family_house', mealTypeId: 'lunch', order: 2 },
          { placeId: 'grand_candy_ponchikanots', mealTypeId: 'snack', order: 3 },
          { placeId: 'black_angus', mealTypeId: 'dinner', order: 4 },
        ],
      },
      {
        dayNumber: 3,
        meals: [
          { placeId: 'lumen_coffee', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'zhengyalov_hats_teryan', mealTypeId: 'lunch', order: 2 },
          { placeId: 'rubicone_gelato', mealTypeId: 'snack', order: 3 },
          { placeId: 'tavern_yerevan', mealTypeId: 'dinner', order: 4 },
        ],
      },
      {
        dayNumber: 4,
        meals: [
          { placeId: 'cafe_central', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'nani_streetfood', mealTypeId: 'lunch', order: 2 },
          { placeId: 'grand_candy_ponchikanots', mealTypeId: 'snack', order: 3 },
          { placeId: 'in_vino', mealTypeId: 'dinner', order: 4 },
        ],
      },
      {
        dayNumber: 5,
        meals: [
          { placeId: 'afrolab_roastery', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'ost_lahmajo', mealTypeId: 'lunch', order: 2 },
          { placeId: 'rubicone_gelato', mealTypeId: 'snack', order: 3 },
          { placeId: 'kond_house', mealTypeId: 'dinner', order: 4 },
        ],
      },
      {
        dayNumber: 6,
        meals: [
          { placeId: 'sloyonka', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'artashi_mot', mealTypeId: 'lunch', order: 2 },
          { placeId: 'grand_candy_ponchikanots', mealTypeId: 'snack', order: 3 },
          { placeId: 'abovyan_12', mealTypeId: 'dinner', order: 4 },
        ],
      },
      {
        dayNumber: 7,
        meals: [
          { placeId: 'lumen_coffee', mealTypeId: 'breakfast', order: 1 },
          { placeId: 'master_class_bbq', mealTypeId: 'lunch', order: 2 },
          { placeId: 'rubicone_gelato', mealTypeId: 'snack', order: 3 },
          { placeId: 'black_angus', mealTypeId: 'dinner', order: 4 },
        ],
      },
    ],
  },
]
