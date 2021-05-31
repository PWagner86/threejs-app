const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
})