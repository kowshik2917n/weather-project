const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Search = require('./models/search');

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname))); 

mongoose.connect('mongodb://127.0.0.1:27017/weatherApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => console.error('❌ DB error:', err));

app.post('/api/search', async (req, res) => {
  const { city } = req.body;

  console.log('📥 Incoming search request for city:', city); 
  
  try {
    const newSearch = new Search({ city });
    await newSearch.save();
    console.log('✅ City saved to MongoDB:', newSearch);
    res.status(200).json({ message: 'Search saved' });
  } catch (err) {
    console.error('❌ Error saving search:', err); 
    res.status(500).json({ message: 'Error saving search' });
  }
});  
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
