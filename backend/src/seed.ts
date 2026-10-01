import { db } from './db.js';

console.log('🌱 Seeding SportZone database with initial products...');
db.seedInitial();
console.log('✅ Database successfully seeded!');
