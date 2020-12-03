import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import fetch from 'cross-fetch';
import cookie from 'koa-cookie';
import session from 'koa-session';
import { graphql } from './middlewares';

import './websocket';
import '../conf/setupDev';

const app = new Koa();
global.fetch = fetch

app.use(cors({
  origin: '*',
  credentials: true
}))
app.use(bodyParser());
app.use(cookie());
app.use(session({
  secret: 'an',
  resave: false,
  saveUninitialized: true
}, app));
app.use(graphql());

export default app;
