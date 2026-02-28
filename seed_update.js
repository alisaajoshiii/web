const fs = require('fs');
const content = fs.readFileSync('seed.js', 'utf8');

const regex = /await Product\.bulkCreate\(\[[\s\S]*?\]\);/;
const replacement = `await Product.bulkCreate([
    // Plushies (10 items)
    { name: 'Crochet Amigurumi Bunny', description: 'Cute, soft crochet bunny plush. Perfect for cuddling.', price: 850, category: 'Plushies', image: 'bunny.png' },
    { name: 'Chonky Crochet Whale', description: 'Adorable miniature whale plush handmade with velvet yarn.', price: 550, category: 'Plushies', image: 'plushie_gen.png' },
    { name: 'Mini Octopus Plushie', description: 'Reversible mood octopus crochet plushie.', price: 400, category: 'Plushies', image: 'plushie_gen.png' },
    { name: 'Sleeping Fox Crochet Plush', description: 'Cozy and adorable sleeping fox.', price: 950, category: 'Plushies', image: 'plushie_gen.png' },
    { name: 'Crochet Bumblebee', description: 'A cute little chubby bumblebee amigurumi.', price: 350, category: 'Plushies', image: 'plushie_gen.png' },
    { name: 'Baby Turtle Crochet', description: 'Tiny green turtle with a removable shell.', price: 600, category: 'Plushies', image: 'plushie_gen.png' },
    { name: 'Crochet Dinosaur Plush', description: 'Friendly green T-Rex amigurumi plush.', price: 1100, category: 'Plushies', image: 'plushie_gen.png' },
    { name: 'Kawaii Axolotl Crochet', description: 'Pink fluffy axolotl handmade amigurumi.', price: 750, category: 'Plushies', image: 'plushie_gen.png' },
    { name: 'Crochet Penguin', description: 'Little winter penguin with a cute red scarf.', price: 650, category: 'Plushies', image: 'plushie_gen.png' },
    { name: 'Jumbo Crochet Teddy Bear', description: 'Large super-soft handmade teddy bear.', price: 2500, category: 'Plushies', image: 'plushie_gen.png' },

    // Keyrings (12 items)
    { name: 'Sunflower Keychain', description: 'Bright crochet sunflower for your keys or bag.', price: 150, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Strawberry Keychain', description: 'Sweet crochet strawberry keychain.', price: 120, category: 'Keyring', image: 'strawberry.png' },
    { name: 'Crochet Heart Keychain', description: 'Small red heart keychain.', price: 100, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Teddybear Keyring', description: 'Miniature teddy bear customized as a keyring.', price: 180, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Smiley Pear Keyring', description: 'Cute pear shape with a smiley face.', price: 130, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Crochet Mushroom Keychain', description: 'Tiny cottagecore red mushroom keychain.', price: 150, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Daisy Keychain', description: 'Cute white and yellow daisy crochet keychain.', price: 120, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Mini Frog Keychain', description: 'Little green frog head keychain.', price: 140, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Boba Tea Keychain', description: 'Bubble tea crochet keyring, complete with pearls.', price: 160, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Avocado Keychain', description: 'Half avocado with a smiling pit.', price: 150, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Cherry Keychain', description: 'Set of two connected crochet cherries.', price: 130, category: 'Keyring', image: 'keyring_gen.png' },
    { name: 'Duck Keychain', description: 'Tiny yellow duck crochet keyring.', price: 150, category: 'Keyring', image: 'keyring_gen.png' },

    // Bouquets & Flowers (10 items)
    { name: 'Crochet Rose Bouquet', description: 'A bouquet of 3 large handmade red roses.', price: 1800, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Tulip Mix Bouquet', description: 'Assorted pastel colors of crochet tulips.', price: 1500, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Lily of the Valley Stem', description: 'Delicate bell-shaped flowers on a stem.', price: 500, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Single Red Rose', description: 'A beautiful single red rose stem.', price: 250, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Lavender Stems Bundle', description: 'Bundle of 3 aromatic-looking lavender stems.', price: 800, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Daisy Flower Bouquet', description: 'A sunny bouquet of 5 crochet daisies.', price: 1200, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Crochet Carnation Floral Mix', description: 'Beautiful assorted carnation flowers.', price: 1400, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Forget-Me-Not Miniature Bouquet', description: 'Tiny lovely blue crochet flowers wrapped.', price: 1100, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Calla Lily Stem', description: 'Elegant white calla lily crochet stem.', price: 350, category: 'Bouquet', image: 'bouquet_gen.png' },
    { name: 'Mini Rose Keyring Bouquet', description: 'A very small bouquet designed as a bag charm.', price: 400, category: 'Bouquet', image: 'bouquet_gen.png' },

    // Apparel & Accessories (10 items)
    { name: 'Crochet Frog Bucket Hat', description: 'Handmade green frog bucket hat.', price: 1200, category: 'Apparel', image: 'apparel_gen.png' },
    { name: 'Daisy Cardigan', description: 'Aesthetic chunky cardigan decorated with daisies.', price: 3500, category: 'Apparel', image: 'apparel_gen.png' },
    { name: 'Cat Ear Beanie', description: 'Trendy ribbed beanie with cat ears.', price: 1100, category: 'Apparel', image: 'apparel_gen.png' },
    { name: 'Crochet Mushroom Bag', description: 'Cross-body bag shaped like a mushroom.', price: 1500, category: 'Apparel', image: 'apparel_gen.png' },
    { name: 'Granny Square Tote Bag', description: 'Classic aesthetic granny square tote bag.', price: 1800, category: 'Apparel', image: 'apparel_gen.png' },
    { name: 'Daisy Hair Clips (Set of 2)', description: 'Set of two matching daisy clips.', price: 200, category: 'Apparel', image: 'daisy.png' },
    { name: 'Crochet Bow Scrunchie', description: 'Soft yarn scrunchie with a cute bow.', price: 250, category: 'Apparel', image: 'apparel_gen.png' },
    { name: 'Chunky Winter Crochet Scarf', description: 'Warm and thick handmade winter scarf.', price: 1600, category: 'Apparel', image: 'apparel_gen.png' },
    { name: 'Sunflower Hair Bandana', description: 'Cottagecore crochet head bandana with suns.', price: 800, category: 'Apparel', image: 'apparel_gen.png' },
    { name: 'Crochet Fingerless Gloves', description: 'Cozy mittens keeping fingers free.', price: 900, category: 'Apparel', image: 'apparel_gen.png' },

    // Home & Decor (8 items)
    { name: 'Crochet Potted Cactus', description: 'Mini crochet cactus in a textured pot.', price: 550, category: 'Decor', image: 'succulent.png' },
    { name: 'Mini Potted Monstera', description: 'Small decorative crochet monstera plant.', price: 750, category: 'Decor', image: 'decor_gen.png' },
    { name: 'Sunflower Coasters Set', description: 'Bright crochet coasters shaped like flowers.', price: 800, category: 'Decor', image: 'decor_gen.png' },
    { name: 'Leaf Drink Coasters', description: 'Set of 4 green leaf-shaped drink coasters.', price: 600, category: 'Decor', image: 'decor_gen.png' },
    { name: 'Crochet Hanging Leaf Vine', description: 'Long decorative crochet leaf vine for walls.', price: 1200, category: 'Decor', image: 'decor_gen.png' },
    { name: 'Strawberry Mirror Hanging', description: 'Cute decorative mirror hanging for cars.', price: 350, category: 'Decor', image: 'decor_gen.png' },
    { name: 'Moon & Star Wall Decor', description: 'Nursery wall decoration with moon and stars.', price: 1500, category: 'Decor', image: 'decor_gen.png' },
    { name: 'Crochet Trinket Basket', description: 'Sturdy yarn basket for holding trinkets.', price: 950, category: 'Decor', image: 'decor_gen.png' }
  ]);`;

fs.writeFileSync('seed.js', content.replace(regex, replacement));
console.log('Seed file successfully replaced with 50 items!');
