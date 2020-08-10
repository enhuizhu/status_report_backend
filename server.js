const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();
const AuthService = require('./services/AuthService');
const Router = require('./Router');

app.use(bodyParser());
app.use(cors());

new Router(app);
AuthService.authorize();

app.listen(4000, () => {
  console.log('app run on port 4000');
});