const express = require("express");
const loginRouter = express.Router();
const config = require("@/config.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const handleData = require("@/tools/handleData.js");
const moment = require('moment')

loginRouter.use((req, res, next) => {
    console.log("authtoken general middleware");
    next();
});
loginRouter.post("/", async (req, res) => {

    axios({
        method: 'post',
        url: 'https://api.openai.com/v1/chat/completions',
        data: {
            model: 'gpt-3.5-turbo',
            messages: [{ "role": "user", "content": req.body.text }]
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        }
    })
        .then(resChat => {
            res.send(resChat.data.choices[0].message);
        })
        .catch(error => {
            console.log(error);
        });
    

});
module.exports = loginRouter;