const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const axios = require('axios').default
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')

//setting
app.set('view engine', 'ejs')

// middleware
app.use(express.json());
app.use(morgan('common'));
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// app.all('/verifyuser', (req, res) => {
    // Para ver si el usuario se registro
// })

// async function getCountry() {
//     const response = await axios.get('https://restcountries.eu/rest/v2/')
//     const data = await response.json()
//     return data;
// }



app.get('/', (req, res) => {
    const datos = [{name: 1}, {name:2}, {name:5}]
    res.render('index.ejs', {data: datos});
})

app.post('/country', upload.single('country') , (req, res) => {
    console.log(req.body)
})

app.use(express.static(path.join(__dirname, 'src')))

app.listen(3000 || process.env.PORT);
