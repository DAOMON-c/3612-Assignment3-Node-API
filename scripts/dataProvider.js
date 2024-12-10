const readJSONFrom = file => {
    const fs = require('fs');
    const jsonData = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(jsonData);

    return data;
}

module.exports = {readJSONFrom};