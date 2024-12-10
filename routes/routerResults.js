const provider = require('../scripts/dataProvider');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'results.json');
const resultsData = provider.readJSONFrom(filePath);
const express = require('express');
const router = express.Router();

router.get('/race/:id', (req, res) => {

    const raceID = req.params.id;
    const matches = resultsData.filter(result => result.race.id == raceID);

    if (matches.length > 0)
        res.json(matches);
    else
        res.json({ message: `Results: Unable to find races with requested Id=${raceID}` });
});

router.get('/season/:year', (req, res) => {

    const year = req.params.year;
    const matches = resultsData.filter(result => result.race.year == year);

    if (matches.length > 0)
        res.json(matches);
    else
        res.json({ message: `Results: Unable to find results for requested season=${year}` });
});

module.exports = router;