import { Restaurant } from '@/types';

const restaurants: Restaurant[] = [
  {
    id: 'chick-fil-a',
    name: 'Chick-fil-A',
    logo: 'https://images.unsplash.com/photo-1582779826629-0d98c1a58330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: '123 Market St, San Francisco, CA'
    }
  },
  {
    id: 'mcdonalds',
    name: "McDonald's",
    logo: 'https://images.unsplash.com/photo-1619994121345-b61cd21e9866?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7850,
      longitude: -122.4200,
      address: '789 Powell St, San Francisco, CA'
    }
  },
  {
    id: 'wendys',
    name: "Wendy's",
    logo: 'https://images.unsplash.com/photo-1615297925037-7eb41f12d12b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7820,
      longitude: -122.4150,
      address: '345 Mission St, San Francisco, CA'
    }
  },
  {
    id: 'chipotle',
    name: 'Chipotle',
    logo: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7833,
      longitude: -122.4167,
      address: '456 Mission St, San Francisco, CA'
    }
  },
  {
    id: 'starbucks',
    name: 'Starbucks',
    logo: 'https://images.unsplash.com/photo-1577995960018-a40f9de7e1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7855,
      longitude: -122.4210,
      address: '101 Union Square, San Francisco, CA'
    }
  },
  {
    id: 'taco-bell',
    name: 'Taco Bell',
    logo: 'https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7810,
      longitude: -122.4130,
      address: '567 Market St, San Francisco, CA'
    }
  },
  {
    id: 'panera-bread',
    name: 'Panera Bread',
    logo: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7870,
      longitude: -122.4220,
      address: '678 Montgomery St, San Francisco, CA'
    },
    isPremium: true
  },
  {
    id: 'shake-shack',
    name: 'Shake Shack',
    logo: 'https://images.unsplash.com/photo-1587315119275-80a1bfb3c8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7880,
      longitude: -122.4230,
      address: '789 Market St, San Francisco, CA'
    },
    isPremium: true
  },
  {
    id: 'popeyes',
    name: 'Popeyes',
    logo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7890,
      longitude: -122.4240,
      address: '890 Mission St, San Francisco, CA'
    },
    isPremium: true
  },
  {
    id: 'subway',
    name: 'Subway',
    logo: 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    location: {
      latitude: 37.7830,
      longitude: -122.4190,
      address: "303 Market St, San Francisco, CA"
    },
    isPremium: true
  }
];

export default restaurants;