require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const contactsRouter = require('./app/routes/contactroute');
const groupRouter = require('./app/routes/grouproute');
const PORT = process.env.PORT || 3000;

const mongoString= "mongodb+srv://myant:myant123@myant.lkx7dv0.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(cors())
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello from Raj!')
})
console.log("===================contacts==")
app.use('/api/contacts', contactsRouter)
console.log("===================groups==")
app.use('/api/groups', groupRouter)


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

module.exports = app