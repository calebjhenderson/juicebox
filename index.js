require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();
const apiRouter = require('./api');
const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

server.use((req, res, next) => {
    console.log('<___Body Logger START___>');
    console.log(req.body);
    console.log("<___Body Logger End___>");
    next();
});

server.use('/api', apiRouter);

server.get('/add/:first/to/:second', (req, res, next) => {
  res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
    Number(req.params.first) + Number(req.params.second)
   }</h1>`);
});


