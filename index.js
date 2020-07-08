const express = require('express')
const mongoose = require('mongoose')
// require('dotenv/config');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true }));
app.use(express.json());

const postRoute = require('./routes/posts') 

// MIDDLEWARE

app.use('/posts',postRoute);


// ROUTES
app.get('/', (req,res) => {
    res.send('Home Page');
});

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    }, 
    () => {
    console.log('Connected to DB!');
});

// EXPRESS LISTEN TO PORT
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});