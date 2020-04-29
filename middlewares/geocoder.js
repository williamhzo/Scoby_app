const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  fetch: customFetchImplementation,
  apiKey: process.env.GEOCODER_API_KEY
  formatter: null 
};

const geocoder = NodeGeocoder(options);

// Using callback
// const res = await geocoder.geocode('29 champs elysée paris');

module.exports = geocoder;