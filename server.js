const express = require('express');
const app = express();

const circuitsRouter = require('./routes/routerCircuits');
const constructorsRouter = require('./routes/routerConstructors');
const constructorResultsRouter = require('./routes/routerConstructorResults');
const driversRouter = require('./routes/routerDrivers');
const driverResultsRouter = require('./routes/routerDriverResults');
const racesRouter = require('./routes/routerRaces');
const resultsRouter = require('./routes/routerResults');

app.use('/api/circuits', circuitsRouter);

app.use('/api/constructors', constructorsRouter);

app.use('/api/constructorResults', constructorResultsRouter);

app.use('/api/drivers', driversRouter);

app.use('/api/driverResults', driverResultsRouter);

app.use('/api/races', racesRouter);

app.use('/api/results', resultsRouter);

app.use('*', (req, res) => {

    res.status(404).json({
        ServerError: true,
        message: "ERROR: Invalid API endpoint",
        requestedPath: req.originalUrl
    });
});

//let port = process.env.port;
let port = process.env.port;

app.listen(port, () => {
    console.log('Listening on port: ' + port);
});