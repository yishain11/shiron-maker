const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });
const { PORT } = process.env;
const cookieParser = require('cookie-parser');

const { clientRouter, scrapperRouter } = require('./routes/routes.index');
const logger = require('./middlewares/logger')

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
server.use(cookieParser());
server.use(logger)


server.use('/api/scrapping', scrapperRouter);
server.use('/', clientRouter);

server.listen(PORT, () => { console.log(`server listening on port: ${PORT}`); });