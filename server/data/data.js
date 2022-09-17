import rangeRandom from '../utils/rangeRandom.js';
import { randomUUID } from 'crypto';
export const mainCards = [
  {
    id: Math.round(rangeRandom(1, 100)),
    title: 'The Awakening',
    image: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    image: 'Paul Auster',
  },
];
// for (let i = 0; i < 99; i++) {
//   console.log(rangeRandom(1, 100).toFixed(0));
// }
export const animals = [
  {
    id: 111,
    title: 'The Awakening ' + Math.round(rangeRandom(1, 100)),
    image: 'https://source.unsplash.com/random/520x600?animal',
    rating: Math.round(rangeRandom(1, 5)),
    price: rangeRandom(20, 35).toFixed(2),
    description: randomUUID().split('-'),
    stock: Math.round(rangeRandom(1, 15)),
    onSale: false,
  },
  {
    id: 222,
    title: 'The Awakening ' + Math.round(rangeRandom(1, 100)),
    image: 'https://source.unsplash.com/random/520x600?animal',
    rating: Math.round(rangeRandom(1, 5)),
    price: rangeRandom(20, 35).toFixed(2),
    description: randomUUID().split('-'),
    stock: Math.round(rangeRandom(1, 15)),
    onSale: true,
  },
  {
    id: 333,
    title: 'The Awakening ' + Math.round(rangeRandom(1, 100)),
    image: 'https://source.unsplash.com/random/520x600?animal',
    rating: Math.round(rangeRandom(1, 5)),
    price: rangeRandom(20, 35).toFixed(2),
    description: randomUUID().split('-'),
    stock: Math.round(rangeRandom(1, 15)),
    onSale: false,
  },
  {
    id: 444,
    title: 'The Awakening ' + Math.round(rangeRandom(1, 100)),
    image: 'https://source.unsplash.com/random/520x600?animal',
    rating: Math.round(rangeRandom(1, 5)),
    price: rangeRandom(20, 35).toFixed(2),
    description: randomUUID().split('-'),
    stock: Math.round(rangeRandom(1, 15)),
    onSale: true,
  },
  {
    id: 555,
    title: 'The Awakening ' + Math.round(rangeRandom(1, 100)),
    image: 'https://source.unsplash.com/random/520x600?animal',
    rating: Math.round(rangeRandom(1, 5)),
    price: rangeRandom(20, 35).toFixed(2),
    description: randomUUID().split('-'),
    stock: Math.round(rangeRandom(1, 15)),
    onSale: false,
  },
];
