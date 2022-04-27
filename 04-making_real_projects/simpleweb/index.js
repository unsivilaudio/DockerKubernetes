const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello there frined.');
});

app.listen(8080, console.log.bind(null, 'Listening on port 8080'));
