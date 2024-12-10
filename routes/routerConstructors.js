const provider = require('../scripts/dataProvider.js');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'constructors.json');
const constData = provider.readJSONFrom(filePath);
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.json(constData);
});

router.get('/:ref', (req, res) => {

    const constructorRef = req.params.ref;
    const matches = constData.find(constructor => constructor.constructorRef == constructorRef);

    if (matches)
        res.json(matches);
    else
        res.json({ message: `Constructors: Unable to find constructor with Ref=${constructorRef}` });
});

module.exports = router;
