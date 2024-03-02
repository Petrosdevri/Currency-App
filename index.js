const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.render('public/index', { title: 'Currency App' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});