const axios = require('axios');
const receiverUrl = process.env.RECEIVER_URL || 'http://localhost:3000'; // Default URL if not set

setInterval(async () => {
  try {
    const response = await axios.get(receiverUrl);
    console.log('Response from Receiver:', response.data);
  } catch (error) {
    console.error('Error connecting to Receiver:', error.message);
  }
}, 5000); // Send request every 5 seconds
