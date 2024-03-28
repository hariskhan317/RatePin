const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
// Routes
const pinRoutes = require('./routes/pins')
const userRoutes = require('./routes/users')

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

dotenv.config();

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDb Conneted')
    })
    .catch((err) => {
        console.log('Connection Failed', err)
    })


app.use('/api/pins', pinRoutes)

app.use('/api/users', userRoutes)


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to ${port}`)
});