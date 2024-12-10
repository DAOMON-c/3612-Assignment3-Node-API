const provider = require('../scripts/dataProvider');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'drivers.json');
const driversData = provider.readJSONFrom(filePath);
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(driversData);
});

router.get('/:ref', (req, res) => {

    const driverRef = req.params.ref.toLocaleLowerCase();
    const matches = driversData.find(driver => driver.driverRef == driverRef);

    if (matches)
        res.json(matches);

    else
        res.json({ message: `Drivers: Unable to find driver with Ref=${driverRef}` });
});

module.exports = router;