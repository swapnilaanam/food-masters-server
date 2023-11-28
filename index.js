const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const connectDB = require('./db/connectDB');
const usersRoute = require('./routes/users');
const restaurantsRoute = require('./routes/restaurants');
const categoriesRoute = require('./routes/categories');
const menusRoute = require('./routes/menus');


// middleware
app.use(cors());
app.use(express.json());


// connect to mongoDB
connectDB();


// routes
app.use('/users', usersRoute);
app.use('/restaurants', restaurantsRoute);
app.use('/categories', categoriesRoute);
app.use('/menus', menusRoute);


app.get('/', (req, res) => {
    res.send('Food Masters Is Running And Delivering Foods.');
})

app.listen(port, () => {
    console.log(`Food Masters Is Running On ${port}`);
});