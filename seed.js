const { sequelize, User, Product } = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
  await sequelize.sync({ force: true });

  // Create admin
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    name: 'Admin User',
    email: 'admin@aurasissies.com',
    password: hashedAdminPassword,
    role: 'admin'
  });

  // Create products based on user input
  await Product.bulkCreate([
    // Plushies
    { name: 'White Amigurumi Bunny', description: 'Cute, soft crochet bunny plush in bright white. Perfect for cuddling.', price: 850, category: 'Plushies', image: 'amig_bunny_1772289953959.png' },
    { name: 'Fluffy White Bunny Plush', description: 'A cute white bunny handmade amigurumi.', price: 800, category: 'Plushies', image: 'amig_bunny_1772289953959.png' },
    { name: 'Classic Bunny Plush', description: 'Super soft classic amigurumi bunny.', price: 750, category: 'Plushies', image: 'bunny.png' },
    { name: 'Brown Amigurumi Bunny', description: 'A sweet brown bunny crochet plushie.', price: 750, category: 'Plushies', image: 'bunny.png' },
    { name: 'Sleeping Fox Crochet Plush', description: 'Cozy and adorable sleeping fox.', price: 950, category: 'Plushies', image: 'amig_fox_1772289993861.png' },
    { name: 'Orange Fox Amigurumi', description: 'Cute sleeping small fox crochet item.', price: 900, category: 'Plushies', image: 'amig_fox_1772289993861.png' },
    { name: 'Green Turtle Plush', description: 'Tiny green turtle with a removable shell.', price: 600, category: 'Plushies', image: 'amig_turtle_1772290018023.png' },
    { name: 'Baby Turtle Crochet', description: 'Adorable small green turtle plushie.', price: 550, category: 'Plushies', image: 'amig_turtle_1772290018023.png' },
    { name: 'Blue Whale Plush', description: 'Adorable miniature blue whale plush handmade with velvet yarn.', price: 700, category: 'Plushies', image: 'amig_whale_1772289976850.png' },
    { name: 'Chonky Crochet Whale', description: 'A chunky and round handmade whale plush.', price: 750, category: 'Plushies', image: 'amig_whale_1772289976850.png' },

    // Keychains
    { name: 'Mini Sunflower Keyring', description: 'Bright crochet sunflower for your keys or bag.', price: 150, category: 'Keyring', image: 'key_sunflower_1772290062878.png' },
    { name: 'Giant Sunflower Keychain', description: 'Slightly larger crochet sunflower keyring.', price: 180, category: 'Keyring', image: 'key_sunflower_1772290062878.png' },
    { name: 'Sunflower Keyring', description: 'Classic bright crochet sunflower keychain.', price: 150, category: 'Keyring', image: '5.jpg' },
    { name: 'Sweet Strawberry Keychain', description: 'Sweet crochet strawberry keychain.', price: 120, category: 'Keyring', image: 'key_strawberry_1772290204440.png' },
    { name: 'Fresh Strawberry Keychain', description: 'Handcrafted red strawberry keyring.', price: 130, category: 'Keyring', image: 'key_strawberry_1772290204440.png' },
    { name: 'Strawberry Keyring', description: 'A cute strawberry crochet accessory.', price: 120, category: 'Keyring', image: 'strawberry.png' },
    { name: 'Teddybear Keyring - Brown', description: 'Miniature brown teddy bear customized as a keyring.', price: 180, category: 'Keyring', image: '3.jpg' },
    { name: 'Teddybear Keyring - Pink', description: 'Miniature pink teddy bear keyring.', price: 180, category: 'Keyring', image: '3.jpg' },
    { name: 'Teddybear Keyring - Blue', description: 'Miniature blue teddy bear keyring.', price: 180, category: 'Keyring', image: '3.jpg' },
    { name: 'Keyring Bouquet - Mixed', description: 'Small flowers arranged in a mini bouquet keyring.', price: 200, category: 'Keyring', image: '4.jpg' },
    { name: 'Keyring Bouquet - Pink', description: 'Mini bouquet keyring focusing on pink tones.', price: 200, category: 'Keyring', image: '4.jpg' },
    { name: 'Mini Bouquet Bag Charm', description: 'Very small bouquet designed as a bag charm.', price: 190, category: 'Keyring', image: '4.jpg' },

    // Bouquets & Flowers
    { name: 'Large Red Rose Bouquet', description: 'A bouquet of large handmade red roses.', price: 1800, category: 'Bouquet', image: '1.jpg' },
    { name: 'Classic Rose Bouquet', description: 'Beautiful classic crochet red rose bouquet.', price: 1700, category: 'Bouquet', image: '1.jpg' },
    { name: 'Small Rose Bouquet', description: 'A smaller arrangement of red crochet roses.', price: 1400, category: 'Bouquet', image: '1.jpg' },
    { name: 'Single Red Rose', description: 'A delicate single red rose, perfect for a subtle gift.', price: 250, category: 'Bouquet', image: '2.jpg' },
    { name: 'Single Pink Rose', description: 'A beautiful single pink rose stem.', price: 250, category: 'Bouquet', image: '2.jpg' },
    { name: 'Single Yellow Rose', description: 'A bright single yellow rose stem.', price: 250, category: 'Bouquet', image: '2.jpg' },
    { name: 'Mixed Tulip Bouquet', description: 'Assorted crochet tulip flowers.', price: 1500, category: 'Bouquet', image: '6.jpg' },
    { name: 'Pink Tulip Bouquet', description: 'Beautiful arrangement of pink tulips.', price: 1500, category: 'Bouquet', image: '6.jpg' },
    { name: 'Spring Tulip Mix', description: 'A bundle of spring-colored crochet tulips.', price: 1450, category: 'Bouquet', image: '6.jpg' },

    // Apparel & Accessories
    { name: 'Daisy Hair Clips', description: 'Set of two matching daisy clips.', price: 200, category: 'Accessories', image: 'daisy.png' },
    { name: 'White Daisy Hair Clips Set', description: 'Adorable crochet white daisy clips.', price: 220, category: 'Accessories', image: 'daisy.png' },
    { name: 'Yellow Daisy Hair Clips', description: 'Small yellow center daisy hair pins.', price: 180, category: 'Accessories', image: 'daisy.png' },
    { name: 'Pastel Crochet Scrunchie', description: 'Soft yarn scrunchie with pastel colors.', price: 250, category: 'Accessories', image: 'scrunchie.png' },
    { name: 'Classic Bow Scrunchie', description: 'Aesthetic crochet scrunchie with a cute bow style.', price: 250, category: 'Accessories', image: 'scrunchie.png' },
    { name: 'Soft Yarn Scrunchie', description: 'Comfortable handmade yarn scrunchie.', price: 200, category: 'Accessories', image: 'scrunchie.png' },
    { name: 'Pink Crochet Scrunchie', description: 'Cute handmade pink scrunchie.', price: 250, category: 'Accessories', image: 'scrunchie.png' },
    { name: 'Aesthetic Hair Scrunchie', description: 'Perfect matching hair accessory.', price: 230, category: 'Accessories', image: 'scrunchie.png' },
    { name: 'Floral Hair Clip Set', description: 'Set of flower-themed crochet clips.', price: 210, category: 'Accessories', image: 'daisy.png' },

    // Home & Decor
    { name: 'Crochet Potted Cactus', description: 'Miniature crochet cactus in a tiny pot.', price: 550, category: 'Decor', image: 'succulent.png' },
    { name: 'Mini Crochet Succulent', description: 'Small decorative crochet succulent plant.', price: 450, category: 'Decor', image: 'succulent.png' },
    { name: 'Desktop Cactus Decor', description: 'Perfect little non-prickly cactus for your desk.', price: 500, category: 'Decor', image: 'succulent.png' },
    { name: 'Potted Green Cactus', description: 'Classic green crochet cactus in brown pot.', price: 550, category: 'Decor', image: 'succulent.png' },
    { name: 'Crochet Rainbow Decor', description: 'Cute hanging rainbow crochet ornament.', price: 800, category: 'Decor', image: 'rainbow.png' },
    { name: 'Pastel Rainbow Wall Hanging', description: 'Aesthetic pastel rainbow colors wall piece.', price: 850, category: 'Decor', image: 'rainbow.png' },
    { name: 'Nursery Rainbow Ornament', description: 'Perfect small rainbow decor for a nursery room.', price: 900, category: 'Decor', image: 'rainbow.png' },
    { name: 'Bright Rainbow Hanging', description: 'Colorful crochet rainbow for bright vibes.', price: 750, category: 'Decor', image: 'rainbow.png' },
    { name: 'Boho Rainbow Decor', description: 'Boho styled handmade crochet rainbow.', price: 850, category: 'Decor', image: 'rainbow.png' },
    { name: 'Small Succulent Pot', description: 'Very cute tiny handmade crochet succulent pot.', price: 400, category: 'Decor', image: 'succulent.png' }
  ]);

  console.log('Database seeded successfully!');
  process.exit();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});