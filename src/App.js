const express = require('express');
const app = express();
const port = 7777;

app.get('/', (req, res) => {
    res.send('Home page');
})

app.get('/test', (req, res) => {
    res.send('Test page');
})

app.get('/hellow', (req, res) => {  
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})