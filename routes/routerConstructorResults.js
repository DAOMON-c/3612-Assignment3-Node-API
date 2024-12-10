const provider = require('../scripts/dataProvider.js');
const path = require('path');
const resultsFilePath = path.join(__dirname, '..', 'data', 'results.json');
const resultsData = provider.readJSONFrom(resultsFilePath);
const express = require('express');
const router = express.Router();

router.get('/:ref/:year', (req, res) => {

    const ref = req.params.ref.toLocaleLowerCase();
    const year = req.params.year;
    const matches = resultsData.filter(result =>
        ((result.race.year == year) && (result.constructor.ref == ref))
    );

    if (matches.length > 0)
        res.json(matches);
    else
        res.json({ message: `ConstructorResults: Unable to find results with both ref=${ref} and season=${year}` });
});

module.exports = router;