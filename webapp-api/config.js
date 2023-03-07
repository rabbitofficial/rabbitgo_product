const mysql = require('mysql');

module.exports = {
  createConnection: (config) => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
    port: '',
    ...config
  }),
  secretKey: 'sdff2324234234234324',
  expiresIn: '7200s',
  tonInfo: {
    jettonBalanceApi: '',
    network: "",
    apikey: "",
    JETTON_WALLET_ADDRESS: "",
    keyword24: ""
  },
  headersBalance: {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "max-age=0",
    "sec-ch-ua":
      '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
  },
}