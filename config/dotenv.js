// config/dotenv.js
const dotenv = require('dotenv');

module.exports = () => {
  const result = dotenv.config();
  if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('.env file loaded successfully');
  }
};
