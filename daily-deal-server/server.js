'use strict';

const express = require('express');
const app = express();
// Import the required dependencies
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dong82.auth0.com/.well-known/jwks.json"
  }),

  audience: 'http://localhost:3001',
  issuer: "https://dong82.auth0.com/",
  algorithms: ['RS256']
});

var fs = require('fs');
var privateDeals = JSON.parse(fs.readFileSync('private-deals.json', 'utf8'));
var publicDeals = JSON.parse(fs.readFileSync('public-deals.json', 'utf8'));

app.get('/api/deals/public', (req, res)=>{
  let deals = publicDeals;
  res.json(deals);
})

app.get('/api/deals/private', authCheck, (req,res)=>{
  let deals = privateDeals;
  res.json(deals);
})

app.listen(3001);
console.log('Listening on localhost:3001');
