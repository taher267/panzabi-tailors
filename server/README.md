https://github.com/vsimko/node-graphql-constraint-lambda/issues/13

https://www.npmjs.com/package/graphql-constraint-directive

git config --get remote.origin.url

const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
audience: 'http://pzdotcom-tailor',
issuerBaseURL: 'https://dev-22f83paft2033tj8.us.auth0.com/',
tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);

https://youtu.be/vqHkwTWbaUk?t=4062
