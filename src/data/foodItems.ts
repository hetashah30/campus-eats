
// Food items with Indian prices
export const allFoodItems = [
  // Breakfast
  {
    id: '1',
    name: 'Avocado Toast',
    description: 'Smashed avocado on whole grain toast with a sprinkle of chili flakes. Made with locally sourced ingredients for maximum freshness and nutrition. Perfect for a healthy breakfast or light lunch.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=700&auto=format&fit=crop',
    rating: 4.8,
    category: 'Breakfast',
    isVeg: true,
    tags: ['Healthy', 'Popular'],
    ingredients: ['Whole Grain Bread', 'Avocado', 'Cherry Tomatoes', 'Olive Oil', 'Chili Flakes', 'Salt and Pepper'],
    nutritionalInfo: {
      calories: 320,
      protein: '8g',
      carbs: '28g',
      fat: '21g',
      fiber: '7g'
    },
    preparationTime: '10 mins',
    reviews: [
      { user: 'Alex', rating: 5, comment: 'Super fresh and tasty! My go-to breakfast.', date: '2023-11-15' },
      { user: 'Jamie', rating: 4, comment: 'Love it, but could use a bit more seasoning.', date: '2023-11-10' }
    ]
  },
  {
    id: '2',
    name: 'Breakfast Burrito',
    description: 'Scrambled eggs, beans, cheese, and salsa wrapped in a flour tortilla. Our burritos are made fresh every morning with locally sourced ingredients.',
    price: 199,
    image: 'https://www.makeaheadmealmom.com/wp-content/uploads/2023/08/BreakfastBurritos_Featured_compressed.jpg',
    rating: 4.6,
    category: 'Breakfast',
    isVeg: false,
    tags: ['Hearty'],
    ingredients: ['Flour Tortilla', 'Scrambled Eggs', 'Black Beans', 'Cheese', 'Salsa', 'Sour Cream', 'Avocado'],
    nutritionalInfo: {
      calories: 450,
      protein: '18g',
      carbs: '42g',
      fat: '22g',
      fiber: '6g'
    },
    preparationTime: '12 mins',
    reviews: [
      { user: 'Morgan', rating: 5, comment: 'Best breakfast burrito on campus!', date: '2023-11-18' },
      { user: 'Pat', rating: 4, comment: 'Really filling and tasty.', date: '2023-11-05' }
    ]
  },
  {
    id: '3',
    name: 'Pancake Stack',
    description: 'Fluffy pancakes served with maple syrup and fresh berries. Our signature breakfast loved by students and faculty alike.',
    price: 179,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=700&auto=format&fit=crop',
    rating: 4.9,
    category: 'Breakfast',
    isVeg: true,
    tags: ['Sweet', 'Popular'],
    ingredients: ['Flour', 'Milk', 'Eggs', 'Butter', 'Maple Syrup', 'Mixed Berries', 'Powdered Sugar'],
    nutritionalInfo: {
      calories: 520,
      protein: '9g',
      carbs: '68g',
      fat: '19g',
      fiber: '3g'
    },
    preparationTime: '15 mins',
    reviews: [
      { user: 'Charlie', rating: 5, comment: 'These pancakes are to die for!', date: '2023-11-20' },
      { user: 'Jordan', rating: 5, comment: 'So fluffy and delicious.', date: '2023-11-12' }
    ]
  },
  
  // Lunch/Dinner
  {
    id: '4',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and our special sauce on a brioche bun. Served with a side of crispy fries. Our beef is locally sourced and patties are made fresh daily.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=700&auto=format&fit=crop',
    rating: 4.7,
    category: 'Lunch',
    isVeg: false,
    tags: ['Popular'],
    ingredients: ['Beef Patty', 'Brioche Bun', 'Lettuce', 'Tomato', 'Onions', 'Special Sauce', 'Cheddar Cheese'],
    nutritionalInfo: {
      calories: 680,
      protein: '32g',
      carbs: '42g',
      fat: '45g',
      fiber: '3g'
    },
    preparationTime: '15 mins',
    reviews: [
      { user: 'Sam', rating: 5, comment: 'Best burger on campus!', date: '2023-11-20' },
      { user: 'Taylor', rating: 5, comment: 'Absolutely delicious. The sauce is amazing.', date: '2023-11-18' },
      { user: 'Jordan', rating: 4, comment: 'Very good, but slightly overcooked.', date: '2023-11-05' }
    ]
  },
  {
    id: '5',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil. Made with our special dough recipe that has been perfected over years.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=700&auto=format&fit=crop',
    rating: 4.8,
    category: 'Lunch',
    isVeg: true,
    tags: ['Popular', 'Italian'],
    ingredients: ['Pizza Dough', 'Tomato Sauce', 'Fresh Mozzarella', 'Basil Leaves', 'Olive Oil', 'Salt'],
    nutritionalInfo: {
      calories: 580,
      protein: '24g',
      carbs: '58g',
      fat: '26g',
      fiber: '2g'
    },
    preparationTime: '20 mins',
    reviews: [
      { user: 'Alex', rating: 5, comment: 'Authentic Italian taste! Love it.', date: '2023-11-15' },
      { user: 'Jamie', rating: 4, comment: 'Really good pizza, could use a bit more basil.', date: '2023-11-08' }
    ]
  },
  {
    id: '6',
    name: 'Chicken Biryani',
    description: 'Fragrant rice dish with chicken, spices, and herbs. A popular Indian dish that will satisfy your cravings for something flavorful and filling.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=700&auto=format&fit=crop',
    rating: 4.9,
    category: 'Lunch',
    isVeg: false,
    tags: ['Spicy', 'Indian'],
    ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Biryani Masala', 'Onions', 'Tomatoes', 'Mint Leaves', 'Coriander'],
    nutritionalInfo: {
      calories: 650,
      protein: '38g',
      carbs: '72g',
      fat: '22g',
      fiber: '4g'
    },
    preparationTime: '30 mins',
    reviews: [
      { user: 'Raj', rating: 5, comment: 'Reminds me of home! Authentic taste.', date: '2023-11-19' },
      { user: 'Priya', rating: 5, comment: 'Perfect spice level and so flavorful!', date: '2023-11-14' }
    ]
  },
  
  // Snacks
  {
    id: '7',
    name: 'French Fries',
    description: 'Crispy golden fries served with ketchup and mayonnaise. Our fries are made from premium potatoes, double-fried for extra crispiness, and seasoned with our special blend of spices.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=700&auto=format&fit=crop',
    rating: 4.5,
    category: 'Snacks',
    isVeg: true,
    tags: ['Quick'],
    ingredients: ['Potatoes', 'Vegetable Oil', 'Salt', 'Special Seasoning'],
    nutritionalInfo: {
      calories: 450,
      protein: '4g',
      carbs: '56g',
      fat: '23g',
      fiber: '5g'
    },
    preparationTime: '8 mins',
    reviews: [
      { user: 'Casey', rating: 5, comment: 'Perfect crispiness! Love the seasoning.', date: '2023-11-12' },
      { user: 'Riley', rating: 4, comment: 'Good portion size for the price.', date: '2023-11-08' }
    ]
  },
  {
    id: '8',
    name: 'Chicken Nuggets',
    description: '8 pieces of crispy chicken nuggets with dipping sauce. Made from 100% chicken breast meat, breaded and fried to perfection.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=700&auto=format&fit=crop',
    rating: 4.4,
    category: 'Snacks',
    isVeg: false,
    tags: ['Quick'],
    ingredients: ['Chicken Breast', 'Breadcrumbs', 'Flour', 'Eggs', 'Spices', 'Dipping Sauce'],
    nutritionalInfo: {
      calories: 380,
      protein: '22g',
      carbs: '28g',
      fat: '19g',
      fiber: '1g'
    },
    preparationTime: '10 mins',
    reviews: [
      { user: 'Morgan', rating: 4, comment: 'Crispy and tasty, good for a quick snack.', date: '2023-11-10' },
      { user: 'Taylor', rating: 4, comment: 'Like the variety of dipping sauces available.', date: '2023-11-05' }
    ]
  },
  
  // Beverages
  {
    id: '9',
    name: 'Iced Coffee',
    description: 'Refreshing cold coffee with a splash of milk. Brewed with our special blend of coffee beans and served over ice for the perfect pick-me-up.',
    price: 129,
    image: 'https://www.pamperedchef.com/iceberg/com/recipe/2132087-lg.jpg',
    rating: 4.7,
    category: 'Beverages',
    isVeg: true,
    tags: ['Cold', 'Caffeinated'],
    ingredients: ['Coffee', 'Milk', 'Ice', 'Sugar Syrup'],
    nutritionalInfo: {
      calories: 120,
      protein: '4g',
      carbs: '12g',
      fat: '6g',
      fiber: '0g'
    },
    preparationTime: '5 mins',
    reviews: [
      { user: 'Jordan', rating: 5, comment: 'Perfect balance of coffee and milk!', date: '2023-11-18' },
      { user: 'Casey', rating: 5, comment: 'My daily addiction - strong and refreshing.', date: '2023-11-10' }
    ]
  },
  {
    id: '10',
    name: 'Mango Smoothie',
    description: 'Fresh mango blended with yogurt and a hint of honey. A tropical delight that is both refreshing and nutritious.',
    price: 159,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=700&auto=format&fit=crop',
    rating: 4.8,
    category: 'Beverages',
    isVeg: true,
    tags: ['Healthy', 'Sweet'],
    ingredients: ['Mango', 'Yogurt', 'Honey', 'Ice'],
    nutritionalInfo: {
      calories: 220,
      protein: '5g',
      carbs: '48g',
      fat: '2g',
      fiber: '3g'
    },
    preparationTime: '5 mins',
    reviews: [
      { user: 'Jamie', rating: 5, comment: 'So refreshing! Perfect for hot days.', date: '2023-11-20' },
      { user: 'Alex', rating: 4, comment: 'Love the real mango flavor - not artificial at all.', date: '2023-11-15' }
    ]
  },
  
  // Desserts
  {
    id: '11',
    name: 'Chocolate Brownie',
    description: 'Rich and fudgy brownie with a scoop of vanilla ice cream. Our signature dessert that chocolate lovers cannot resist.',
    price: 199,
    image: 'https://i0.wp.com/cookingwithbry.com/wp-content/uploads/chocolate-brownies-recipe.png?fit=1080%2C1080&ssl=1',
    rating: 4.9,
    category: 'Desserts',
    isVeg: true,
    tags: ['Sweet', 'Popular'],
    ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Vanilla Ice Cream'],
    nutritionalInfo: {
      calories: 450,
      protein: '6g',
      carbs: '52g',
      fat: '24g',
      fiber: '2g'
    },
    preparationTime: '10 mins',
    reviews: [
      { user: 'Taylor', rating: 5, comment: 'Heavenly! The ice cream with warm brownie is perfect.', date: '2023-11-19' },
      { user: 'Riley', rating: 5, comment: 'Best brownie I have ever had - so rich and fudgy!', date: '2023-11-16' }
    ]
  },
  {
    id: '12',
    name: 'Cheesecake',
    description: 'Creamy New York style cheesecake with berry compote. A classic dessert that is both rich and light at the same time.',
    price: 229,
    image: 'https://www.marthastewart.com/thmb/m6R1D2iuHvVxM8u7RJz7c-Us8Rg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-865202-new-york-cheesecake-hero-horiz-0723-84e3c796119d408581d1ef4d02d801cd.jpg',
    rating: 4.7,
    category: 'Desserts',
    isVeg: true,
    tags: ['Sweet'],
    ingredients: ['Cream Cheese', 'Sugar', 'Eggs', 'Graham Cracker Crust', 'Vanilla Extract', 'Berry Compote'],
    nutritionalInfo: {
      calories: 380,
      protein: '7g',
      carbs: '34g',
      fat: '24g',
      fiber: '1g'
    },
    preparationTime: '15 mins',
    reviews: [
      { user: 'Morgan', rating: 5, comment: 'Perfect texture and not too sweet.', date: '2023-11-17' },
      { user: 'Pat', rating: 4, comment: 'Love the berry compote topping!', date: '2023-11-14' }
    ]
  },
  // Additional items
  {
    id: '13',
    name: 'Masala Dosa',
    description: 'Crispy South Indian crepe filled with spiced potato filling. Served with sambar and coconut chutney.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFzYWxhJTIwZG9zYXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.8,
    category: 'Breakfast',
    isVeg: true,
    tags: ['Indian', 'Spicy'],
    ingredients: ['Rice Batter', 'Urad Dal Batter', 'Potatoes', 'Onions', 'Green Chillies', 'Mustard Seeds', 'Turmeric'],
    nutritionalInfo: {
      calories: 340,
      protein: '6g',
      carbs: '48g',
      fat: '14g',
      fiber: '4g'
    },
    preparationTime: '15 mins',
    reviews: [
      { user: 'Priya', rating: 5, comment: 'Authentic South Indian taste!', date: '2023-12-05' },
      { user: 'Rahul', rating: 5, comment: 'Crispy outside, soft filling. Perfect!', date: '2023-12-01' }
    ]
  },
  {
    id: '14',
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich and creamy tomato-based curry sauce. Served with naan or rice.',
    price: 379,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=700&auto=format&fit=crop',
    rating: 4.9,
    category: 'Lunch',
    isVeg: false,
    tags: ['Indian', 'Popular', 'Spicy'],
    ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Butter', 'Garam Masala', 'Fenugreek Leaves', 'Ginger Garlic Paste'],
    nutritionalInfo: {
      calories: 560,
      protein: '32g',
      carbs: '18g',
      fat: '38g',
      fiber: '2g'
    },
    preparationTime: '25 mins',
    reviews: [
      { user: 'Ankit', rating: 5, comment: 'Creamy, rich and delicious. My favorite!', date: '2023-12-10' },
      { user: 'Maya', rating: 4, comment: 'Really good flavor, but could be a bit more spicy.', date: '2023-12-05' }
    ]
  },
  {
    id: '15',
    name: 'Paneer Tikka',
    description: 'Marinated and grilled cottage cheese cubes with vegetables. Served with mint chutney.',
    price: 279,
    image: 'https://images.unsplash.com/photo-1701579231320-cc2f7acad3cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
    category: 'Lunch',
    isVeg: true,
    tags: ['Indian', 'Healthy'],
    ingredients: ['Paneer', 'Bell Peppers', 'Onions', 'Yogurt', 'Tikka Masala', 'Lemon Juice'],
    nutritionalInfo: {
      calories: 380,
      protein: '22g',
      carbs: '14g',
      fat: '26g',
      fiber: '3g'
    },
    preparationTime: '20 mins',
    reviews: [
      { user: 'Neha', rating: 4, comment: 'Perfectly grilled and seasoned!', date: '2023-12-12' },
      { user: 'Vikram', rating: 5, comment: 'Best paneer tikka on campus!', date: '2023-12-08' }
    ]
  }
];

// Similar products based on category
export const getSimilarProducts = (currentProduct) => {
  if (!currentProduct) return [];
  
  return allFoodItems
    .filter(item => 
      item.id !== currentProduct.id && 
      item.category === currentProduct.category
    )
    .slice(0, 3);
};
