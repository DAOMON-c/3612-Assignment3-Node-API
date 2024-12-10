const provider = require('../scripts/dataProvider');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'circuits.json');
const circuitsData = provider.readJSONFrom(filePath);
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(circuitsData);
});

router.get('/:id', (req, res) => {
    const circuitID = req.params.id;
    const matches = circuitsData.find(circuit => circuit.circuitId == circuitID);
    if (matches)
        res.json(matches);
    else
        res.json({ message: `Circuits: Unable to find circuit with ID=${circuitID}` });
});

module.exports = router;