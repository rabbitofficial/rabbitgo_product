const express = require("express");
const loginRouter = express.Router();
const config = require("@/config.js");
const jwt = require("jsonwebtoken");
const handleData = require("@/tools/handleData.js");

async function jetton(n, toAdd) {
    // jetton
    const TonWeb = require("tonweb");
    const nacl = TonWeb.utils.nacl;

    const mnemonicToWalletKey = require("ton-crypto").mnemonicToWalletKey;
    const mnemonic = config.tonInfo.keyword24; 
    const key = await mnemonicToWalletKey(mnemonic.split(" "));

    const { JettonMinter, JettonWallet } = TonWeb.token.jetton;

    const tonweb = new TonWeb(
        new TonWeb.HttpProvider(config.tonInfo.network, {
            apiKey: config.tonInfo.apikey,
        })
    );

    const WalletClass = tonweb.wallet.all["v3R2"];
    const wallet = new WalletClass(tonweb.provider, {
        publicKey: key.publicKey,
        wc: 0,
    });
    const seqno = (await wallet.methods.seqno().call()) || 0;
    const walletAddress = await wallet.getAddress();
    const WALLET_ADDRESS = walletAddress.toString(true, true, true);

    const simpleTransfer = async () => {
        console.log(
            "simpleTransfer",
            await wallet.methods
                .transfer({
                    secretKey: key.secretKey,
                    toAddress: "EQDbC84KWNXUcbRGVg3EO6UZfE1sCoENg6WXXevOT7bJx-bQ",
                    amount: TonWeb.utils.toNano("0.01"), // 0.01 TON
                    seqno: seqno || 0,
                    payload: "Hello",
                    sendMode: 3,
                })
                .send()
        );
    };

    const JETTON_WALLET_ADDRESS = config.tonInfo.JETTON_WALLET_ADDRESS;
    let WALLET2_ADDRESS = toAdd;

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


    const transfer = async () => {
        const seqno = (await wallet.methods.seqno().call()) || 0;
        console.log({ seqno });

        console.log(
            await wallet.methods
                .transfer({
                    secretKey: key.secretKey,
                    toAddress: JETTON_WALLET_ADDRESS,
                    amount: TonWeb.utils.toNano("0.06"),
                    seqno: seqno,
                    payload: await jettonWallet.createTransferBody({
                        jettonAmount: TonWeb.utils.toNano(n),
                        toAddress: new TonWeb.utils.Address(WALLET2_ADDRESS),
                        forwardAmount: TonWeb.utils.toNano("0.02"),
                        forwardPayload: new TextEncoder().encode("gift"),
                        responseAddress: walletAddress,
                    }),
                    sendMode: 3,
                })
                .send()
        );
    };

    return transfer;
}

// middleware that is specific to this router
loginRouter.use((req, res, next) => {
    console.log("authtoken general middleware");
    next();
});

//loginRouter.post("/", (req, res) => {})

loginRouter.post("/", async (req, res) => {
    const connection = config.createConnection();

    const reqWallet = req.body.redeemWallet
    const amount = req.body.redeemPoints

    console.log(reqWallet)
    console.log(amount)
    /* console.log(reqWallet)
    console.log(amount)
    return; */
    const pointSql = `SELECT points from wallets where wallet='${reqWallet}'`;
    connection.query(pointSql, async (err, rows, fields) => {
        let dbpoint = JSON.parse(JSON.stringify(rows));
        dbpoint = dbpoint[0].points ? dbpoint[0].points : 0;

        let diff = dbpoint - amount;
        if (diff >= 0) {
            //first transfer then update database
            try {
                let transfer = await jetton(
                    String(amount),
                    reqWallet
                );
                await transfer();

                const updatePointSql = `UPDATE wallets SET points=${diff} WHERE wallet='${reqWallet}'`;
                connection.query(updatePointSql, (err1, rows1, fields1) => {
                    const result1 = JSON.parse(JSON.stringify(rows1));
                    if (result1.affectedRows == 1) {
                        res.send({
                            status: "ok",
                            info: "Redeem successfully",
                            remainingPoint: diff,
                        });
                    } else {
                        res.send({ status: "error", info: "System error" });
                    }
                    connection.end();
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            res.send({ status: "error", info: "Insuffcient points" });
            connection.end();
        }
        //console.log(req.body.redeemPoints - dbpoint)
        //console.log(dbpoint)
    });
});

loginRouter.get("/", (req, res) => {
    console.log(req.body.wallet);
    console.log(req.header.Authorization);
    res.send({ test: "ok" });
});

loginRouter.post("/test", (req, res) => {
    console.log(req.body);
    console.log(req.header.Authorization);
    res.send({ test2: "ok2" });
});

module.exports = loginRouter;
