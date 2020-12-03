import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';

import app from './app';
const config = require('../conf/config.json')

// @ts-ignore
if (!config[process.env.NODE_ENV]) {
  process.env.NODE_ENV = 'development'
  // console.error('当前环境的配置不存在', process.env.NODE_ENV)
  // 当前环境的配置不存在
  // process.exit(1)
}

// @ts-ignore
config = config[process.env.NODE_ENV]

const port = process.env.PORT || config.port
const host =  process.env.HOST || config.host

http.createServer(app.callback()).listen(port, () => {
  console.log(`🚀 Server is ready at http://${host}:${port}/graphql`)
});

if (process.env.HTTPS || config.https) {
  const httpsPort = process.env.HTTPS_PORT || config.httpsPort
  https.createServer({
    key: fs.readFileSync('./conf/ssl-key.pem'),
    cert: fs.readFileSync('./conf/ssl.pem')
  }, app.callback()).listen(httpsPort, () => {
    console.log(`🚀 Server is ready at https://${host}:${httpsPort}/graphql`)
  });
}
