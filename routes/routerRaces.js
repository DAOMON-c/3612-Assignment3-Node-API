const provider = require('../scripts/dataProvider');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'races.json');
const racesData = provider.readJSONFrom(filePath);
const express = require('express');
const router = express.Router();

router.use('/season/:year', (req, res) => {

    const year = req.params.year;
    const matches = racesData.filter(race => race.year == year);

    if (matches.length > 0)
        res.json(matches);
    else
        res.json({ message: `Races: Unable to find races for requested season=${year}` });
});

router.use('/id/:id', (req, res) => {

    const id = req.params.id;
    const matches = racesData.filter(race => race.id == id);

    if (matches.length > 0)
        res.json(matches);
    else
        res.json({ message: `Races: Unable to find races with requested id=${id}` });
});

module.exports = router;