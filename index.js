require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

// added in for debugging purposes
const { red, green, reset } = require('./utils/colors');

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log(green + 'Connected to MongoDB' + reset);
  app.listen(PORT, () => console.log(green + `Server running on port ${PORT}` + reset));
})
.catch((err) => {
  console.error(red + 'MongoDB connection error:' + reset, err);
});
