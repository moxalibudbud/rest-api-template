
import { Express } from 'express';import https from 'https';
import http from 'http';
import fs from 'fs';
import crypto from 'crypto';
import { WEBSERVER_PORT } from '@config';

const port = WEBSERVER_PORT;

const credentials = {
  key: process.env.APP_SSLKEY || '',
  certificate: process.env.APP_SSLCRT || '',
  bundle: process.env.APP_SSLCA || ''
};

function createServer(app: Express) {
  if(credentials.key) {
    const options = {
      key: fs.readFileSync(credentials.key),
      cert: fs.readFileSync(credentials.certificate),
      ca: fs.readFileSync(credentials.bundle),
      secureOptions: crypto.constants.SSL_OP_NO_TLSv1 | crypto.constants.SSL_OP_NO_TLSv1_1
    };
    return https.createServer(options, app);
  }

  return http.createServer(app);
}

export default (app: Express) => {
  const server = createServer(app);

  server.listen(port, () => {
    console.info(`Listening to port ${port}`);
  });
}