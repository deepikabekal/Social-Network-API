//import libraries
const express = require ('express');
const mongoose = require ('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares

app.use(express.json());  //creates a new express application 
app.use(express.urlencoded({ extended : true}));
app.use(require('./routes'));

//establish connection to the mongoDB database
mongoose.connect (process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set ('debug', true);

app.listen (PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));