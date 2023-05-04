const express = require('express');
const morgan = require('morgan');
const personsRouter = require('./routes/personsRoutes');
const app = express();

// Middlewares 
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log('Hello from the middleware!');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString;
    next();
});

app.use('/api/v0/persons', personsRouter);

module.exports = app;

