const { OpenFile, SaveFile } = require('./helper');

// District
console.log('Processing districts...')

const districts = OpenFile('data/districts.json')
    .json()
    .map(item => item.id)
    .toString()
    .replace(/,/gi, '\n');

SaveFile("dist/districts.txt", districts)
