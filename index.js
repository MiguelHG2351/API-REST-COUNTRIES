const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express()

//settint
app.set('view engine', 'ejs')

// middleware
app.use(express.json());
app.use(morgan('common'));

// app.all('/verifyuser', (req, res) => {
    // Para ver si el usuario se registro
// })

app.get('/', (req, res) => {
    const datos = [{name: 1}, {name:2}, {name:5}]
    res.render('index.ejs', {data: datos})
})

app.use(express.static('src'))

app.listen(3000);
