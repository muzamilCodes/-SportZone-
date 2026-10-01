import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 SportZone Backend Server running at http://localhost:${PORT}`);
  console.log(`📦 Seeded products & mock database ready.`);
});
