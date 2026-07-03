const DEMO_DELAY = 400;

export const demoData = {
  users: [
    { id: 1, name: 'Admin User', email: 'admin@foodease.com', role: 'ADMIN', password: 'admin123', phone: '9876543210', restaurantId: 1, address: 'Admin HQ, Tech Park', city: 'Hyderabad', state: 'Telangana', pincode: '500081' },
    { id: 2, name: 'John Doe', email: 'customer@foodease.com', role: 'CUSTOMER', password: 'password', phone: '9123456789', address: '123 Main St, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500033' },
    { id: 3, name: 'Jane Smith', email: 'restaurant@foodease.com', role: 'ADMIN', password: 'password', phone: '9988776655', restaurantId: 1, address: '456 Market St, Banjara Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500034' },
  ],
  categories: [
    { id: 1, name: 'Biryani & Pulao', description: 'Aromatic royal rice delicacies cooked with authentic spices', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8' },
    { id: 2, name: 'North Indian Curries', description: 'Rich, creamy and flavorful traditional gravies', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe' },
    { id: 3, name: 'South Indian Delights', description: 'Crispy dosas, fluffy idlis and authentic coastal curries', imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921' },
    { id: 4, name: 'Tandoor & Starters', description: 'Smoky clay-oven char-grilled tikkas and kebabs', imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28' },
    { id: 5, name: 'Indian Street Food & Chaat', description: 'Tangy, spicy and crunchy Indian street favorites', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950' },
    { id: 6, name: 'Breads & Rice', description: 'Fresh tandoori naans, rotis and fragrant basmati rice', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
    { id: 7, name: 'Indian Desserts & Beverages', description: 'Sweet treats and traditional refreshing beverages', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b' }
  ],
  restaurants: [
    { id: 1, name: 'FoodEase Royal Kitchen', description: 'Authentic Indian Cuisines & Delicacies', address: 'Plot 42, Foodie Street, Madhapur, Hyderabad', phone: '9876543210', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', rating: 4.8, isActive: true, businessTiming: '10:00 AM - 11:30 PM', gstNumber: '29ABCDE1234F1Z5', ownerId: 1 },
  ],
  foods: [
    { id: 1, name: 'Hyderabadi Dum Biryani', description: 'Fragrant basmati rice cooked with tender marinated chicken and authentic Hyderabadi spices', price: 349, imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '40 mins', rating: 4.9, offerBadge: 'Bestseller 🔥', categoryName: 'Biryani & Pulao', restaurantId: 1, categoryId: 1 },
    { id: 2, name: 'Lucknow Mutton Biryani', description: 'Slow-cooked authentic aromatic Lucknow mutton biryani infused with saffron and royal spices', price: 449, imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '45 mins', rating: 4.8, offerBadge: 'Chef Special ⭐', categoryName: 'Biryani & Pulao', restaurantId: 1, categoryId: 1 },
    { id: 3, name: 'Paneer Tikka Biryani', description: 'Smoky paneer tikka layered with aromatic basmati rice and rich gravy', price: 299, imageUrl: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '35 mins', rating: 4.7, offerBadge: '20% OFF 🏷️', categoryName: 'Biryani & Pulao', restaurantId: 1, categoryId: 1 },
    { id: 4, name: 'Vegetable Pulao', description: 'Classic light basmati pulao tossed with seasonal green vegetables and whole spices', price: 219, imageUrl: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '25 mins', rating: 4.6, categoryName: 'Biryani & Pulao', restaurantId: 1, categoryId: 1 },
    { id: 5, name: 'Egg Dum Biryani', description: 'Spiced boiled eggs layered with flavorful biryani rice and caramelized onions', price: 269, imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '30 mins', rating: 4.7, categoryName: 'Biryani & Pulao', restaurantId: 1, categoryId: 1 },
    { id: 6, name: 'Kaju Jeera Rice', description: 'Premium fragrant basmati rice tempered with roasted cumin seeds and golden cashews', price: 229, imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '20 mins', rating: 4.8, categoryName: 'Biryani & Pulao', restaurantId: 1, categoryId: 1 },

    { id: 7, name: 'Butter Chicken', description: 'Creamy tomato-based butter chicken curry.', price: 349, imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '30 mins', rating: 4.9, offerBadge: 'Must Try 😋', categoryName: 'North Indian Curries', restaurantId: 1, categoryId: 2 },
    { id: 8, name: 'Paneer Butter Masala', description: 'Cottage cheese cubes cooked in rich, creamy tomato and cashew nut gravy', price: 299, imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '25 mins', rating: 4.8, offerBadge: 'Popular 🔥', categoryName: 'North Indian Curries', restaurantId: 1, categoryId: 2 },
    { id: 9, name: 'Dal Makhani', description: 'Black lentils slow-cooked overnight with fresh cream, butter, and mild spices', price: 249, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '35 mins', rating: 4.9, categoryName: 'North Indian Curries', restaurantId: 1, categoryId: 2 },
    { id: 10, name: 'Kadai Chicken', description: 'Wok-tossed chicken cooked with bell peppers, onions, and freshly ground kadai masala', price: 329, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '30 mins', rating: 4.7, categoryName: 'North Indian Curries', restaurantId: 1, categoryId: 2 },
    { id: 11, name: 'Chana Masala', description: 'Chickpea curry in rich tomato-onion gravy garnished with fresh coriander.', price: 219, imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '25 mins', rating: 4.6, categoryName: 'North Indian Curries', restaurantId: 1, categoryId: 2 },
    { id: 12, name: 'Mutton Rogan Josh', description: 'Traditional Kashmiri mutton curry cooked with aromatic spices and ratanjot', price: 469, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '45 mins', rating: 4.8, categoryName: 'North Indian Curries', restaurantId: 1, categoryId: 2 },

    { id: 13, name: 'Masala Dosa', description: 'Crispy South Indian golden crepe stuffed with spiced potato masala, served with sambar and coconut chutney', price: 149, imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '15 mins', rating: 4.9, categoryName: 'South Indian Delights', restaurantId: 1, categoryId: 3 },
    { id: 14, name: 'Idli Sambar', description: 'Soft steamed white idlis served with a bowl of piping hot vegetable sambar clearly visible.', price: 109, imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.8, categoryName: 'South Indian Delights', restaurantId: 1, categoryId: 3 },
    { id: 15, name: 'Mysore Bajjis', description: 'Golden fried South Indian bajjis bondas served with coconut chutney.', price: 129, imageUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '15 mins', rating: 4.7, categoryName: 'South Indian Delights', restaurantId: 1, categoryId: 3 },
    { id: 16, name: 'Chicken Chettinad', description: 'South Indian spicy chicken curry in rich dark spicy gravy served in a bowl.', price: 339, imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '35 mins', rating: 4.8, categoryName: 'South Indian Delights', restaurantId: 1, categoryId: 3 },
    { id: 17, name: 'Malabar Prawn Curry', description: 'Fresh succulent prawns cooked in coastal coconut curry.', price: 429, imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '30 mins', rating: 4.9, categoryName: 'South Indian Delights', restaurantId: 1, categoryId: 3 },
    { id: 18, name: 'Medu Vada', description: 'Traditional crispy South Indian medu vada lentil doughnuts served with aromatic sambar and chutney', price: 119, imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '15 mins', rating: 4.8, categoryName: 'South Indian Delights', restaurantId: 1, categoryId: 3 },

    { id: 19, name: 'Tandoori Chicken', description: 'Red grilled tandoori chicken legs roasted in clay oven with charred spots served with onion and lemon.', price: 329, imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '30 mins', rating: 4.9, categoryName: 'Tandoor & Starters', restaurantId: 1, categoryId: 4 },
    { id: 20, name: 'Paneer Tikka', description: 'Marinated paneer cubes grilled with vegetables.', price: 279, imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '25 mins', rating: 4.8, categoryName: 'Tandoor & Starters', restaurantId: 1, categoryId: 4 },
    { id: 21, name: 'Chicken Seekh Kebab', description: 'Indian style spiced minced chicken skewers grilled in clay tandoor.', price: 319, imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '25 mins', rating: 4.8, categoryName: 'Tandoor & Starters', restaurantId: 1, categoryId: 4 },
    { id: 22, name: 'Hara Bhara Kebab', description: 'Green veg hara bhara kebab patties made with fresh spinach, green peas, and traditional Indian herbs', price: 229, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '20 mins', rating: 4.7, categoryName: 'Tandoor & Starters', restaurantId: 1, categoryId: 4 },
    { id: 23, name: 'Fish Tikka', description: 'Indian style succulent boneless fish tikka chunks marinated in aromatic spices and char-grilled', price: 389, imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: false, preparationTime: '30 mins', rating: 4.8, categoryName: 'Tandoor & Starters', restaurantId: 1, categoryId: 4 },
    { id: 24, name: 'Mushroom Tikka', description: 'Marinated tandoor grilled button mushrooms with char marks served on skewers.', price: 259, imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '25 mins', rating: 4.6, categoryName: 'Tandoor & Starters', restaurantId: 1, categoryId: 4 },

    { id: 25, name: 'Pani Puri', description: 'Crispy hollow puris served with mint water, tamarind water, and spiced potato filling.', price: 89, imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.9, categoryName: 'Indian Street Food & Chaat', restaurantId: 1, categoryId: 5 },
    { id: 26, name: 'Pav Bhaji', description: 'Spiced mashed vegetable curry cooked in butter, served with toasted soft pav bread', price: 169, imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '15 mins', rating: 4.9, categoryName: 'Indian Street Food & Chaat', restaurantId: 1, categoryId: 5 },
    { id: 27, name: 'Samosa Chaat', description: 'Crushed samosas topped with spiced chole, chilled yogurt, and sweet-tangy chutneys', price: 119, imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '12 mins', rating: 4.8, categoryName: 'Indian Street Food & Chaat', restaurantId: 1, categoryId: 5 },
    { id: 28, name: 'Vada Pav', description: 'Authentic Mumbai potato vada inside pav bun with dry garlic chutney & fried green chilli.', price: 79, imageUrl: 'https://images.unsplash.com/photo-1609167830220-7164aa360951?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.8, categoryName: 'Indian Street Food & Chaat', restaurantId: 1, categoryId: 5 },
    { id: 29, name: 'Aloo Tikki Chaat', description: 'Crispy spiced potato patties topped with white peas curry, sweet curd, and sev', price: 129, imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '15 mins', rating: 4.7, categoryName: 'Indian Street Food & Chaat', restaurantId: 1, categoryId: 5 },
    { id: 30, name: 'Dahi Puri', description: 'Crispy puris loaded with yogurt, sweet tamarind chutney, spicy green chutney and crunchy sev.', price: 119, imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.8, categoryName: 'Indian Street Food & Chaat', restaurantId: 1, categoryId: 5 },

    { id: 31, name: 'Butter Naan', description: 'Soft fluffy traditional Indian naan freshly brushed with golden butter.', price: 59, imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.9, categoryName: 'Breads & Rice', restaurantId: 1, categoryId: 6 },
    { id: 32, name: 'Garlic Naan', description: 'Restaurant style baked garlic naan generously topped with butter garlic and chopped coriander.', price: 79, imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.9, categoryName: 'Breads & Rice', restaurantId: 1, categoryId: 6 },
    { id: 33, name: 'Tandoori Roti', description: 'Whole wheat tandoori roti baked inside clay tandoor with slight char marks served on a plate.', price: 39, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.7, categoryName: 'Breads & Rice', restaurantId: 1, categoryId: 6 },

    { id: 36, name: 'Gulab Jamun', description: 'Golden brown deep-fried sweet gulab jamuns soaked in visible sugar syrup.', price: 119, imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.9, categoryName: 'Indian Desserts & Beverages', restaurantId: 1, categoryId: 7 },
    { id: 37, name: 'Rasmalai', description: 'Soft paneer patties immersed in thick saffron milk with pistachio garnish.', price: 149, imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.9, categoryName: 'Indian Desserts & Beverages', restaurantId: 1, categoryId: 7 },
    { id: 38, name: 'Mango Lassi', description: 'Traditional thick churned mango lassi yogurt drink blended with ripe sweet Alphonso mango pulp', price: 129, imageUrl: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.8, categoryName: 'Indian Desserts & Beverages', restaurantId: 1, categoryId: 7 },
    { id: 39, name: 'Masala Chai', description: 'Authentic Indian masala tea brewed freshly with crushed ginger, cardamom cloves, and rich milk', price: 69, imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.9, categoryName: 'Indian Desserts & Beverages', restaurantId: 1, categoryId: 7 },
    { id: 40, name: 'Kesar Pista Kulfi', description: 'Traditional dense Indian frozen dairy dessert flavored with saffron and pistachios', price: 139, imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80', available: true, vegetarian: true, preparationTime: '10 mins', rating: 4.8, categoryName: 'Indian Desserts & Beverages', restaurantId: 1, categoryId: 7 }
  ],
  orders: [
    {
      id: 1001,
      userId: 2,
      userName: 'John Doe',
      restaurantId: 1,
      restaurantName: 'FoodEase Royal Kitchen',
      deliveryAddress: '123 Main St, Jubilee Hills, Hyderabad',
      paymentMethod: 'CASH_ON_DELIVERY',
      paymentStatus: 'PENDING',
      status: 'PREPARING',
      totalAmount: 798,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      orderItems: [
        { id: 101, foodItemId: 1, foodItemName: 'Hyderabadi Dum Biryani', quantity: 1, price: 349 },
        { id: 102, foodItemId: 2, foodItemName: 'Lucknow Mutton Biryani', quantity: 1, price: 449 }
      ]
    }
  ],
  cart: { id: 1, userId: 2, items: [], total: 0, itemCount: 0 }
};

if (!localStorage.getItem('demo_data_init_2026_v10_fixed_unsplash_images')) {
  localStorage.setItem('demo_users', JSON.stringify(demoData.users));
  localStorage.setItem('demo_categories', JSON.stringify(demoData.categories));
  localStorage.setItem('demo_restaurants', JSON.stringify(demoData.restaurants));
  localStorage.setItem('demo_foods', JSON.stringify(demoData.foods));
  localStorage.setItem('demo_orders', JSON.stringify(demoData.orders));
  localStorage.setItem('demo_cart', JSON.stringify(demoData.cart));
  localStorage.setItem('demo_wishlist', JSON.stringify([2, 7, 13]));
  localStorage.setItem('demo_data_init_2026_v10_fixed_unsplash_images', 'true');
}

const getFromLS = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const saveToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new Event('foodease_sync'));
};

const createMockResponse = (data, status = 200) => {
  return new Promise((resolve) => setTimeout(() => resolve({ data, status }), DEMO_DELAY));
};

const createMockError = (message, status = 400) => {
  return new Promise((_, reject) => setTimeout(() => reject({ response: { data: { message }, status } }), DEMO_DELAY));
};

export const mockService = {
  handleRequest: (config) => {
    const { url, method, data } = config;
    const body = data ? (typeof data === 'string' ? JSON.parse(data) : data) : {};
    console.warn(`[DEMO MODE] Intercepted ${method.toUpperCase()} ${url}`);

    if (url.includes('/auth/login') && method === 'post') {
      const users = getFromLS('demo_users');
      const inputEmail = body.email?.trim().toLowerCase();
      const user = users.find(u => u.email?.trim().toLowerCase() === inputEmail && u.password === body.password);
      if (user) {
        const role = user.role === 'RESTAURANT_OWNER' ? 'ADMIN' : user.role;
        return createMockResponse({
          token: 'demo-jwt-token-' + user.id,
          id: user.id,
          userId: user.id,
          name: user.name,
          email: user.email,
          role: role,
          restaurantId: user.restaurantId || (role === 'ADMIN' ? 1 : null)
        });
      }
      return createMockError('Invalid email or password.', 401);
    }

    if (url.includes('/auth/register') && method === 'post') {
      const users = getFromLS('demo_users');
      const inputEmail = body.email?.trim().toLowerCase();
      if (users.find(u => u.email?.trim().toLowerCase() === inputEmail)) {
        return createMockError('Email already registered. Please login instead.', 400);
      }
      const role = url.includes('restaurant') ? 'ADMIN' : 'CUSTOMER';
      const newUser = {
        id: Date.now(),
        name: body.name?.trim(),
        email: body.email?.trim(),
        password: body.password,
        role: role,
        restaurantId: role === 'ADMIN' ? 1 : null
      };
      users.push(newUser);
      saveToLS('demo_users', users);
      return createMockResponse({
        token: 'demo-jwt-token-' + newUser.id,
        id: newUser.id,
        userId: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: role,
        restaurantId: newUser.restaurantId
      });
    }

    if (url.includes('/users/') && method === 'get') {
      const id = Number(url.split('/').pop());
      const users = getFromLS('demo_users');
      const user = users.find(u => u.id === id) || users[0];
      return createMockResponse(user || {});
    }
    if (url.includes('/users/') && method === 'put') {
      const id = Number(url.split('/').pop());
      const users = getFromLS('demo_users');
      const idx = users.findIndex(u => u.id === id);
      if (idx > -1) {
        users[idx] = { ...users[idx], ...body };
        saveToLS('demo_users', users);
        return createMockResponse(users[idx]);
      }
      return createMockResponse({ success: true, ...body });
    }
    if (url.includes('/restaurants/') && method === 'put') {
      const id = Number(url.split('/').pop());
      const restaurants = getFromLS('demo_restaurants');
      const idx = restaurants.findIndex(r => r.id === id);
      if (idx > -1) {
        restaurants[idx] = { ...restaurants[idx], ...body };
        saveToLS('demo_restaurants', restaurants);
        return createMockResponse(restaurants[idx]);
      }
      return createMockResponse({ success: true, ...body });
    }

    if (url.includes('/foods') && method === 'get') {
      let foods = getFromLS('demo_foods');
      if (config.params?.categoryId) {
        foods = foods.filter(f => String(f.categoryId) === String(config.params.categoryId));
      }
      const searchKeyword = config.params?.search || config.params?.keyword;
      if (searchKeyword) {
        const q = searchKeyword.toLowerCase();
        foods = foods.filter(f => f.name.toLowerCase().includes(q) || (f.description && f.description.toLowerCase().includes(q)) || (f.categoryName && f.categoryName.toLowerCase().includes(q)));
      }
      return createMockResponse({
        content: foods,
        totalElements: foods.length,
        totalPages: 1,
        number: 0,
        size: 50
      });
    }

    if (url.includes('/foods') && method === 'post') {
      const foods = getFromLS('demo_foods');
      const cats = getFromLS('demo_categories');
      const cat = cats.find(c => String(c.id) === String(body.categoryId));
      const newFood = {
        id: Date.now(),
        ...body,
        price: Number(body.price),
        available: body.available !== false,
        rating: 4.8,
        categoryName: cat?.name || 'Special',
        restaurantId: 1
      };
      foods.unshift(newFood);
      saveToLS('demo_foods', foods);
      return createMockResponse(newFood);
    }

    if (url.includes('/foods/') && (method === 'put' || method === 'patch')) {
      const parts = url.split('/');
      const id = Number(parts[parts.length - 1] === 'toggle' ? parts[parts.length - 2] : parts[parts.length - 1]);
      const foods = getFromLS('demo_foods');
      const idx = foods.findIndex(f => f.id === id);
      if (idx > -1) {
        if (url.includes('toggle')) {
          foods[idx].available = !foods[idx].available;
        } else {
          foods[idx] = { ...foods[idx], ...body, price: Number(body.price || foods[idx].price) };
        }
        saveToLS('demo_foods', foods);
        return createMockResponse(foods[idx]);
      }
      return createMockResponse({ success: true });
    }

    if (url.includes('/foods/') && method === 'delete') {
      const id = Number(url.split('/').pop());
      let foods = getFromLS('demo_foods');
      foods = foods.filter(f => f.id !== id);
      saveToLS('demo_foods', foods);
      return createMockResponse({ success: true });
    }

    if (url.includes('/wishlist/ids') && method === 'get') {
      const wishlistIds = getFromLS('demo_wishlist');
      return createMockResponse(wishlistIds);
    }
    if (url.includes('/wishlist') && method === 'get') {
      const wishlistIds = getFromLS('demo_wishlist');
      const foods = getFromLS('demo_foods');
      const items = foods.filter(f => wishlistIds.includes(f.id));
      return createMockResponse(items);
    }
    if (url.includes('/wishlist/') && method === 'post') {
      const foodId = Number(url.split('/').pop());
      const wishlist = getFromLS('demo_wishlist');
      if (!wishlist.includes(foodId)) {
        wishlist.push(foodId);
        saveToLS('demo_wishlist', wishlist);
      }
      const foods = getFromLS('demo_foods');
      return createMockResponse(foods.filter(f => wishlist.includes(f.id)));
    }
    if (url.includes('/wishlist/') && method === 'delete') {
      const foodId = Number(url.split('/').pop());
      let wishlist = getFromLS('demo_wishlist');
      wishlist = wishlist.filter(id => id !== foodId);
      saveToLS('demo_wishlist', wishlist);
      const foods = getFromLS('demo_foods');
      return createMockResponse(foods.filter(f => wishlist.includes(f.id)));
    }

    if (url.includes('/categories') && method === 'get') {
      const categories = getFromLS('demo_categories');
      return createMockResponse(categories);
    }
    if (url.includes('/categories') && method === 'post') {
      const categories = getFromLS('demo_categories');
      const newCat = { id: Date.now(), name: body.name, description: body.description || '' };
      categories.push(newCat);
      saveToLS('demo_categories', categories);
      return createMockResponse(newCat);
    }
    if (url.includes('/categories/') && method === 'put') {
      const id = Number(url.split('/').pop());
      const categories = getFromLS('demo_categories');
      const idx = categories.findIndex(c => c.id === id);
      if (idx > -1) {
        categories[idx] = { ...categories[idx], ...body };
        saveToLS('demo_categories', categories);
      }
      return createMockResponse({ success: true });
    }
    if (url.includes('/categories/') && method === 'delete') {
      const id = Number(url.split('/').pop());
      let categories = getFromLS('demo_categories');
      categories = categories.filter(c => c.id !== id);
      saveToLS('demo_categories', categories);
      return createMockResponse({ success: true });
    }

    if (url.includes('/restaurants') && method === 'get') {
      const restaurants = getFromLS('demo_restaurants');
      return createMockResponse(restaurants);
    }

    if (url.includes('/cart') && method === 'get') {
      const cart = JSON.parse(localStorage.getItem('demo_cart') || '{"items":[],"total":0,"itemCount":0}');
      return createMockResponse(cart);
    }
    if (url.includes('/cart/add') && method === 'post') {
      const cart = JSON.parse(localStorage.getItem('demo_cart') || '{"items":[],"total":0,"itemCount":0}');
      const foods = getFromLS('demo_foods');
      const food = foods.find(f => f.id === body.foodItemId);
      if (food) {
        const existing = cart.items.find(i => i.foodItemId === food.id);
        if (existing) {
          existing.quantity += (body.quantity || 1);
          existing.subtotal = existing.quantity * existing.foodItemPrice;
        } else {
          cart.items.push({
            id: Date.now(),
            foodItemId: food.id,
            foodItemName: food.name,
            foodItemImage: food.imageUrl,
            foodItemPrice: food.price,
            quantity: body.quantity || 1,
            subtotal: (body.quantity || 1) * food.price,
            restaurantId: 1
          });
        }
        cart.itemCount = cart.items.reduce((s, i) => s + i.quantity, 0);
        cart.total = cart.items.reduce((s, i) => s + i.subtotal, 0);
        saveToLS('demo_cart', cart);
      }
      return createMockResponse(cart);
    }
    if (url.includes('/cart/update/') && method === 'put') {
      const id = Number(url.split('?')[0].split('/').pop());
      const qty = Number(config.params?.quantity || url.split('quantity=')[1] || 1);
      const cart = JSON.parse(localStorage.getItem('demo_cart') || '{"items":[],"total":0,"itemCount":0}');
      if (qty <= 0) {
        cart.items = cart.items.filter(i => i.id !== id);
      } else {
        const item = cart.items.find(i => i.id === id);
        if (item) {
          item.quantity = qty;
          item.subtotal = qty * item.foodItemPrice;
        }
      }
      cart.itemCount = cart.items.reduce((s, i) => s + i.quantity, 0);
      cart.total = cart.items.reduce((s, i) => s + i.subtotal, 0);
      saveToLS('demo_cart', cart);
      return createMockResponse(cart);
    }
    if (url.includes('/cart/remove/') && method === 'delete') {
      const id = Number(url.split('/').pop());
      const cart = JSON.parse(localStorage.getItem('demo_cart') || '{"items":[],"total":0,"itemCount":0}');
      cart.items = cart.items.filter(i => i.id !== id);
      cart.itemCount = cart.items.reduce((s, i) => s + i.quantity, 0);
      cart.total = cart.items.reduce((s, i) => s + i.subtotal, 0);
      saveToLS('demo_cart', cart);
      return createMockResponse(cart);
    }

    if (url.includes('/orders') && method === 'post') {
      const orders = getFromLS('demo_orders');
      const cart = JSON.parse(localStorage.getItem('demo_cart') || '{"items":[],"total":0,"itemCount":0}');
      const orderId = Date.now();
      const newOrder = {
        id: orderId,
        userId: 1,
        userName: 'John Doe',
        restaurantId: 1,
        restaurantName: 'FoodEase Royal Kitchen',
        deliveryAddress: body.deliveryAddress || '123 Jubilee Hills, Hyderabad',
        paymentMethod: body.paymentMethod || 'CASH_ON_DELIVERY',
        paymentStatus: 'PENDING',
        status: 'PREPARING',
        totalAmount: cart.total + 40,
        createdAt: new Date().toISOString(),
        orderItems: cart.items.map(i => ({ id: i.id, foodItemId: i.foodItemId, foodItemName: i.foodItemName, quantity: i.quantity, price: i.foodItemPrice }))
      };
      orders.unshift(newOrder);
      saveToLS('demo_orders', orders);

      const notifs = JSON.parse(localStorage.getItem('demo_notifications') || '[]');
      notifs.unshift(
        { id: orderId + '_c1', title: 'Order Confirmed! 📦', message: `Your order #${orderId.toString().slice(-6)} has been confirmed. Kitchen is preparing your food.`, time: 'Just now', role: 'CUSTOMER', read: false, icon: '👨‍🍳' },
        { id: orderId + '_a1', title: 'New Order Received! 🛎️', message: `New incoming order #${orderId.toString().slice(-6)} placed for ₹${newOrder.totalAmount}.`, time: 'Just now', role: 'ADMIN', read: false, icon: '📦' }
      );
      localStorage.setItem('demo_notifications', JSON.stringify(notifs));

      localStorage.setItem('demo_cart', JSON.stringify({ id: 1, items: [], total: 0, itemCount: 0 }));
      window.dispatchEvent(new Event('foodease_sync'));
      window.dispatchEvent(new Event('foodease_notification'));

      setTimeout(() => {
        const curOrders = getFromLS('demo_orders');
        const target = curOrders.find(o => o.id === orderId);
        if (target && target.status !== 'CANCELLED') {
          target.status = 'OUT_FOR_DELIVERY';
          saveToLS('demo_orders', curOrders);
          const curNotifs = JSON.parse(localStorage.getItem('demo_notifications') || '[]');
          curNotifs.unshift({ id: orderId + '_c2', title: 'Out for Delivery! 🛵', message: `Your order #${orderId.toString().slice(-6)} is out for delivery! Rider is on the way.`, time: 'Just now', role: 'CUSTOMER', read: false, icon: '🛵' });
          localStorage.setItem('demo_notifications', JSON.stringify(curNotifs));
          window.dispatchEvent(new Event('foodease_sync'));
          window.dispatchEvent(new Event('foodease_notification'));
        }
      }, 10000);

      setTimeout(() => {
        const curOrders = getFromLS('demo_orders');
        const target = curOrders.find(o => o.id === orderId);
        if (target && target.status !== 'CANCELLED') {
          target.status = 'DELIVERED';
          target.paymentStatus = 'PAID';
          saveToLS('demo_orders', curOrders);
          const curNotifs = JSON.parse(localStorage.getItem('demo_notifications') || '[]');
          curNotifs.unshift({ id: orderId + '_c3', title: 'Order Delivered! 📦', message: `Your order #${orderId.toString().slice(-6)} has been delivered! Enjoy your delicious meal.`, time: 'Just now', role: 'CUSTOMER', read: false, icon: '📦' });
          localStorage.setItem('demo_notifications', JSON.stringify(curNotifs));
          window.dispatchEvent(new Event('foodease_sync'));
          window.dispatchEvent(new Event('foodease_notification'));
        }
      }, 22000);

      return createMockResponse(newOrder);
    }

    if (url.includes('/orders/my-orders') && method === 'get') {
      const orders = getFromLS('demo_orders');
      return createMockResponse(orders);
    }

    if (url.includes('/orders/admin/') && method === 'get') {
      const orders = getFromLS('demo_orders');
      return createMockResponse({
        content: orders,
        totalElements: orders.length,
        totalPages: 1,
        number: 0,
        size: 50
      });
    }

    if (url.includes('/orders/') && url.includes('/status') && method === 'put') {
      const id = Number(url.split('/')[url.split('/').indexOf('orders') + 1]);
      const orders = getFromLS('demo_orders');
      const order = orders.find(o => o.id === id);
      if (order) {
        order.status = body.status;
        saveToLS('demo_orders', orders);
        return createMockResponse(order);
      }
      return createMockResponse({ success: true });
    }

    if (url.includes('/tracking/') && method === 'get') {
      const id = Number(url.split('/').pop());
      const orders = getFromLS('demo_orders');
      const order = orders.find(o => o.id === id) || orders[0];
      return createMockResponse(order || {});
    }

    if (url.includes('/admin/dashboard') && method === 'get') {
      const orders = getFromLS('demo_orders');
      const foods = getFromLS('demo_foods');
      const rev = orders.filter(o => o.status !== 'CANCELLED').reduce((s, o) => s + o.totalAmount, 0);
      return createMockResponse({
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'PENDING').length,
        confirmedOrders: orders.filter(o => o.status === 'CONFIRMED').length,
        preparingOrders: orders.filter(o => o.status === 'PREPARING').length,
        outForDeliveryOrders: orders.filter(o => o.status === 'OUT_FOR_DELIVERY').length,
        deliveredOrders: orders.filter(o => o.status === 'DELIVERED').length,
        cancelledOrders: orders.filter(o => o.status === 'CANCELLED').length,
        totalRevenue: rev,
        totalCustomers: 50000,
        totalFoodItems: foods.length,
        totalCategories: 4
      });
    }

    if (url.includes('/admin/customers') && method === 'get') {
      return createMockResponse([
        { id: 1, name: 'John Doe', email: 'customer@foodease.com', phone: '9876543210', active: true }
      ]);
    }

    console.warn(`[DEMO MODE] Unhandled endpoint: ${method.toUpperCase()} ${url}`);
    return createMockResponse({ message: 'Mock response for ' + url });
  }
};
