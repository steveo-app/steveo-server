/// importing dependencies and middleware

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./routers/usersRouter')


const server = express();

/// applying middleware 

server.use(helmet());
server.use(express.json());
server.use(cors());

/// applying endpoint routers

server.use('/api/users', userRouter);

/// main get endpoint

server.get('/', (req, res) => {
    res.send("<h1>Welcome to Eventr API</h1>")
});

module.exports = server;