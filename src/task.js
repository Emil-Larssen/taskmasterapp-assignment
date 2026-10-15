const { randomUUID } = require('node:crypto');

function createTask(text) {
    return {
        id: randomUUID(),
        text: text,
        completed: false
    };
}

module.exports = { createTask };