INSERT INTO users (id, name, email, password, role, phone, address, city, state, pincode, active, created_at)
VALUES (1, 'Admin User', 'admin@foodease.com', '$2a$10$wY.uG7yI/mFwz6Gj/hJ23OW.M76Qj22Yq023U/0V27W/F7Y30C8J6', 'ADMIN', '9876543210', 'Admin HQ, Tech Park', 'Hyderabad', 'Telangana', '500081', true, NOW())
ON DUPLICATE KEY UPDATE name='Admin User';

INSERT INTO users (id, name, email, password, role, phone, address, city, state, pincode, active, created_at)
VALUES (2, 'John Doe', 'customer@foodease.com', '$2a$10$7sQ3Zt44lZc7X.H.P8/OvewL2.w6Q3xX/Q7c37q2W0O.29W7W6HwS', 'CUSTOMER', '9123456789', '123 Main St, Jubilee Hills', 'Hyderabad', 'Telangana', '500033', true, NOW())
ON DUPLICATE KEY UPDATE name='John Doe';

INSERT INTO users (id, name, email, password, role, phone, address, city, state, pincode, active, created_at)
VALUES (3, 'Jane Smith', 'restaurant@foodease.com', '$2a$10$7sQ3Zt44lZc7X.H.P8/OvewL2.w6Q3xX/Q7c37q2W0O.29W7W6HwS', 'ADMIN', '9988776655', '456 Market St, Banjara Hills', 'Hyderabad', 'Telangana', '500034', true, NOW())
ON DUPLICATE KEY UPDATE name='Jane Smith';

INSERT INTO categories (id, name, description, image_url)
VALUES 
(1, 'Biryani & Pulao', 'Aromatic royal rice delicacies cooked with authentic spices', 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547217_j8scyd'),
(2, 'North Indian Curries', 'Rich, creamy and flavorful traditional gravies', 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547234_mh6bp8'),
(3, 'South Indian Delights', 'Crispy dosas, fluffy idlis and authentic coastal curries', 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547241_kqben7'),
(4, 'Tandoor & Starters', 'Smoky clay-oven char-grilled tikkas and kebabs', 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547243_rwequg'),
(5, 'Indian Street Food & Chaat', 'Tangy, spicy and crunchy Indian street favorites', 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547255_pldxse'),
(6, 'Breads & Rice', 'Fresh tandoori naans, rotis and fragrant basmati rice', 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547225_bg3vd7'),
(7, 'Indian Desserts & Beverages', 'Sweet treats and traditional refreshing beverages', 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547222_ydb4p1')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), image_url=VALUES(image_url);

INSERT INTO restaurants (id, name, description, address, phone, image_url, rating, active, business_timing, gst_number, owner_id, created_at)
VALUES 
(1, 'FoodEase Royal Kitchen', 'Authentic Indian Cuisines & Delicacies', 'Plot 42, Foodie Street, Madhapur, Hyderabad', '9876543210', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', 4.8, true, '10:00 AM - 11:30 PM', '29ABCDE1234F1Z5', 1, NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), address=VALUES(address), business_timing=VALUES(business_timing), gst_number=VALUES(gst_number);

INSERT INTO food_items (id, name, description, price, image_url, available, vegetarian, preparation_time, rating, total_ratings, restaurant_id, category_id, created_at)
VALUES 
(1, 'Hyderabadi Dum Biryani', 'Fragrant basmati rice cooked with tender marinated chicken and authentic Hyderabadi spices', 349.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547226_f24maj', true, false, '40 mins', 4.9, 120, 1, 1, NOW()),
(2, 'Lucknow Mutton Biryani', 'Slow-cooked authentic aromatic Lucknow mutton biryani infused with saffron and royal spices', 449.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547227_v7e7nj', true, false, '45 mins', 4.8, 95, 1, 1, NOW()),
(3, 'Paneer Tikka Biryani', 'Smoky paneer tikka layered with aromatic basmati rice and rich gravy', 299.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547228_sqlh0c', true, true, '35 mins', 4.7, 80, 1, 1, NOW()),
(4, 'Vegetable Pulao', 'Classic light basmati pulao tossed with seasonal green vegetables and whole spices', 219.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547229_pkzm0x', true, true, '25 mins', 4.6, 50, 1, 1, NOW()),
(5, 'Egg Dum Biryani', 'Spiced boiled eggs layered with flavorful biryani rice and caramelized onions', 269.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547230_uqsifw', true, false, '30 mins', 4.7, 65, 1, 1, NOW()),
(6, 'Kaju Jeera Rice', 'Premium fragrant basmati rice tempered with roasted cumin seeds and golden cashews', 229.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547231_v2utjl', true, true, '20 mins', 4.8, 40, 1, 1, NOW()),

(7, 'Butter Chicken', 'Creamy tomato-based butter chicken curry.', 349.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547234_mh6bp8', true, false, '30 mins', 4.9, 210, 1, 2, NOW()),
(8, 'Paneer Butter Masala', 'Cottage cheese cubes cooked in rich, creamy tomato and cashew nut gravy', 299.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547235_jglqln', true, true, '25 mins', 4.8, 180, 1, 2, NOW()),
(9, 'Dal Makhani', 'Black lentils slow-cooked overnight with fresh cream, butter, and mild spices', 249.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547236_rj9vet', true, true, '35 mins', 4.9, 150, 1, 2, NOW()),
(10, 'Kadai Chicken', 'Wok-tossed chicken cooked with bell peppers, onions, and freshly ground kadai masala', 329.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547237_pyjbnf', true, false, '30 mins', 4.7, 90, 1, 2, NOW()),
(11, 'Chana Masala', 'Chickpea curry in rich tomato-onion gravy garnished with fresh coriander.', 219.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547239_j3qjzb', true, true, '25 mins', 4.6, 70, 1, 2, NOW()),
(12, 'Mutton Rogan Josh', 'Traditional Kashmiri mutton curry cooked with aromatic spices and ratanjot', 469.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547240_bn0hpo', true, false, '45 mins', 4.8, 85, 1, 2, NOW()),

(13, 'Masala Dosa', 'Crispy South Indian golden crepe stuffed with spiced potato masala, served with sambar and coconut chutney', 149.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547241_kqben7', true, true, '15 mins', 4.9, 310, 1, 3, NOW()),
(14, 'Idli Sambar', 'Soft steamed white idlis served with a bowl of piping hot vegetable sambar clearly visible.', 109.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547242_ngvltc', true, true, '10 mins', 4.8, 240, 1, 3, NOW()),
(15, 'Mysore Bajjis', 'Golden fried South Indian bajjis bondas served with coconut chutney.', 129.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547243_rwequg', true, true, '15 mins', 4.7, 110, 1, 3, NOW()),
(16, 'Chicken Chettinad', 'South Indian spicy chicken curry in rich dark spicy gravy served in a bowl.', 339.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547244_osvsi3', true, false, '35 mins', 4.8, 130, 1, 3, NOW()),
(17, 'Malabar Prawn Curry', 'Fresh succulent prawns cooked in coastal coconut curry.', 429.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547245_zhxobn', true, false, '30 mins', 4.9, 95, 1, 3, NOW()),
(18, 'Medu Vada', 'Traditional crispy South Indian medu vada lentil doughnuts served with aromatic sambar and chutney', 119.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547246_zzgvzh', true, true, '15 mins', 4.8, 175, 1, 3, NOW()),

(19, 'Tandoori Chicken', 'Red grilled tandoori chicken legs roasted in clay oven with charred spots served with onion and lemon.', 329.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547247_ktg1p0', true, false, '30 mins', 4.9, 220, 1, 4, NOW()),
(20, 'Paneer Tikka', 'Marinated paneer cubes grilled with vegetables.', 279.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547249_xnyjbs', true, true, '25 mins', 4.8, 190, 1, 4, NOW()),
(21, 'Chicken Seekh Kebab', 'Indian style spiced minced chicken skewers grilled in clay tandoor.', 319.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547250_snengr', true, false, '25 mins', 4.8, 140, 1, 4, NOW()),
(22, 'Hara Bhara Kebab', 'Green veg hara bhara kebab patties made with fresh spinach, green peas, and traditional Indian herbs', 229.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547251_vqkwje', true, true, '20 mins', 4.7, 105, 1, 4, NOW()),
(23, 'Fish Tikka', 'Indian style succulent boneless fish tikka chunks marinated in aromatic spices and char-grilled', 389.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547252_uhonwt', true, false, '30 mins', 4.8, 88, 1, 4, NOW()),
(24, 'Mushroom Tikka', 'Marinated tandoor grilled button mushrooms with char marks served on skewers.', 259.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547253_t43zxo', true, true, '25 mins', 4.6, 75, 1, 4, NOW()),

(25, 'Pani Puri', 'Crispy hollow puris served with mint water, tamarind water, and spiced potato filling.', 89.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547254_ujn6q6', true, true, '10 mins', 4.9, 450, 1, 5, NOW()),
(26, 'Pav Bhaji', 'Spiced mashed vegetable curry cooked in butter, served with toasted soft pav bread', 169.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547255_pldxse', true, true, '15 mins', 4.9, 380, 1, 5, NOW()),
(27, 'Samosa Chaat', 'Crushed samosas topped with spiced chole, chilled yogurt, and sweet-tangy chutneys', 119.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547256_f9mvr0', true, true, '12 mins', 4.8, 260, 1, 5, NOW()),
(28, 'Vada Pav', 'Authentic Mumbai potato vada inside pav bun with dry garlic chutney & fried green chilli.', 79.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547257_pqp8ff', true, true, '10 mins', 4.8, 320, 1, 5, NOW()),
(29, 'Aloo Tikki Chaat', 'Crispy spiced potato patties topped with white peas curry, sweet curd, and sev', 129.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547258_humiez', true, true, '15 mins', 4.7, 190, 1, 5, NOW()),
(30, 'Dahi Puri', 'Crispy puris loaded with yogurt, sweet tamarind chutney, spicy green chutney and crunchy sev.', 119.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547260_dhybsp', true, true, '10 mins', 4.8, 210, 1, 5, NOW()),

(31, 'Butter Naan', 'Soft fluffy traditional Indian naan freshly brushed with golden butter.', 59.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547225_bg3vd7', true, true, '10 mins', 4.9, 500, 1, 6, NOW()),
(32, 'Garlic Naan', 'Restaurant style baked garlic naan generously topped with butter garlic and chopped coriander.', 79.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547224_o4onsk', true, true, '10 mins', 4.9, 420, 1, 6, NOW()),
(33, 'Tandoori Roti', 'Whole wheat tandoori roti baked inside clay tandoor with slight char marks served on a plate.', 39.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547223_x3gfu1', true, true, '10 mins', 4.7, 300, 1, 6, NOW()),

(36, 'Gulab Jamun', 'Golden brown deep-fried sweet gulab jamuns soaked in visible sugar syrup.', 119.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547222_ydb4p1', true, true, '10 mins', 4.9, 410, 1, 7, NOW()),
(37, 'Rasmalai', 'Soft paneer patties immersed in thick saffron milk with pistachio garnish.', 149.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547221_edh2tz', true, true, '10 mins', 4.9, 380, 1, 7, NOW()),
(38, 'Mango Lassi', 'Traditional thick churned mango lassi yogurt drink blended with ripe sweet Alphonso mango pulp', 129.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547220_mur630', true, true, '10 mins', 4.8, 290, 1, 7, NOW()),
(39, 'Masala Chai', 'Authentic Indian masala tea brewed freshly with crushed ginger, cardamom cloves, and rich milk', 69.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547219_clkfxk', true, true, '10 mins', 4.9, 600, 1, 7, NOW()),
(40, 'Kesar Pista Kulfi', 'Traditional dense Indian frozen dairy dessert flavored with saffron and pistachios', 139.00, 'https://res.cloudinary.com/degvfsiys/image/upload/f_auto,q_auto/1000547218_m0ua7d', true, true, '10 mins', 4.8, 220, 1, 7, NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), price=VALUES(price), description=VALUES(description), image_url=VALUES(image_url), vegetarian=VALUES(vegetarian); 
