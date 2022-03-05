const express = require('express');
const cartItems = express.Router();
const pool = require('../db/connection.js');

// const cartArray = [
//     { id: 1, product: 'tofu', price: 2.49, quantity: 4 },
//     { id: 2, product: 'beer', price: 9.99, quantity: 1 },
//     { id: 3, product: 'bread', price: 2.99, quantity: 2 },
//     { id: 4, product: 'apple', price: 0.39, quantity: 10 },
//     { id: 5, product: 'cucumber', price: 0.59, quantity: 3 },
//     { id: 6, product: 'peanut butter', price: 3.99, quantity: 1 }
// ];

function getData(req, res, sql) {
    pool.query(sql).then(result => {
        res.json(result.rows);
    });
}

cartItems.get('/', (req, res) => {
    let sql = 'SELECT * FROM shopping_cart';
    if (req.query.maxPrice) {
        sql += ' WHERE '
    }
    if (req.query.prefix) {
        const prefix = req.query.prefix;
        const prefixLen = prefix.length;
    }
    if (req.query.pageSize) {
        
    }
    res.json(returnArray);
});

cartItems.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let foundItem;
    for (let item of cartArray) {
        if (item.id === id) {
            foundItem = item;
            break;
        }
    }
    if (foundItem === undefined) {
        res.status(404).send('ID Not Found');
    } else {
        res.json(foundItem);
    }
});

cartItems.post('/', (req, res) => {
    const newId = cartArray[cartArray.length - 1].id + 1;
    const newItem = {
        id: newId,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
    };
    cartArray.push(newItem);
    res.status(201).send(newItem);
});

cartItems.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cartArray.findIndex(item => item.id === id);
    cartArray[index].product = req.body.product;
    cartArray[index].price = req.body.price;
    cartArray[index].quantity = req.body.quantity;
    res.status(200).send(cartArray[index]);
});

cartItems.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cartArray.findIndex(item => item.id === id);
    cartArray.splice(index, 1);
    res.sendStatus(204);
});

module.exports = cartItems;