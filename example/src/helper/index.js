const fs = require('fs')

function OpenFile(filepath) {
    const content = fs.readFileSync(filepath, 'UTF-8')

    return {
        value: content,
        json() {
            return JSON.parse(content);
        },
    }
}

function SaveFile(filepath, data) {
    fs.writeFileSync(filepath, data);
}

module.exports = { OpenFile, SaveFile }
