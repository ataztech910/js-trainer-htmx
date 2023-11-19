import express from 'express';
import compression from 'compression';
import hbs from 'hbs';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { renderService, executeService } from './services/utils/run-service.mjs';
import bodyParser from "body-parser";
import cookieParser  from "cookie-parser";
import { isAuth } from "./services/utils/is-auth.mjs";
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

app.use('/public', express.static(path.join(__dirname, `/services/public/`)));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const authToken = req.cookies['AuthToken'];
  const refreshToken = req.cookies['RefreshToken'];
  req.user = {
    authToken,
    refreshToken
  };
  next();
});


app.get('/auth', async (req, res) => {
  renderService(app, 'auth', res, req.query, __dirname);
});

app.get('/services', isAuth, async (req, res) => {
  renderService(app, req.query.module, res, req.query, __dirname);
});

const utilityMethods = ['post', 'delete'];
utilityMethods.forEach((method) => {
  app[method]('/:module', async (req, res) => {
    console.log(req.body);
    executeService({
      method: 'post',
      servicePath: `../../services/${req.params.module}/${req.params.module}.${method}.mjs`,
      res,
      body: req.body,
      query: req.query
    });
  });
})


app.use(compression());

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});