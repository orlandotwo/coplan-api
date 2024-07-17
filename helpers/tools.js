const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'database', 'list.json');

const readDataFile = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

const writeDataFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { 
    readDataFile,
    writeDataFile
}