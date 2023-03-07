const express = require('express');
const authRouter = express.Router();
const config = require('@/config.js')
const jwt = require("jsonwebtoken");

authRouter.use((req, res, next) => {
    console.log('auth general middleware');
    next();
});

authRouter.post('/', (req, res) => {

    /* console.log(req.headers.authorization.split(" ")[1])
    let aa = req.headers.authorization.split(" ")[1];
    jwt.verify(aa, config.secretKey, function (err, decoded) {
        console.log(decoded) // bar
    }); */

    /* const connection = config.createConnection();
    let sql = "select * from users";
    connection.query(sql, (err, rows, fields) => {
        res.send(JSON.stringify(rows))
    });
    connection.end(); */
    res.send({ auth: 'ok' });
});

module.exports = authRouter;