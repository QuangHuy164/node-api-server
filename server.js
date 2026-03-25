require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_URL = process.env.DARKGLASS_API_URL;

app.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : ''
    console.log(`Fetching data from: ${searchQuery}`);

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const liveData = await response.json();

    if (searchQuery && liveData.data && liveData.data.edges) {
      liveData.data.edges = liveData.data.edges.filter(({ node }) => {
        const filteredTitle = node.title.toLowerCase().includes(searchQuery);

        const sku = node.variants?.edges?.[0].node.sku || ''
        const filteredSku = sku.toLowerCase().includes(searchQuery);

        return filteredTitle || filteredSku;
      })
    }

res.json(liveData);

  } catch (error) {
  console.error('Error fetching API:', error);
  res.status(500).json({ error: 'Failed to fetch API' });
}
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});