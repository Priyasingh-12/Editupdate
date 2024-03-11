const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://piyasngh12:Priyasingh@cluster0.fyfuupo.mongodb.net/new  ', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const DataModel = mongoose.model('Data', dataSchema);

// Routes
app.get('/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/data', async (req, res) => {
  const newData = new DataModel({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/data/:id', async (req, res) => {
  try {
    const updatedData = await DataModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/data/:id', async (req, res) => {
  try {
    await DataModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
