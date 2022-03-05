const express = require('express');
const cartItems = express.Router();
const pool = require('../db/connection.js');

cartItems.get('/', (req, res) => {

    let sql = 'SELECT * FROM shopping_cart';
    let maxPrice = false;

    if (req.query.maxPrice) {
        maxPrice = true;
        sql += ` WHERE price <= ${req.query.maxPrice}`;
    }

    if (req.query.prefix) {
        if (maxPrice) {
            sql += ' AND ';
        } else {
            sql += ' WHERE '
        }
        sql += `product LIKE '${req.query.prefix}%'`;
    }

    if (req.query.pageSize) {
        sql += ` LIMIT ${req.query.pageSize}`;
    }

    pool.query(sql).then(result => {
        res.json(result.rows);
    });

});

cartItems.get('/:id', (req, res) => {

    const sql = 'SELECT * FROM shopping_cart WHERE id = $1';

    pool.query(sql, [req.params.id]).then(result => {
        const data = result.rows;
        if (Object.keys(data).length === 0) {
            res.status(404).send('ID Not Found');
        } else {
            res.json(data);
        }
    });

});

cartItems.post('/', (req, res) => {

    let sql = 'INSERT INTO shopping_cart (product, price, quantity) ';
    sql += 'VALUES ($1, $2, $3) RETURNING *';

    pool.query(sql, [req.body.product, req.body.price, req.body.quantity]).then(result => {
        res.status(201).send(result.rows[0]);
    });

});

cartItems.put('/:id', (req, res) => {

    let sql = 'UPDATE shopping_cart SET product = $1, price = $2, ';
    sql += 'quantity = $3 WHERE id = $4 RETURNING *';

    pool.query(sql, [req.body.product, req.body.price, req.body.quantity, req.params.id]).then(result => {
        res.json(result.rows[0]);
    });

});

cartItems.delete('/:id', (req, res) => {

    let sql = 'DELETE FROM shopping_cart WHERE id = $1';

    pool.query(sql, [req.params.id]).then(result => {
        res.sendStatus(204);
    });

});

module.exports = cartItems;