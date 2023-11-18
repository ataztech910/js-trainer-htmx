import express from 'express';
import compression from 'compression';
import hbs from 'hbs';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { ServiceInit } from './services/core/core.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: './.env'});

const app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/services/shared');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use('/shared-public', express.static(path.join(__dirname, `/services/shared/public/`)));

app.get('/', async (req, res) => {
  console.log('Request params', req.query.view);
  console.log(__dirname);
  app.use('/public', express.static(path.join(__dirname, `/services/${req.query.module}/public/`)));
  app.set('views', __dirname + `/services/${req.query.module}`);
  ServiceInit({
    method: 'get',
    servicePath: `../../services/${req.query.module}/${req.query.module}.mjs`,
    res,
    query: req.query
  });
  
});

app.use(compression());

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});