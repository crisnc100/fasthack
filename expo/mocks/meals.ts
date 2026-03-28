import { Meal } from '@/types';

const meals: Meal[] = [
  // Chick-fil-A
  {
    id: 'cfa-1',
    name: 'Buffalo Chick & Mac Salad',
    description: '12‑count grilled nuggets with a side salad and mac & cheese, topped with zesty buffalo sauce',
    restaurantId: 'chick-fil-a',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['12‑count grilled nuggets', 'Side Salad (no dressing)', 'Small Mac & Cheese', 'Zesty Buffalo sauce'],
    macros: {
      calories: 655,
      protein: 55,
      fat: 35,
      carbs: 33
    },
    tags: ['Highest protein', 'Conservative cheat meal'],
    orderingInstructions: '12‑ct grilled nuggets, a small Mac & Cheese, Side Salad with no dressing, 1 Buffalo sauce; mix salad, nuggets & mac, drizzle sauce.'
  },
  {
    id: 'cfa-2',
    name: 'Spicy Southwest Keto Bowl',
    description: 'Spicy Southwest Salad base with grilled chicken filet, no corn, beans, or crispy peppers',
    restaurantId: 'chick-fil-a',
    image: 'https://images.unsplash.com/photo-1606755456206-b25206cde9ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Spicy Southwest Salad base (no corn, no beans, no crispy peppers)', 'Grilled filet', 'Creamy Salsa dressing on side'],
    macros: {
      calories: 390,
      protein: 40,
      fat: 19,
      carbs: 14
    },
    tags: ['Highest protein', 'Low carb', 'Keto', 'Gluten free'],
    orderingInstructions: 'Order the Spicy Southwest Salad with grilled chicken; hold corn, beans & peppers. Use creamy salsa sparingly.'
  },
  {
    id: 'cfa-3',
    name: 'Grilled Nugget 8‑pc Light Meal',
    description: '8-piece grilled nuggets with honey mustard and a fruit cup',
    restaurantId: 'chick-fil-a',
    image: 'https://images.unsplash.com/photo-1598515214146-dab39da1243d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['8‑pc grilled nuggets', 'Honey mustard', 'Fruit cup', 'Coke Zero'],
    macros: {
      calories: 250,
      protein: 25,
      fat: 8,
      carbs: 20
    },
    tags: ['Under 400 cal'],
    orderingInstructions: '8‑ct grilled nuggets with honey‑mustard, fruit cup & Coke Zero.'
  },

  // McDonald's
  {
    id: 'mcdonalds-1',
    name: 'Protein‑Style Double QPC',
    description: 'Double Quarter Pounder with Cheese wrapped in lettuce instead of a bun',
    restaurantId: 'mcdonalds',
    image: 'https://images.unsplash.com/photo-1585238341710-4d3ff485c476?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Double QP w/ Cheese', '— No bun, no ketchup', 'Lettuce leaf wrap'],
    macros: {
      calories: 600,
      protein: 41,
      fat: 43,
      carbs: 10
    },
    tags: ['Highest protein', 'Low carb', 'Keto', 'Gluten free', 'Carnivore', 'Conservative cheat meal'],
    orderingInstructions: 'Ask for a Double Quarter‑Pounder w/ Cheese served without bun or ketchup; wrap in lettuce.'
  },
  {
    id: 'mcdonalds-2',
    name: 'Breakfast Egg‑&‑Bacon Stack',
    description: 'A protein-packed breakfast with folded eggs, bacon, and cheese',
    restaurantId: 'mcdonalds',
    image: 'https://images.unsplash.com/photo-1620914127860-a04e8c2d18a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['2 folded eggs', '2 bacon strips', '1 slice American cheese'],
    macros: {
      calories: 260,
      protein: 20,
      fat: 19,
      carbs: 3
    },
    tags: ['Under 400 cal', 'Low carb', 'Keto', 'Gluten free', 'Carnivore'],
    orderingInstructions: 'In the kiosk, build a platter with 2 folded eggs, 2 bacon strips, 1 cheese; no bread.'
  },
  {
    id: 'mcdonalds-3',
    name: 'Egg McMuffin Ultra‑Light',
    description: 'A lighter version of the classic Egg McMuffin without butter or cheese',
    restaurantId: 'mcdonalds',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Egg McMuffin (no butter, no cheese)'],
    macros: {
      calories: 230,
      protein: 12,
      fat: 8,
      carbs: 27
    },
    tags: ['Under 400 cal'],
    orderingInstructions: 'Egg McMuffin without butter or cheese.'
  },

  // Wendy's
  {
    id: 'wendys-1',
    name: 'Son‑of‑Baconator Lettuce Wrap',
    description: 'Son-of-Baconator burger wrapped in lettuce instead of a bun',
    restaurantId: 'wendys',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Son‑of‑Baconator', '— No bun, no mayo', '1 cheese slice'],
    macros: {
      calories: 480,
      protein: 29,
      fat: 26,
      carbs: 5
    },
    tags: ['Low carb', 'Keto', 'Gluten free', 'Conservative cheat meal'],
    orderingInstructions: 'Son of Baconator, no bun, no mayo, 1 cheese slice; lettuce wrap.'
  },
  {
    id: 'wendys-2',
    name: 'Grilled Chicken Avocado BLT Bowl',
    description: 'Grilled chicken breast with lettuce, bacon, and avocado',
    restaurantId: 'wendys',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Grilled chicken breast only', 'Side‑salad lettuce blend', '2 bacon strips', 'Avocado cup'],
    macros: {
      calories: 365,
      protein: 38,
      fat: 18,
      carbs: 10
    },
    tags: ['Under 400 cal', 'Low carb', 'Keto', 'Gluten free', 'Highest protein'],
    orderingInstructions: 'Request grilled chicken breast only plus a side salad (no croutons, no dressing) and two bacon strips; add avocado.'
  },
  {
    id: 'wendys-3',
    name: 'Dave\'s Single Meal Lite',
    description: 'A lighter version of Dave\'s Single with a plain baked potato',
    restaurantId: 'wendys',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Dave\'s Single (no mayo, 1 cheese slice)', 'Plain baked potato', 'Coke Zero'],
    macros: {
      calories: 770,
      protein: 35,
      fat: 25,
      carbs: 95
    },
    tags: ['Conservative cheat meal'],
    orderingInstructions: 'Dave\'s Single no mayo, 1 slice cheese; plain baked potato, Coke Zero.'
  },

  // Chipotle
  {
    id: 'chipotle-1',
    name: 'Double‑Chicken Keto Salad Bowl',
    description: 'Salad bowl with double chicken, fajita veggies, cheese, and salsa',
    restaurantId: 'chipotle',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Supergreens', 'Double chicken', 'Fajita veggies', 'Cheese', 'Tomatillo red salsa'],
    macros: {
      calories: 400,
      protein: 62,
      fat: 13,
      carbs: 8
    },
    tags: ['Highest protein', 'Under 400 cal', 'Low carb', 'Keto', 'Gluten free'],
    orderingInstructions: 'Salad bowl → Supergreens, double chicken, fajita veggies, cheese, red salsa; no rice/beans.'
  },
  {
    id: 'chipotle-2',
    name: 'Carnivore ½ Steak ½ Carnitas Bowl',
    description: 'A protein-packed bowl with half steak, half carnitas, cheese, and guacamole',
    restaurantId: 'chipotle',
    image: 'https://images.unsplash.com/photo-1627662168223-7df99068099a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Supergreens', '½ Steak + ½ Carnitas', 'Cheese', 'Guac'],
    macros: {
      calories: 650,
      protein: 48,
      fat: 47,
      carbs: 13
    },
    tags: ['Highest protein', 'Low carb', 'Keto', 'Gluten free', 'Carnivore', 'Conservative cheat meal'],
    orderingInstructions: 'Salad bowl; choose half steak, half carnitas, add cheese & guac; no rice/beans.'
  },

  // Subway
  {
    id: 'subway-1',
    name: 'Subway Club No‑Bready Bowl',
    description: 'Subway Club meats with lettuce, veggies, and oil & vinegar',
    restaurantId: 'subway',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Subway Club meats', 'Lettuce & veggies', 'Oil & vinegar'],
    macros: {
      calories: 410,
      protein: 44,
      fat: 21,
      carbs: 16
    },
    tags: ['Highest protein', 'Low carb', 'Keto', 'Gluten free'],
    orderingInstructions: 'Order Subway Club as a Protein Bowl; load veggies; oil & vinegar.'
  },
  {
    id: 'subway-2',
    name: '6‑in Turkey Skinny Sub',
    description: 'A lighter turkey sub on multigrain bread with all veggies and mustard',
    restaurantId: 'subway',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['6‑in multigrain roll', 'Turkey', 'All veggies', 'Mustard'],
    macros: {
      calories: 320,
      protein: 23,
      fat: 4,
      carbs: 45
    },
    tags: ['Under 400 cal'],
    orderingInstructions: '6‑in Turkey on multigrain, pile veggies, skip cheese, add mustard.'
  },
  {
    id: 'subway-3',
    name: 'Ultimate B.M.T Flat‑Bread 420',
    description: 'Ultimate B.M.T. on flat bread with American cheese and mustard',
    restaurantId: 'subway',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Ultimate B.M.T', 'Flat bread', 'American cheese', 'Mustard'],
    macros: {
      calories: 420,
      protein: 25,
      fat: 18,
      carbs: 40
    },
    tags: ['Under 400 cal'],
    orderingInstructions: 'Ultimate B.M.T on flat bread with american cheese & mustard.'
  },

  // Starbucks
  {
    id: 'starbucks-1',
    name: 'Bacon & Gruyère Egg Bites + Black Coffee',
    description: 'Protein-rich egg bites with bacon and Gruyère cheese, paired with black coffee',
    restaurantId: 'starbucks',
    image: 'https://images.unsplash.com/photo-1579888944880-d98341245702?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Bacon & Gruyère Egg Bites', 'Black coffee'],
    macros: {
      calories: 300,
      protein: 19,
      fat: 20,
      carbs: 9
    },
    tags: ['Under 400 cal', 'Low carb', 'Keto', 'Gluten free', 'Seed oil free'],
    orderingInstructions: 'Order Bacon & Gruyère Egg Bites & a tall black coffee.'
  },
  {
    id: 'starbucks-2',
    name: 'Kale & Mushroom Egg Bites + Turkey Jerky',
    description: 'Vegetable egg bites paired with turkey jerky for extra protein',
    restaurantId: 'starbucks',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Kale & Mushroom Egg Bites', 'Turkey jerky pack'],
    macros: {
      calories: 335,
      protein: 28,
      fat: 18,
      carbs: 12
    },
    tags: ['Under 400 cal', 'Low carb', 'Gluten free', 'Highest protein'],
    orderingInstructions: 'Grab Kale & Mushroom Egg Bites & a turkey‑jerky snack.'
  },
  {
    id: 'starbucks-3',
    name: 'Blonde Vanilla Latte Light',
    description: 'A lighter version of the Blonde Vanilla Latte made with almond milk',
    restaurantId: 'starbucks',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Grande Blonde Vanilla Latte', 'Almond milk', '2 pumps vanilla syrup'],
    macros: {
      calories: 133,
      protein: 3,
      fat: 4,
      carbs: 22
    },
    tags: ['Under 400 cal'],
    orderingInstructions: 'Grande Blonde Vanilla Latte with almond milk & 2 pumps vanilla.'
  },

  // Taco Bell
  {
    id: 'taco-bell-1',
    name: 'Crunchwrap Supreme Fresco‑Style',
    description: 'A lighter version of the Crunchwrap Supreme made Fresco-style',
    restaurantId: 'taco-bell',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Crunchwrap Supreme (Fresco)'],
    macros: {
      calories: 470,
      protein: 16,
      fat: 15,
      carbs: 67
    },
    tags: ['Conservative cheat meal'],
    orderingInstructions: 'Order Crunchwrap Supreme, make it Fresco.'
  },
  {
    id: 'taco-bell-2',
    name: 'Power Menu Bowl — No Rice/Beans',
    description: 'Chicken Power Menu Bowl without rice or beans for a low-carb option',
    restaurantId: 'taco-bell',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Chicken Power Menu Bowl', '— No rice, no beans'],
    macros: {
      calories: 330,
      protein: 29,
      fat: 20,
      carbs: 8
    },
    tags: ['Low carb', 'Keto', 'Gluten free', 'Highest protein', 'Under 400 cal'],
    orderingInstructions: 'Chicken Power Menu Bowl; remove rice & beans.'
  },

  // Panera Bread
  {
    id: 'panera-bread-1',
    name: 'Green Goddess Cobb Salad with Chicken',
    description: 'A protein-rich salad with chicken, avocado, and Green Goddess dressing',
    restaurantId: 'panera-bread',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Full Green Goddess Cobb w/ Chicken'],
    macros: {
      calories: 530,
      protein: 42,
      fat: 30,
      carbs: 27
    },
    tags: ['Highest protein', 'Low carb', 'Gluten free'],
    orderingInstructions: 'Order as‑is; ask for half‑dressing to cut ~60 cal.'
  },
  {
    id: 'panera-bread-2',
    name: 'Half Greek Salad + Cup Turkey Chili',
    description: 'A balanced meal with a half Greek salad and a cup of turkey chili',
    restaurantId: 'panera-bread',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Half Greek Salad (light feta)', 'Cup Turkey Chili'],
    macros: {
      calories: 370,
      protein: 24,
      fat: 14,
      carbs: 28
    },
    tags: ['Under 400 cal', 'Gluten free', 'Conservative cheat meal'],
    orderingInstructions: 'Pick 2: Half Greek Salad (light feta) & Cup Turkey Chili.'
  },
  {
    id: 'panera-bread-3',
    name: 'Chipotle Chicken Avo Melt Slim',
    description: 'A lighter version of the Chipotle Chicken Avocado Melt',
    restaurantId: 'panera-bread',
    image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Chipotle Chicken Avo Melt', 'Country rustic sourdough', 'American cheese', 'Light avocado & chipotle aioli'],
    macros: {
      calories: 630,
      protein: 35,
      fat: 28,
      carbs: 60
    },
    tags: ['Conservative cheat meal'],
    orderingInstructions: 'Chipotle Chicken Avo Melt on country rustic sourdough; american cheese; light avocado & aioli.'
  },

  // Shake Shack
  {
    id: 'shake-shack-1',
    name: 'Double Shack Lettuce Wrap',
    description: 'Double ShackBurger wrapped in lettuce instead of a bun',
    restaurantId: 'shake-shack',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Double ShackBurger', '— No bun, no ShackSauce'],
    macros: {
      calories: 560,
      protein: 44,
      fat: 42,
      carbs: 3
    },
    tags: ['Highest protein', 'Low carb', 'Keto', 'Gluten free', 'Carnivore', 'Conservative cheat meal'],
    orderingInstructions: 'Double ShackBurger, no bun or ShackSauce, lettuce wrap.'
  },
  {
    id: 'shake-shack-2',
    name: 'SmokeShack Skinny Wrap',
    description: 'SmokeShack burger wrapped in lettuce instead of a bun',
    restaurantId: 'shake-shack',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['SmokeShack (single)', '— No bun, no ShackSauce', 'Lettuce wrap'],
    macros: {
      calories: 480,
      protein: 38,
      fat: 30,
      carbs: 3
    },
    tags: ['Low carb', 'Keto', 'Gluten free', 'Conservative cheat meal'],
    orderingInstructions: 'Single SmokeShack, nix bun & sauce, lettuce wrap.'
  },

  // Popeyes
  {
    id: 'popeyes-1',
    name: 'Blackened Tenders Low‑Carb Box',
    description: 'Blackened chicken tenders with Cajun green beans',
    restaurantId: 'popeyes',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['3‑pc Blackened Tenders', 'Regular Cajun Green Beans'],
    macros: {
      calories: 210,
      protein: 28,
      fat: 4,
      carbs: 8
    },
    tags: ['Under 400 cal', 'Low carb', 'Keto', 'Gluten free', 'Highest protein'],
    orderingInstructions: '3‑pc Blackened Tenders + green beans; Louisiana hot sauce.'
  },
  {
    id: 'popeyes-2',
    name: 'Naked Chicken Sandwich Bowl',
    description: 'Blackened chicken sandwich breast served over green beans',
    restaurantId: 'popeyes',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ingredients: ['Blackened Chicken Sandwich breast only', 'Side green beans'],
    macros: {
      calories: 310,
      protein: 34,
      fat: 15,
      carbs: 9
    },
    tags: ['Low carb', 'Keto', 'Gluten free', 'Highest protein', 'Under 400 cal'],
    orderingInstructions: 'Blackened Chicken Sandwich breast only, no bun/mayo, over green beans.'
  }
];

export default meals;