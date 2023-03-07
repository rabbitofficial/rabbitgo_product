const express = require("express");
const loginRouter = express.Router();
const config = require("@/config.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const handleData = require("@/tools/handleData.js");

//jetton
const TonWeb = require("tonweb");
const { JettonMinter, JettonWallet } = TonWeb.token.jetton;
const JETTON_WALLET_ADDRESS = config.tonInfo.JETTON_WALLET_ADDRESS;
const tonweb = new TonWeb(
  new TonWeb.HttpProvider(config.tonInfo.network, {
    apiKey: config.tonInfo.apikey,
  })
);
const jettonWallet = new JettonWallet(tonweb.provider, {
  address: JETTON_WALLET_ADDRESS,
});

const getJettonWalletInfo = async () => {
  const data = await jettonWallet.getData();
  data.balance = data.balance.toString();
  data.ownerAddress = data.ownerAddress.toString(true, true, true);
  data.jettonMinterAddress = data.jettonMinterAddress.toString(
    true,
    true,
    true
  );
  console.log(data);
};
//jetton
// middleware that is specific to this router
loginRouter.use((req, res, next) => {
  console.log("authtoken general middleware");
  next();
});

//loginRouter.post("/", (req, res) => {})

loginRouter.post("/", async (req, res) => {
  const connection = config.createConnection();

  let wallet = req.body.wallet;
  let findUser = `select * from wallets where wallet = '${wallet}'`;

/*   console.log("bbb", req.body)
  id: 697889628,
first_name: 'hello',
last_name: 'kitty',
username: 'suency',
language_code: 'zh-hans' */
  //await getJettonWalletInfo()

  // console.log("wallet2:", wallet);
  //console.log("token", req.header);
  console.log("bbb", req.body)
  if (wallet) {
    connection.query(findUser, (err, rows, fields) => {
      const result = JSON.parse(JSON.stringify(rows));

      const tokenStr =
        "Bearer " +
        jwt.sign(
          {
            wallet,
            currentTime: new Date(),
          },
          config.secretKey,
          {
            expiresIn: config.expiresIn,
          }
        );

      axios
        .get(
          config.tonInfo.jettonBalanceApi +
          wallet
          //"EQDbgkxA-eBDEBh1qvrEb0x-tjkc7M9glLV-WZQjMNErGCZf"
        )
        .then(function (response) {
          //console.log("response", response.data);
          if (result.length > 0) {
            if (req.body.id == result[0]["tg_id"]){
              let finalresult = {
                status: "ok",
                tokenStr,
                new: "0",
                points: result[0]["points"],
                nft: result[0]["nft"],
                ...response.data,
              };
              res.send(finalresult);
              connection.end();
            } else {
              res.send(
                handleData.responseJSON(false, {
                  status: "error",
                  error: "Your wallet is used by another telegram",
                })
              );
              connection.end();
            }
            
          } else {
            let insertUser = `INSERT INTO wallets (wallet, head, points, tokens, nft, tg_username,tg_first_name, tg_last_name,tg_language_code,tg_id) 
    SELECT '${wallet}', 'Cranks.png', 0, 0, '','${req.body.username}','${req.body.first_name}','${req.body.last_name}','${req.body.language_code}','${req.body.id}'
    FROM DUAL WHERE NOT EXISTS(SELECT 1 FROM wallets Where wallet = '${wallet}')`;
            connection.query(insertUser, (err1, rows1, fields1) => {

              const result1 = JSON.parse(JSON.stringify(rows1));
              console.log('result1', result1)
              res.send({
                status: "ok",
                tokenStr,
                new: "1",
                points: 0,
                nft: "",
                ...response.data
              });
              connection.end();
              /* if (result1.affectedRows == 1) {
                res.send({
                  status: "ok",
                  tokenStr,
                  new: "1",
                  points: 0,
                  nft: "",
                });
                connection.end();
              } */
            });
          }
        })
        .catch(function (error) {
          // handle error
          console.log("error", error);
        });
    });
  } else {
    res.send(
      handleData.responseJSON(false, {
        status: "error",
        error: "wrong wallet",
      })
    );
  }
});

loginRouter.get("/", (req, res) => {
  const connection = config.createConnection();
  connection.query(`select 1`, (err, rows, fields) => {
    //console.log("rows", rows)
    //console.log("config", config)
    console.log("err", err)
    res.send({ test2: "ok2" });
    //const result = JSON.parse(JSON.stringify(rows));
    //res.send(result);
  })
  connection.end();

});
// define the about route
loginRouter.get("/register", (req, res) => {
  console.log(req.body);
  res.send("register");
});

loginRouter.post("/test", (req, res) => {
  console.log(req.body);
  console.log(req.header.Authorization);
  res.send({ test2: "ok2" });
});

module.exports = loginRouter;
