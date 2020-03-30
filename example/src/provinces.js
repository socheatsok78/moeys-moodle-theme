const { OpenFile, SaveFile } = require('./helper');

// Province
console.log('Processing provinces...')

const provinces = OpenFile('data/provinces.json')
    .json()
    .map(item => item.id)
    .toString()
    .replace(/,/gi, '\n');

SaveFile("dist/provinces.txt", provinces)
