const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

function getFilePath(collection) {
    return path.join(dataDir, `${collection}.json`);
}

function readData(collection) {
    const filePath = getFilePath(collection);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error(`Error reading ${collection}.json:`, e);
        return [];
    }
}

function writeData(collection, data) {
    const filePath = getFilePath(collection);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error(`Error writing ${collection}.json:`, e);
    }
}

module.exports = {
    readData,
    writeData
};
