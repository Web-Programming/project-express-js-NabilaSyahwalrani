//app.js
const express = require('express');
const app = express();
const port = 3000;

//Membuat route ke halaman home dengan method GET
app.get('/', (req, res) => {
    res.send('Hello, ini halaman HOME dengan method GET');
});

//Membuat middleware untuk menerima request body dari JSON
app.use(express.json());

//Membuat Route ke halaman submit dengan method POST
app.post('/data', (req, res) => {
    const data = req.body;
    res.send('Hello, ${name}!');
});
//Serving Static File
app.use(express.static('public'));

//Menjalankan server pada port 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});