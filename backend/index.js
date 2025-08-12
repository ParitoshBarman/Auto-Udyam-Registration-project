require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

app.get('/', (req, res) => res.send('Udyam Backend API'));

app.use('/api/registration', registrationRoutes);

// global error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ ok: false, error: 'Unhandled server error' });
});




// Export app for testing
module.exports = app;

// Start server only if not in test environment
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}