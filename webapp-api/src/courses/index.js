const express = require("express");
const loginRouter = express.Router();
const config = require("@/config.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const handleData = require("@/tools/handleData.js");
const moment = require('moment')


// middleware that is specific to this router
loginRouter.use((req, res, next) => {
  console.log("authtoken general middleware");
  next();
});

//loginRouter.post("/", (req, res) => {})

loginRouter.post("/", async (req, res) => {
  /* const connection = config.createConnection();

  onnection.query(findUser, (err, rows, fields) => {
    const result = JSON.parse(JSON.stringify(rows));
  }) */

});

loginRouter.get("/users", (req, res) => {
  const connection = config.createConnection();

  connection.query(`select wallet, head from wallets`, (err, rows, fields) => {
    const result = JSON.parse(JSON.stringify(rows));
    res.send(result);
  })
  connection.end();

});

loginRouter.get("/", (req, res) => {
  res.send({ test: "ok" });
});

loginRouter.get("/courseList", (req, res) => {
  const connection = config.createConnection();

  connection.query(`select * from courses ORDER BY ranking DESC`, (err, rows, fields) => {
    const result = JSON.parse(JSON.stringify(rows));
    result.forEach(element => {
      element.createtime = moment(element.createtime).format('LLL');
      element.updatetime = moment(element.updatetime).format('LLL');
    });
    res.send(result);
  })
  connection.end();
});

loginRouter.get("/lessonList", (req, res) => {
  const connection = config.createConnection();

  connection.query(`select * from lessons`, (err, rows, fields) => {
    const result = JSON.parse(JSON.stringify(rows));
    result.forEach(element => {
      element.createtime = moment(element.createtime).format('LLL');
      element.updatetime = moment(element.updatetime).format('LLL');
    });
    res.send(result);
  })
  connection.end();
});

loginRouter.get("/getlesson", (req, res) => {
  const connection = config.createConnection();

  //console.log(req.query)
  connection.query(`select * from lessons where course_id=${req.query.id}`, (err, rows, fields) => {
    const result = JSON.parse(JSON.stringify(rows));
    res.send(result);
  })
  connection.end();
});

loginRouter.get("/getlessonDetail", (req, res) => {
  const connection = config.createConnection();

  //console.log(req.query)
  connection.query(`select * from lessons where id=${req.query.id}`, (err, rows, fields) => {
    const result = JSON.parse(JSON.stringify(rows));
    res.send(result);
  })
  connection.end();
});

loginRouter.get("/totalRewardById", (req, res) => {
  const connection = config.createConnection();

  connection.query(`SELECT sum(tokenAward) as total from lessons where course_id in (select id from courses where activity_id=1)`, (err, rows, fields) => {
    const result = JSON.parse(JSON.stringify(rows));
    res.send(result);
  })
  connection.end();
});

loginRouter.get("/quiz", (req, res) => {
  const connection = config.createConnection();

  connection.query(`select * from quiz where id=1`, (err, rows, fields) => {
    const result = JSON.parse(JSON.stringify(rows));
    res.send(result);
  })
  connection.end();
});

module.exports = loginRouter;
