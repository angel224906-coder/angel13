// Simple MongoDB connection checker using mongoose
require('dotenv').config();
const mongoose = require('mongoose');

const {
  MONGODB_URI,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
} = process.env;

let mongoUri = MONGODB_URI;
if (!mongoUri) {
  const host = MONGODB_HOST || '127.0.0.1:27017';
  if (MONGODB_USER && MONGODB_PASSWORD) {
    const user = encodeURIComponent(MONGODB_USER);
    const pass = encodeURIComponent(MONGODB_PASSWORD);
    mongoUri = `mongodb://${user}:${pass}@${host}/book_inventory`;
  } else {
    mongoUri = `mongodb://${host}/book_inventory`;
  }
}

console.log('Attempting to connect to MongoDB using URI:');
// hide password in output
const safeUri = mongoUri.replace(/:(.*)@/, ':*****@');
console.log(safeUri);

mongoose.set('strictQuery', false);
console.log('Node version:', process.version);
console.log('Connection options: serverSelectionTimeoutMS=5000');
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    return mongoose.disconnect();
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('MongoDB connection error:');
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  });
