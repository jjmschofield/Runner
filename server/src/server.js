const http = require('http');
const { createDefaultExpressApp } = require('./lib/express/appFactory');
const { createUserRouter } = require('./services/users/router');
const { createActivitiesRouter } = require('./services/activities/router');

const app = createDefaultExpressApp();
app.use('/users', createUserRouter());
app.use('/activities', createActivitiesRouter());

http.createServer(app).listen(3000);
