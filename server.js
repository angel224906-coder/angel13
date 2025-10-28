const express = require('express');

const app = express();

// Configuration
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Simple CORS middleware
app.use((req, res, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN || '*';
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Health route
app.get('/', (req, res) => {
  // Requirement: return the exact string
  res.send('Server is running successfully!');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  const status = err.status || 500;
  res.status(status).json({ success: false, error: err.message || 'Internal Server Error' });
});

// Export app for testing or further integration
module.exports = app;

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}