const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/build/',express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/',express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
})