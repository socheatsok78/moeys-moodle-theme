const { OpenFile, SaveFile } = require('./helper');

// School
console.log('Processing schools...')

const schools = OpenFile('data/schools.json')
    .json()
    .map(item => item.school_code)
    .toString()
    .replace(/,/gi, '\n');

SaveFile("dist/schools.txt", schools)
