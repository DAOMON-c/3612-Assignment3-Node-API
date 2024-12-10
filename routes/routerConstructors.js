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

    const ref = req.params.ref.toLocaleLowerCase();
    const matches = constData.find(constructor => constructor.constructorRef == ref);

    if (matches)
        res.json(matches);
    else
        res.json({ message: `Constructors: Unable to find constructor with ref=${ref}` });
});

module.exports = router;
