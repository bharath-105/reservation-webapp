export interface MenuItemData {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  calories: number;
  protein: number;
}

export interface MenuCategory {
  title: string;
  subcategories?: {
    title: string;
    items: MenuItemData[];
  }[];
  items?: MenuItemData[];
}

export const menuData: MenuCategory[] = [
  {
    title: 'Starters',
    subcategories: [
      {
        title: 'Veg',
        items: [
          { id: 's_v1', name: 'French Fries', price: 149, calories: 365, protein: 4, description: 'Classic salted french fries.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908581?w=400&q=80' },
          { id: 's_v2', name: 'Peri Peri Fries', price: 169, calories: 390, protein: 4, description: 'Spicy peri peri dusted fries.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908581?w=400&q=80' },
          { id: 's_v3', name: 'Cheese Fries', price: 199, calories: 520, protein: 11, description: 'Fries loaded with melted cheese.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908581?w=400&q=80' },
          { id: 's_v4', name: 'Garlic Bread', price: 159, calories: 280, protein: 7, description: 'Freshly baked garlic bread.', image: 'https://images.unsplash.com/photo-1619531040578-8316c0274737?w=400&q=80' },
          { id: 's_v5', name: 'Cheesy Garlic Bread', price: 199, calories: 410, protein: 13, description: 'Garlic bread topped with mozzarella.', image: 'https://images.unsplash.com/photo-1619531040578-8316c0274737?w=400&q=80' },
          { id: 's_v6', name: 'Veg Spring Rolls', price: 189, calories: 290, protein: 6, description: 'Crispy rolls stuffed with mixed veggies.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80' },
          { id: 's_v7', name: 'Gobi Manchurian', price: 269, calories: 390, protein: 8, description: 'Crispy cauliflower in tangy sauce.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
          { id: 's_v8', name: 'Veg Manchurian', price: 289, calories: 430, protein: 10, description: 'Vegetable dumplings in spicy sauce.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
          { id: 's_v9', name: 'Chilli Paneer', price: 299, calories: 480, protein: 21, description: 'Spicy cottage cheese cubes.', image: 'https://images.unsplash.com/photo-1599487405270-81744e83c276?w=400&q=80' },
          { id: 's_v10', name: 'Loaded Nachos', price: 249, calories: 610, protein: 14, description: 'Nachos topped with salsa and cheese.', image: 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?w=400&q=80' }
        ]
      },
      {
        title: 'Non-Veg',
        items: [
          { id: 's_nv1', name: 'Chicken Popcorn', price: 239, calories: 420, protein: 24, description: 'Bite-sized crispy chicken.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },
          { id: 's_nv2', name: 'Crispy Chicken Strips', price: 269, calories: 480, protein: 31, description: 'Golden fried chicken tenders.', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },
          { id: 's_nv3', name: 'Chicken Spring Rolls', price: 229, calories: 350, protein: 18, description: 'Crispy rolls with minced chicken.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80' },
          { id: 's_nv4', name: 'Chilli Chicken', price: 339, calories: 520, protein: 36, description: 'Spicy Indo-Chinese chicken.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
          { id: 's_nv5', name: 'Dragon Chicken', price: 369, calories: 610, protein: 38, description: 'Fiery sweet and spicy chicken.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
          { id: 's_nv6', name: 'Chicken Manchurian', price: 349, calories: 560, protein: 35, description: 'Chicken in dark soy and garlic sauce.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
          { id: 's_nv7', name: 'Garlic Pepper Chicken', price: 359, calories: 540, protein: 39, description: 'Chicken tossed in garlic and black pepper.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' }
        ]
      }
    ]
  },
  {
    title: 'Main Course',
    subcategories: [
      {
        title: 'Indian',
        items: [
          { id: 'mc_in1', name: 'Butter Chicken', price: 429, calories: 720, protein: 42, description: 'Rich tomato gravy with roasted chicken.', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' },
          { id: 'mc_in2', name: 'Chicken Curry', price: 389, calories: 590, protein: 40, description: 'Classic homestyle chicken curry.', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' },
          { id: 'mc_in3', name: 'Kadai Chicken', price: 399, calories: 640, protein: 44, description: 'Spicy chicken cooked with bell peppers.', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' },
          { id: 'mc_in4', name: 'Butter Paneer', price: 339, calories: 560, protein: 22, description: 'Cottage cheese in rich buttery gravy.', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' },
          { id: 'mc_in5', name: 'Kadai Paneer', price: 329, calories: 490, protein: 24, description: 'Cottage cheese with capsicum in spices.', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80' },
          { id: 'mc_in6', name: 'Dal Tadka', price: 239, calories: 320, protein: 15, description: 'Yellow lentils tempered with cumin.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' }
        ]
      },
      {
        title: 'Arabian',
        items: [
          { id: 'mc_ar1', name: 'Chicken Shawarma Plate', price: 329, calories: 760, protein: 38, description: 'Sliced roasted chicken with hummus and pita.', image: 'https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?w=400&q=80' },
          { id: 'mc_ar2', name: 'Chicken Mandi', price: 459, calories: 1040, protein: 50, description: 'Traditional Yemeni rice with roasted chicken.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
          { id: 'mc_ar3', name: 'Chicken Kabsa', price: 469, calories: 1120, protein: 52, description: 'Spiced rice with tender chicken.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
          { id: 'mc_ar4', name: 'Alfaham (Half)', price: 449, calories: 980, protein: 65, description: 'Half portion of Arabian grilled chicken.', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&q=80' },
          { id: 'mc_ar5', name: 'Alfaham (Full)', price: 799, calories: 1850, protein: 130, description: 'Full portion of Arabian grilled chicken.', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&q=80' },
          { id: 'mc_ar6', name: 'Grilled Chicken (Half)', price: 429, calories: 910, protein: 67, description: 'Classic half grilled chicken.', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&q=80' },
          { id: 'mc_ar7', name: 'Grilled Chicken (Full)', price: 799, calories: 1780, protein: 132, description: 'Classic full grilled chicken.', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&q=80' }
        ]
      },
      {
        title: 'Italian',
        items: [
          { id: 'mc_it1', name: 'Alfredo Pasta', price: 329, calories: 760, protein: 20, description: 'Creamy white sauce pasta.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' },
          { id: 'mc_it2', name: 'Arrabbiata Pasta', price: 319, calories: 610, protein: 15, description: 'Spicy tomato sauce pasta.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' },
          { id: 'mc_it3', name: 'Pink Sauce Pasta', price: 339, calories: 720, protein: 19, description: 'Mix of Alfredo and Arrabbiata.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' },
          { id: 'mc_it4', name: 'Chicken Alfredo', price: 389, calories: 860, protein: 42, description: 'Alfredo pasta with grilled chicken.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' },
          { id: 'mc_it5', name: 'Chicken Arrabbiata', price: 379, calories: 740, protein: 40, description: 'Arrabbiata pasta with grilled chicken.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80' },
          { id: 'mc_it6', name: 'Veg Lasagna', price: 369, calories: 690, protein: 21, description: 'Baked pasta layers with veggies.', image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?w=400&q=80' },
          { id: 'mc_it7', name: 'Chicken Lasagna', price: 429, calories: 820, protein: 40, description: 'Baked pasta layers with minced chicken.', image: 'https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?w=400&q=80' }
        ]
      }
    ]
  },
  {
    title: 'Breads',
    items: [
      { id: 'br_1', name: 'Tandoori Roti', price: 45, calories: 120, protein: 4, description: 'Whole wheat flatbread baked in tandoor.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'br_2', name: 'Butter Roti', price: 55, calories: 150, protein: 4, description: 'Tandoori roti glazed with butter.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'br_3', name: 'Butter Naan', price: 69, calories: 190, protein: 6, description: 'Soft bread glazed with butter.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'br_4', name: 'Garlic Naan', price: 89, calories: 230, protein: 7, description: 'Naan topped with minced garlic.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'br_5', name: 'Cheese Naan', price: 139, calories: 360, protein: 13, description: 'Naan stuffed with cheese.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'br_6', name: 'Kulcha', price: 79, calories: 210, protein: 6, description: 'Soft leavened flatbread.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'br_7', name: 'Butter Kulcha', price: 99, calories: 260, protein: 7, description: 'Kulcha topped with butter.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'br_8', name: 'Rumali Roti', price: 49, calories: 130, protein: 4, description: 'Thin and soft flatbread.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' }
    ]
  },
  {
    title: 'Rice',
    items: [
      { id: 'rc_1', name: 'Steamed Rice', price: 99, calories: 260, protein: 5, description: 'Plain boiled basmati rice.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
      { id: 'rc_2', name: 'Jeera Rice', price: 159, calories: 340, protein: 6, description: 'Rice tempered with cumin seeds.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
      { id: 'rc_3', name: 'Veg Fried Rice', price: 249, calories: 520, protein: 11, description: 'Indo-Chinese style vegetable fried rice.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
      { id: 'rc_4', name: 'Chicken Fried Rice', price: 299, calories: 650, protein: 28, description: 'Indo-Chinese style chicken fried rice.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
      { id: 'rc_5', name: 'Egg Fried Rice', price: 269, calories: 610, protein: 20, description: 'Fried rice with scrambled eggs.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
      { id: 'rc_6', name: 'Schezwan Fried Rice', price: 269, calories: 570, protein: 12, description: 'Spicy Schezwan style fried rice.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
      { id: 'rc_7', name: 'Veg Biryani', price: 299, calories: 740, protein: 14, description: 'Aromatic rice with mixed vegetables.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
      { id: 'rc_8', name: 'Paneer Biryani', price: 349, calories: 810, protein: 25, description: 'Aromatic rice with spiced paneer.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
      { id: 'rc_9', name: 'Chicken Biryani', price: 389, calories: 940, protein: 42, description: 'Aromatic basmati rice with chicken.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
      { id: 'rc_10', name: 'Mutton Biryani', price: 529, calories: 1180, protein: 45, description: 'Aromatic rice with tender mutton.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
      { id: 'rc_11', name: 'Triple Schezwan Rice', price: 399, calories: 960, protein: 38, description: 'Rice, noodles, and chicken gravy combo.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' }
    ]
  },
  {
    title: 'Noodles',
    items: [
      { id: 'nd_1', name: 'Veg Hakka Noodles', price: 249, calories: 540, protein: 11, description: 'Stir-fried noodles with veggies.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80' },
      { id: 'nd_2', name: 'Chicken Hakka Noodles', price: 319, calories: 690, protein: 31, description: 'Stir-fried noodles with chicken.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80' },
      { id: 'nd_3', name: 'Egg Hakka Noodles', price: 289, calories: 620, protein: 22, description: 'Stir-fried noodles with egg.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80' },
      { id: 'nd_4', name: 'Schezwan Noodles', price: 279, calories: 590, protein: 12, description: 'Spicy noodles in Schezwan sauce.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80' },
      { id: 'nd_5', name: 'Singapore Noodles', price: 339, calories: 710, protein: 20, description: 'Curry flavored rice noodles.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80' },
      { id: 'nd_6', name: 'Garlic Chicken Noodles', price: 349, calories: 740, protein: 34, description: 'Noodles with garlic-infused chicken.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80' }
    ]
  },
  {
    title: 'Drinks',
    subcategories: [
      {
        title: 'Coffee',
        items: [
          { id: 'dr_c1', name: 'Espresso', price: 129, calories: 5, protein: 0, description: 'Strong black coffee.', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80' },
          { id: 'dr_c2', name: 'Americano', price: 149, calories: 10, protein: 0, description: 'Espresso with hot water.', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80' },
          { id: 'dr_c3', name: 'Cappuccino', price: 189, calories: 120, protein: 6, description: 'Espresso with steamed milk foam.', image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&q=80' },
          { id: 'dr_c4', name: 'Latte', price: 199, calories: 170, protein: 8, description: 'Espresso with plenty of steamed milk.', image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&q=80' },
          { id: 'dr_c5', name: 'Mocha', price: 219, calories: 250, protein: 9, description: 'Espresso with chocolate and milk.', image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&q=80' },
          { id: 'dr_c6', name: 'Flat White', price: 199, calories: 160, protein: 8, description: 'Espresso with microfoam milk.', image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&q=80' }
        ]
      },
      {
        title: 'Milkshakes',
        items: [
          { id: 'dr_m1', name: 'Chocolate', price: 229, calories: 610, protein: 12, description: 'Thick chocolate milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?w=400&q=80' },
          { id: 'dr_m2', name: 'Oreo', price: 249, calories: 690, protein: 13, description: 'Classic Oreo cookies blended with milk.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?w=400&q=80' },
          { id: 'dr_m3', name: 'KitKat', price: 259, calories: 720, protein: 14, description: 'KitKat chocolate bar milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?w=400&q=80' },
          { id: 'dr_m4', name: 'Brownie', price: 289, calories: 780, protein: 15, description: 'Fudge brownie mixed in a shake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?w=400&q=80' },
          { id: 'dr_m5', name: 'Mango', price: 219, calories: 490, protein: 11, description: 'Fresh mango milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?w=400&q=80' },
          { id: 'dr_m6', name: 'Strawberry', price: 229, calories: 470, protein: 11, description: 'Sweet strawberry milkshake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?w=400&q=80' },
          { id: 'dr_m7', name: 'Vanilla', price: 199, calories: 430, protein: 10, description: 'Classic vanilla bean shake.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8fc?w=400&q=80' }
        ]
      },
      {
        title: 'Mojitos',
        items: [
          { id: 'dr_mo1', name: 'Classic Mint Mojito', price: 179, calories: 120, protein: 0, description: 'Refreshing mint and lime.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
          { id: 'dr_mo2', name: 'Blue Lagoon', price: 199, calories: 150, protein: 0, description: 'Blue curacao flavored mojito.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
          { id: 'dr_mo3', name: 'Green Apple', price: 199, calories: 145, protein: 0, description: 'Tangy green apple mojito.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
          { id: 'dr_mo4', name: 'Kiwi', price: 219, calories: 160, protein: 1, description: 'Fresh kiwi mojito.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
          { id: 'dr_mo5', name: 'Watermelon', price: 199, calories: 140, protein: 1, description: 'Cool watermelon mojito.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
          { id: 'dr_mo6', name: 'Passion Fruit', price: 219, calories: 170, protein: 1, description: 'Tropical passion fruit mojito.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
          { id: 'dr_mo7', name: 'Peach', price: 209, calories: 165, protein: 0, description: 'Sweet peach mojito.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
          { id: 'dr_mo8', name: 'Strawberry', price: 209, calories: 175, protein: 1, description: 'Berry fresh mojito.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' }
        ]
      },
      {
        title: 'Mocktails',
        items: [
          { id: 'dr_mk1', name: 'Virgin Mojito', price: 179, calories: 120, protein: 0, description: 'Classic non-alcoholic mojito.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
          { id: 'dr_mk2', name: 'Fruit Punch', price: 229, calories: 190, protein: 1, description: 'Mixed fruit juice punch.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
          { id: 'dr_mk3', name: 'Shirley Temple', price: 219, calories: 170, protein: 0, description: 'Ginger ale and grenadine.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
          { id: 'dr_mk4', name: 'Sunrise Cooler', price: 239, calories: 180, protein: 1, description: 'Orange juice and grenadine layered.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
          { id: 'dr_mk5', name: 'Peach Iced Tea', price: 189, calories: 130, protein: 0, description: 'Chilled tea with peach flavor.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
          { id: 'dr_mk6', name: 'Lemon Iced Tea', price: 169, calories: 90, protein: 0, description: 'Chilled tea with fresh lemon.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
          { id: 'dr_mk7', name: 'Cranberry Cooler', price: 229, calories: 160, protein: 0, description: 'Refreshing cranberry mocktail.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' }
        ]
      }
    ]
  },
  {
    title: 'Ice Cream & Desserts',
    items: [
      { id: 'ds_1', name: 'Vanilla Scoop', price: 99, calories: 160, protein: 3, description: 'Single scoop of vanilla.', image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&q=80' },
      { id: 'ds_2', name: 'Chocolate Scoop', price: 109, calories: 180, protein: 3, description: 'Single scoop of chocolate.', image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&q=80' },
      { id: 'ds_3', name: 'Strawberry Scoop', price: 109, calories: 170, protein: 3, description: 'Single scoop of strawberry.', image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&q=80' },
      { id: 'ds_4', name: 'Butterscotch Scoop', price: 109, calories: 190, protein: 3, description: 'Single scoop of butterscotch.', image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&q=80' },
      { id: 'ds_5', name: 'Brownie with Ice Cream', price: 269, calories: 620, protein: 9, description: 'Warm brownie topped with vanilla.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80' },
      { id: 'ds_6', name: 'Chocolate Lava Cake', price: 299, calories: 490, protein: 7, description: 'Gooey molten chocolate cake.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80' },
      { id: 'ds_7', name: 'New York Cheesecake', price: 329, calories: 560, protein: 10, description: 'Classic baked cheesecake.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80' },
      { id: 'ds_8', name: 'Tiramisu', price: 349, calories: 520, protein: 8, description: 'Coffee-flavored Italian dessert.', image: 'https://images.unsplash.com/photo-1571115177098-24edf523455b?w=400&q=80' },
      { id: 'ds_9', name: 'Ice Cream Sundae', price: 259, calories: 530, protein: 8, description: 'Mixed scoops with syrup and nuts.', image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&q=80' }
    ]
  },
  {
    title: 'Sides',
    items: [
      { id: 'sd_1', name: 'Raita', price: 79, calories: 90, protein: 4, description: 'Cool yogurt with cucumber and spices.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'sd_2', name: 'Onion Salad', price: 59, calories: 35, protein: 1, description: 'Sliced onions with lemon.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'sd_3', name: 'Green Salad', price: 99, calories: 70, protein: 2, description: 'Fresh mixed vegetable salad.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
      { id: 'sd_4', name: 'Papad', price: 35, calories: 40, protein: 2, description: 'Crispy lentil wafer.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80' },
      { id: 'sd_5', name: 'Pickle', price: 30, calories: 20, protein: 0, description: 'Spicy mixed pickle.', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'sd_6', name: 'Hummus', price: 149, calories: 220, protein: 8, description: 'Creamy chickpea dip.', image: 'https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?w=400&q=80' },
      { id: 'sd_7', name: 'Pita Bread', price: 79, calories: 170, protein: 6, description: 'Soft Arabian flatbread.', image: 'https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?w=400&q=80' },
      { id: 'sd_8', name: 'Extra Cheese', price: 69, calories: 110, protein: 7, description: 'Add more cheese!', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&q=80' },
      { id: 'sd_9', name: 'French Fries', price: 149, calories: 365, protein: 4, description: 'Extra side of fries.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908581?w=400&q=80' },
      { id: 'sd_10', name: 'Peri Peri Dip', price: 49, calories: 45, protein: 0, description: 'Spicy dipping sauce.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908581?w=400&q=80' },
      { id: 'sd_11', name: 'Garlic Mayo', price: 49, calories: 110, protein: 0, description: 'Creamy garlic mayonnaise.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908581?w=400&q=80' },
      { id: 'sd_12', name: 'BBQ Sauce', price: 49, calories: 60, protein: 0, description: 'Smoky BBQ sauce.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908581?w=400&q=80' },
      { id: 'sd_13', name: 'Cheese Dip', price: 69, calories: 120, protein: 5, description: 'Melted cheese sauce.', image: 'https://images.unsplash.com/photo-1576107232684-1279f3908581?w=400&q=80' }
    ]
  }
];
