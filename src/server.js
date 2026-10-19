const express = require('express');
const app = express();

// refer to endpoints in routes.js
const routes = require('./routes');
app.use(express.json());
app.use(routes);

// refer to index.html in public folder
const path = require('node:path');
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));