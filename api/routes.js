const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../api/credentials.env') });

const router = express.Router();

const BASE_URL = 'https://core.spreedly.com/v1';
const REQUEST_OPTIONS = {
    withCredentials: true,
        auth: {
            username: process.env.ENVIROMENT_KEY,
            password: process.env.ACCESS_SECRET
    }   
};

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

router.post('/purchase', (req, res) => {
    const url = `${BASE_URL}/gateways/${process.env.GATEWAY_TOKEN}/purchase.json`;
    const body = {
        transaction: {
            payment_method_token: req.body.token,
            amount: req.body.amount,
            currency_code: req.body.currencyCode
        } 
    };

    axios.post(url, body, REQUEST_OPTIONS)
        .then(response => {
            console.log('response', response);
            return res.status(200).send({
                message: 'POST purchase call succeeded'
            });
        })
        .catch(error => {
            console.log('error', error);
            return res.status(400).send({
                message: 'Failed to POST purchase'
            });
        });
}); 

router.post('/deliver', (req, res) => {
    const url = `${BASE_URL}/receivers/${process.env.RECEIVER_TOKEN}/deliver.json`;
    const body = {
        delivery: {
            payment_method_token: req.body.token,
            url: "https://postman-echo.com/post",
            headers: "Content-Type: application/json",
            body: JSON.stringify({
                flight_number: req.body.flight.number,
                flight_from: req.body.flight.from,
                flight_to: req.body.flight.to,
                price: req.body.flight.price,
                card_number: "{{credit_card_number}}"
            })
        } 
    };

    console.log('body', body);

    axios.post(url, body, REQUEST_OPTIONS)
        .then(response => {
            console.log('response', response);
            return res.status(200).send({
                message: 'POST deliver call succeeded'
            });
        })
        .catch(error => {
            console.log('error', error);
            return res.status(400).send({
                message: 'Failed to POST deliver'
            });
        });
}); 

router.put('/retain', (req, res) => {
    const url = `${BASE_URL}/payment_methods/${req.body.token}/retain.json`;

    axios.put(url, null, REQUEST_OPTIONS)
        .then(response => {
            console.log('response', response);
            return res.status(200).send({
                message: 'PUT to save credit card data call succeeded'
            });
        })
        .catch(error => {
            console.log('error', error);
            return res.status(400).send({
                message: 'Failed to PUT save credit card dats'
            });
        });
}); 

router.get('/transactions', (req, res) => {
    const url = `${BASE_URL}/transactions.json?order=desc`;
    axios.get(url, REQUEST_OPTIONS)
        .then(response => {
            return res.status(200).send({
                message: 'GET transactions call succeeded',
                transactions: response.data
            });
        })
        .catch(error => {
            console.log('error', error);
            return res.status(400).send({
                message: 'Failed to GET transactions'
            });
        });
}); 

module.exports = router;