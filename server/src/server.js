const http = require('http');
const { createDefaultExpressApp } = require('./lib/express/appFactory');
const { createUserRouter } = require('./users/router');
const { createActivitiesRouter } = require('./activities/router');

const app = createDefaultExpressApp();
app.use('/users', createUserRouter());
app.use('/activities', createActivitiesRouter());

http.createServer(app).listen(3000);
