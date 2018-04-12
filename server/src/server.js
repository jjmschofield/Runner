const http = require('http');
const { createDefaultExpressApp } = require('./lib/express/appFactory');
const { createUserRouter } = require('./user/router');

const app = createDefaultExpressApp();
app.use('/users', createUserRouter());

http.createServer(app).listen(3000);
