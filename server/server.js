const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });
const { PORT } = process.env;
const cookieParser = require('cookie-parser');

const { clientRouter } = require('./routes/routes.index');

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use('/', clientRouter);

server.listen(PORT, () => { console.log(`server listening on port: ${PORT}`); });