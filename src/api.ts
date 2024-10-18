import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import routes from './routes/v1';
import httpServer from '@utils/http-server';

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// TODO: Middlewares for sanitazion here

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
// TODO: For passport implementation here
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);

export default () => {
  httpServer(app);
}