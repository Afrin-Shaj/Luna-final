const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Adjust the path as necessary

const app = express();
app.use(bodyParser.json());

// Use routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('MONGO_URI', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
