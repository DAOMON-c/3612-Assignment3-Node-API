const provider = require('../scripts/dataProvider.js');
const path = require('path');
const resultsFilePath = path.join(__dirname, '..', 'data', 'results.json');
const resultsData = provider.readJSONFrom(resultsFilePath);
const express = require('express');
const router = express.Router();

router.get('/:ref/:year', (req, res) => {

    const ref = req.params.ref;
    const year = req.params.year;

    const matches = resultsData.filter(result =>
        result.driver.ref == ref && result.race.year == year
    );

    if (matches.length > 0)
        res.json(matches);
    else
        res.json({ message: `DriverResults: Unable to find results with both ref=${ref} and year=${year}` });
});

module.exports = router;