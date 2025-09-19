const express = require('express');
const app = express();
const port = 3000;

//Serving Static File di folder public
app.use(express.static('public'));

app.listen(port, (req, res) => {
    console.log(`Server running at http://localhost:${port}/`);
});