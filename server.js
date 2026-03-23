const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_URL = 'https://api.darkglass.com/shopify/products';

app.get('/', async (req, res) => {
  try {
    console.log(`Fetching data from: ${API_URL}`);

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const liveData = await response.json();
    res.json(liveData);

  } catch (error) {
    alert('Error fetching API', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});