const db = {
  places: [
    {
      id: 'afrolab_roastery',
      name: 'Afrolab Roastery',
      lat: 40.182844,
      lng: 44.512798,
      shortDescription: 'Specialty coffee roastery with bright, modern vibe.',
      longDescription:
        'Afrolab is one of Yerevan’s first specialty coffee roasters, sourcing award-winning beans from around the world. The tropical-chic interior is filled with the aroma of freshly ground coffee. A perfect spot to start the day with a cappuccino or pour-over while soaking in Armenia’s new-wave café culture.',
      tags: ['coffee', 'breakfast', 'lightMeal'],
      factSnippet:
        "Armenian merchants were pioneers of Europe's café culture, opening the first coffeehouses in cities like Vienna and Paris in the 17th century.",
      averageCheckUSD: 7,
    },
    {
      id: 'lumen_coffee',
      name: 'Lumen Coffee',
      lat: 40.181825,
      lng: 44.512349,
      shortDescription: 'Minimalist espresso bar with world-class brews.',
      longDescription:
        'Lumen Coffee is run by passionate local baristas on a mission to elevate coffee culture. Known for meticulous espresso shots and hand-brewed single origins, it’s a cozy yet stylish space perfect for a focused morning or mid-day recharge.',
      tags: ['coffee', 'breakfast', 'lightMeal'],
      factSnippet:
        'The café is located in a building that was once the ancient Luys bookstore, a hub for knowledge and ideas.',
      averageCheckUSD: 7,
    },
    {
      id: 'sloyonka',
      name: 'Sloyonka Gastro Bakery & Coffee',
      lat: 40.188625,
      lng: 44.517325,
      shortDescription: 'Layered pastries, croissants, and fresh coffee.',
      longDescription:
        'Sloyonka (‘puff pastry’ in Russian) is famous for its buttery croissants, flaky nazook, and modern coffee drinks. The atmosphere blends the charm of a bakery with the buzz of a downtown hangout, attracting locals and travelers alike.',
      tags: ['breakfast', 'sweets', 'coffee', 'lightMeal'],
      factSnippet:
        "Puff pastry techniques are part of Armenia's rich baking heritage, blending influences from Silk Road trade routes.",
      averageCheckUSD: 8,
    },
    {
      id: 'lavash_restaurant',
      name: 'Lavash Restaurant',
      lat: 40.182948,
      lng: 44.51631,
      shortDescription: 'Stylish Armenian spot; fresh lavash & kyufta.',
      longDescription:
        'Lavash bakes the UNESCO-listed flatbread fresh in a clay tonir, right before your eyes. Their kyufta—hand-pounded veal mixed with bulgur—is tender and flavorful, served with herbs and broth. Breakfasts include eggs with basturma and seasonal jams.',
      tags: ['breakfast', 'lunch', 'dinner', 'heavyFood', 'historic'],
      factSnippet: 'The tradition of baking lavash in a tonir oven is on the UNESCO Intangible Cultural Heritage list.',
      averageCheckUSD: 20,
    },
    {
      id: 'ost_lahmajo',
      name: 'OST Lahmajo',
      lat: 40.181708,
      lng: 44.509043,
      shortDescription: 'Beloved wood-fired lahmajo (Armenian pizza).',
      longDescription:
        'OST is a no-frills spot beloved for lahmajo hot from the wood-fired oven. Thin, spiced meat topping on crisp bread—best with a cold tan. Watch the bakers stretch and fire each order within minutes.',
      tags: ['lunch', 'streetFood', 'heavyFood'],
      factSnippet:
        "Lahmajo's origins are a subject of debate; some historical accounts trace the dish back to ancient Armenian pagan traditions.",
      averageCheckUSD: 6,
    },
    {
      id: 'tumanyan_shaurma',
      name: 'Tumanyan Shaurma',
      lat: 40.183272,
      lng: 44.516652,
      shortDescription: 'Local institution for Armenian-style shawarma.',
      longDescription:
        'Juicy chicken or pork shaved fresh from the spit, wrapped in lavash with tangy pickles and garlic sauce. Grab one and eat like a true Yerevantsi—fast, satisfying, and always fresh.',
      tags: ['lunch', 'dinner', 'streetFood', 'heavyFood'],
      factSnippet:
        'This beloved spot is a local institution that has been serving up its famous shawarma since 1998, a true post-Soviet success story.',
      averageCheckUSD: 5,
    },
    {
      id: 'grand_candy_ponchikanots',
      name: 'Grand Candy Ponchikanots',
      lat: 40.190147,
      lng: 44.519167,
      shortDescription: 'Iconic custard-filled ponchik donuts.',
      longDescription:
        'Grand Candy’s Ponchikanots is a nostalgic sweet paradise. Their ponchik—golden, airy donuts bursting with custard or chocolate—are best enjoyed warm with cocoa. A whimsical spot loved across generations.',
      tags: ['sweets', 'snack'],
      factSnippet:
        'Ponchik, the beloved fried donut, became a staple snack in Soviet-era bakeries, making it a nostalgic treat for many Armenians.',
      averageCheckUSD: 4,
    },
    {
      id: 'rubicone_gelato',
      name: 'Rubicone Gelato Boutique',
      lat: 40.18387,
      lng: 44.51382,
      shortDescription: 'Artisanal gelato with Armenian flavors.',
      longDescription:
        'Rubicone crafts small-batch gelato with Italian methods and Armenian soul. Expect seasonal flavors like apricot, mulberry, or thyme-honey—perfect for a sunny stroll.',
      tags: ['sweets', 'snack'],
      factSnippet:
        'Apricot gelato pays homage to Armenia’s national fruit, the apricot, featured in local culture and cuisine.',
      averageCheckUSD: 5,
    },
    {
      id: 'black_angus',
      name: 'Black Angus',
      lat: 40.1823,
      lng: 44.5159,
      shortDescription: 'Burger chain with premium Angus beef.',
      longDescription:
        'Black Angus delivers hearty burgers made from quality Angus beef. A casual, reliable choice when you need a break from traditional Armenian meals without sacrificing flavor.',
      tags: ['lunch', 'dinner', 'heavyFood'],
      factSnippet:
        "Founded in 2013, Black Angus represents a newer wave of Yerevan's culinary scene, offering a taste of international comfort food.",
      averageCheckUSD: 10,
    },
    {
      id: 'nani_streetfood',
      name: 'Nani National Streetfood',
      lat: 40.18098,
      lng: 44.5181,
      shortDescription: 'Armenian classics turned into handheld streetfood.',
      longDescription:
        'Nani reimagines national dishes for the street: dolma in bread, salads in ciabatta, and other creative takes on traditional flavors. Fun, tasty, and portable.',
      tags: ['lunch', 'streetFood', 'lightMeal'],
      factSnippet:
        'Creative street-food twists showcase how the Armenian diaspora’s adaptability keeps centuries-old recipes alive in modern urban life.',
      averageCheckUSD: 7,
    },
    {
      id: 'abovyan_12',
      name: 'Abovyan 12 (Courtyard Café & Gallery)',
      lat: 40.18099,
      lng: 44.516069,
      shortDescription: 'Hidden courtyard via souvenir shop; magical at night.',
      longDescription:
        'Enter through the Dalan Art Gallery souvenir shop, next to a handmade chocolate & pomegranate wine store, and you’ll find this charming courtyard café. Ideal for tea, salads, or grilled meats, with a gallery upstairs and evening fairy lights.',
      tags: ['lunch', 'dinner', 'bestAtNight', 'historic'],
      factSnippet:
        'This historic building was once home to a famous photography studio that captured icons like Charles Aznavour and Aram Khachaturian.',
      averageCheckUSD: 20,
    },
    {
      id: 'tavern_yerevan',
      name: 'Tavern Yerevan (Pandok)',
      lat: 40.17874,
      lng: 44.50183,
      shortDescription: 'Lively Armenian tavern with khorovats & music.',
      longDescription:
        'Tavern Yerevan is all about hearty khorovats, dolma, and fresh lavash, served with live folk music in a bustling atmosphere. A quintessential Armenian dining experience.',
      tags: ['lunch', 'dinner', 'heavyFood', 'requiresBooking'],
      factSnippet:
        'In Armenian culture, khorovats (barbecue) is the national dish, symbolizing life lived to the fullest.',
      averageCheckUSD: 22,
    },
    {
      id: 'artashi_mot',
      name: 'Artashi Mot BBQ',
      lat: 40.18662,
      lng: 44.51337,
      shortDescription: 'Old-school khorovats with smoky charm.',
      longDescription:
        'Artashi Mot serves juicy skewers of pork, lamb, and quail grilled over grapevine coals. Expect generous herb plates, fire-roasted veggies, and a smoky aroma you’ll carry home.',
      tags: ['lunch', 'dinner', 'heavyFood'],
      factSnippet:
        "Armenian barbecue, or khorovats, has ancient origins tied to the country's pastoral traditions and is a significant part of social gatherings.",
      averageCheckUSD: 18,
    },
    {
      id: 'zhengyalov_hats_teryan',
      name: 'Zhingyalov Hats (Teryan)',
      lat: 40.186785,
      lng: 44.51958,
      shortDescription: 'Artsakh herb-stuffed flatbread, vegan-friendly.',
      longDescription:
        'A delicate flatbread packed with up to 20 fresh herbs, griddled to order. Fragrant, healthy, and deeply rooted in Artsakh’s food traditions.',
      tags: ['lunch', 'veganFriendly', 'lightMeal'],
      factSnippet:
        'This unique flatbread from the Artsakh region became a traditional staple for Armenians in times of famine and war, symbolizing resilience.',
      averageCheckUSD: 5,
    },
    {
      id: 'in_vino',
      name: 'In Vino',
      lat: 40.187,
      lng: 44.5089,
      shortDescription: 'Wine alley staple; Armenian wines & platters.',
      longDescription:
        'Cozy and lined with bottles, In Vino offers an extensive Armenian wine list and light pairings—perfect for a relaxed evening.',
      tags: ['evening', 'lightMeal'],
      factSnippet:
        "Saryan Street is the heart of Yerevan's wine revival, hosting an annual festival that celebrates Armenia's ancient winemaking heritage.",
      averageCheckUSD: 18,
    },
    {
      id: 'cafe_central',
      name: 'Café Central',
      lat: 40.1788,
      lng: 44.5136,
      shortDescription: 'Historic café for Armenian coffee & sherbet.',
      longDescription:
        'With old-world charm and sidewalk tables, Café Central is a classic for sipping Armenian coffee brewed in a jazzve or enjoying sweet floral sherbet.',
      tags: ['coffee', 'breakfast', 'historic'],
      factSnippet:
        'This café is named after the historic Viennese Café Central, a legendary hub for intellectuals like Freud and Trotsky, but was founded in Yerevan in 2005.',
      averageCheckUSD: 5,
    },
    {
      id: 'kond_house',
      name: 'Kond House',
      lat: 40.18389,
      lng: 44.50472,
      shortDescription: 'Historic neighborhood café & eatery in Kond.',
      longDescription:
        'Nestled in Yerevan’s oldest district, Kond House blends history and hospitality. The cobblestone alleys outside lead to a rustic interior where traditional recipes meet modern presentation. Perfect for those who want their meal served with a side of architectural heritage.',
      tags: ['lunch', 'dinner', 'bestAtNight', 'historic'],
      factSnippet:
        "Kond is Yerevan's oldest quarter, an 'island of old Yerevan' with a unique history that largely escaped Soviet-era reconstruction.",
      averageCheckUSD: 20,
    },
    {
      id: 'master_class_bbq',
      name: 'Master Class BBQ (Saryan)',
      lat: 40.18476,
      lng: 44.50799,
      shortDescription: 'Famous Saryan Street spot for juicy kebabs.',
      longDescription:
        'Master Class BBQ is a carnivore’s delight—plump, smoky kebabs grilled to perfection right on bustling Saryan Street. Known for consistency and generous portions, it’s a favorite pre-wine-stop meal before exploring the nearby bars and cafes.',
      tags: ['lunch', 'dinner', 'heavyFood', 'streetFood'],
      factSnippet:
        "The word khorovats (Armenian BBQ) is defined by one historian as an 'Armenian word for life lived to the fullest and the celebration of good weather'.",
      averageCheckUSD: 16,
    },
  ],
  itineraries: {
    '1day': [
      {
        day: 1,
        meals: [
          { type: 'breakfast', placeId: 'afrolab_roastery' },
          { type: 'lunch', placeId: 'lavash_restaurant' },
          { type: 'snack', placeId: 'grand_candy_ponchikanots' },
          { type: 'dinner', placeId: 'abovyan_12' },
        ],
      },
    ],
    '3day': [
      {
        day: 1,
        meals: [
          { type: 'breakfast', placeId: 'lumen_coffee' },
          { type: 'lunch', placeId: 'ost_lahmajo' },
          { type: 'snack', placeId: 'rubicone_gelato' },
          { type: 'dinner', placeId: 'tavern_yerevan' },
        ],
      },
      {
        day: 2,
        meals: [
          { type: 'breakfast', placeId: 'sloyonka' },
          { type: 'lunch', placeId: 'nani_streetfood' },
          { type: 'snack', placeId: 'grand_candy_ponchikanots' },
          { type: 'dinner', placeId: 'in_vino' },
        ],
      },
      {
        day: 3,
        meals: [
          { type: 'breakfast', placeId: 'cafe_central' },
          { type: 'lunch', placeId: 'artashi_mot' },
          { type: 'snack', placeId: 'rubicone_gelato' },
          { type: 'dinner', placeId: 'kond_house' },
        ],
      },
    ],
    '7day': [
      {
        day: 1,
        meals: [
          { type: 'breakfast', placeId: 'afrolab_roastery' },
          { type: 'lunch', placeId: 'master_class_bbq' },
          { type: 'snack', placeId: 'rubicone_gelato' },
          { type: 'dinner', placeId: 'abovyan_12' },
        ],
      },
      {
        day: 2,
        meals: [
          { type: 'breakfast', placeId: 'sloyonka' },
          { type: 'lunch', placeId: 'lavash_restaurant' },
          { type: 'snack', placeId: 'grand_candy_ponchikanots' },
          { type: 'dinner', placeId: 'black_angus' },
        ],
      },
      {
        day: 3,
        meals: [
          { type: 'breakfast', placeId: 'lumen_coffee' },
          { type: 'lunch', placeId: 'zhengyalov_hats_teryan' },
          { type: 'snack', placeId: 'rubicone_gelato' },
          { type: 'dinner', placeId: 'tavern_yerevan' },
        ],
      },
      {
        day: 4,
        meals: [
          { type: 'breakfast', placeId: 'cafe_central' },
          { type: 'lunch', placeId: 'nani_streetfood' },
          { type: 'snack', placeId: 'grand_candy_ponchikanots' },
          { type: 'dinner', placeId: 'in_vino' },
        ],
      },
      {
        day: 5,
        meals: [
          { type: 'breakfast', placeId: 'afrolab_roastery' },
          { type: 'lunch', placeId: 'ost_lahmajo' },
          { type: 'snack', placeId: 'rubicone_gelato' },
          { type: 'dinner', placeId: 'kond_house' },
        ],
      },
      {
        day: 6,
        meals: [
          { type: 'breakfast', placeId: 'sloyonka' },
          { type: 'lunch', placeId: 'artashi_mot' },
          { type: 'snack', placeId: 'grand_candy_ponchikanots' },
          { type: 'dinner', placeId: 'abovyan_12' },
        ],
      },
      {
        day: 7,
        meals: [
          { type: 'breakfast', placeId: 'lumen_coffee' },
          { type: 'lunch', placeId: 'master_class_bbq' },
          { type: 'snack', placeId: 'rubicone_gelato' },
          { type: 'dinner', placeId: 'black_angus' },
        ],
      },
    ],
  },
}
