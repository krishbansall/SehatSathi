require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🏥  SehatSathi API running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`📡  Base URL : http://localhost:${PORT}/api`);
    console.log(`🌱  Seed DB  : npm run seed\n`);
  });
}).catch(err => {
  console.error('❌  Failed to connect to MongoDB:', err.message);
  process.exit(1);
});
