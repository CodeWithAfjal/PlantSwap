// data.js - Holds our sample product and swap data

const plants = [
    { id: 'p1', name: 'Monstera Deliciosa', price: 25.00, image: 'images/monstera.jpg', careLevel: 'Easy', type: 'Foliage', size: 'Medium', light: 'Bright Indirect', water: 'Medium' },
    { id: 'p2', name: 'Snake Plant (Sansevieria)', price: 18.00, image: 'images/snake_plant.jpg', careLevel: 'Easy', type: 'Succulent', size: 'Medium', light: 'Low to Bright Indirect', water: 'Low' },
    { id: 'p3', name: 'ZZ Plant (Zamioculcas)', price: 22.00, image: 'images/zz_plant.jpg', careLevel: 'Easy', type: 'Foliage', size: 'Small', light: 'Low to Bright Indirect', water: 'Low' },
    { id: 'p4', name: 'Pothos (Golden)', price: 12.00, image: 'images/pothos.jpg', careLevel: 'Easy', type: 'Vine', size: 'Small', light: 'Low to Bright Indirect', water: 'Medium' },
    { id: 'p5', name: 'Fiddle Leaf Fig', price: 55.00, image: 'images/fiddle_leaf.jpg', careLevel: 'Hard', type: 'Tree', size: 'Large', light: 'Bright Indirect', water: 'Medium' },
    { id: 'p6', name: 'String of Pearls', price: 20.00, image: 'images/string_pearls.jpg', careLevel: 'Medium', type: 'Succulent', size: 'Small', light: 'Bright Indirect', water: 'Low' },
    {
  id: 'p7',
  name: 'Peace Lily (Spathiphyllum)',
  price: 10.25,
  image: 'images/peace_lily.jpg',
  careLevel: 'Medium',
  type: 'Foliage',
  size: 'Medium',
  light: 'Low to Bright Indirect',
  water: 'Medium'
},
{
  id: 'p8',
  name: 'Aloe Vera',
  price: 10.00,
  image: 'images/aloe_vera.jpg',
  careLevel: 'Easy',
  type: 'Succulent',
  size: 'Small',
  light: 'Bright Direct',
  water: 'Low'
},
{
  id: 'p9',
  name: 'Calathea Orbifolia',
  price: 22.00,
  image: 'images/calathea_orbifolia.jpg',
  careLevel: 'Hard',
  type: 'Foliage',
  size: 'Medium',
  light: 'Bright Indirect',
  water: 'High'
}
];

const plantCareProducts = [
     { id: 'pc1', name: 'Organic Potting Mix', price: 8.00, image: 'images/potting_mix.jpg', type: 'Soil' },
     { id: 'pc2', name: 'Liquid Indoor Plant Food', price: 12.50, image: 'images/fertilizer.jpg', type: 'Fertilizer' },
     { id: 'pc3', name: 'Terracotta Pot (6 inch)', price: 5.00, image: 'images/terracotta_pot.jpg', type: 'Pot' },
];

// Combine plants and products for the shop display
const allShopItems = [...plants, ...plantCareProducts];

const sampleSwaps = [
    { id: 's1', plantName: 'Monstera Cutting', image: 'images/monstera_cutting.jpg', zipCode: '90210', description: 'Healthy rooted cutting, looking for pothos varieties.' },
    { id: 's2', plantName: 'Spider Plant Pup', image: 'images/spider_pup.jpg', zipCode: '10001', description: 'Easy care pup ready for a new home.' },
    { id: 's3', plantName: 'Pilea Peperomioides', image: 'images/pilea.jpg', zipCode: '90210', description: 'Mature Pilea, has some cosmetic leaf damage.' },
    { id: 's4', plantName: 'Snake Plant Division', image: 'images/snake_plant_div.jpg', zipCode: '60606', description: 'Large division, needs pot. Swap for interesting foliage.'},
];

// NOTE: You'll need to create an 'images' folder and add placeholder images
// with the names used above (e.g., monstera.jpg, snake_plant.jpg, etc.)