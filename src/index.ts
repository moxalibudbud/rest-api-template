import 'dotenv/config';
import * as mongodb from '@app/core/mongodb';
import { exitHandler } from '@utils/exit-handler';
import apiServer from './api';
import { unexpectedErrorHandler } from '@utils/unexpected-error-handler';
import { MONGODB_CONNECTION_STRING } from '@config/mongodb';

process.on('SIGINT', () => exitHandler({ event: 'SIGINT'}));
process.on('SIGTERM', () => exitHandler({ event: 'SIGTERM'}));
process.on('uncaughtException', (e) => unexpectedErrorHandler(e, 'uncaughtException'));
process.on('unhandledRejection', (e) => unexpectedErrorHandler(e, 'unhandledRejection'));

const app = async () => {
  await mongodb.connect(MONGODB_CONNECTION_STRING);
  apiServer();
};

app();

