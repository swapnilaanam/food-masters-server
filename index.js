const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const connectDB = require('./db/connectDB');
const jwtRoute = require('./routes/jwt')
const usersRoute = require('./routes/users');
const restaurantsRoute = require('./routes/restaurants');
const categoriesRoute = require('./routes/categories');
const menusRoute = require('./routes/menus');
const cartsRoute = require('./routes/carts');
const vouchersRoute = require('./routes/vouchers');
const ordersRoute = require('./routes/orders');
const paymentsRoute = require('./routes/payments');
const locationsRoute = require('./routes/locations');
const ratingsRoute = require('./routes/ratings');

// middleware
app.use(cors());
app.use(express.json());


// connect to mongoDB
connectDB();


// routes
app.use('/jwt', jwtRoute)
app.use('/users', usersRoute);
app.use('/restaurants', restaurantsRoute);
app.use('/categories', categoriesRoute);
app.use('/menus', menusRoute);
app.use('/carts', cartsRoute);
app.use('/vouchers', vouchersRoute);
app.use('/orders', ordersRoute);
app.use('/payments', paymentsRoute);
app.use('/locations', locationsRoute);
app.use('/ratings', ratingsRoute);

app.get('/', (req, res) => {
    res.send('Food Masters Is Running And Delivering Foods.');
})

app.listen(port, () => {
    console.log(`Food Masters Is Running On ${port}`);
});