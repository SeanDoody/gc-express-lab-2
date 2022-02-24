const express = require('express');
const app = express();
const cors = require("cors");
const cartItems = require('./routes/cart-items.js');

app.use(express.json());
app.use(cors());
app.use('/cart-items', cartItems);

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));