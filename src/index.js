// requerir libreria para variables de entorno
require('dotenv').config();
var cors = require('cors');

// express
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// mongo db connection
require('./config/dbConfig');


const authRoutes = require('./routes/auth.routes');
const cloudinaryRoutes = require('./routes/cloudinary.routes');


// express settings
// decode form
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//decode json
app.use(express.json({limit: '50mb'}));
//Cors
app.use(cors());
//Public
app.use(express.static('public'));

// routes
app.use(authRoutes);
app.use(cloudinaryRoutes);



app.get('*', function (req, res, next) {
    res.status(404).json({ error: 'not found' });
});

app.use((err, req, res, next) => {
    console.log(err);
    if (err.statusCode) {
        res.status(err.statusCode).json({ status: err.statusCode, message: err.message })
    } else {
        res.status(500).json({ error: { status: 500, message: 'internal server error' } })
    }

})

app.listen(process.env.PORT || 3001, console.log(`runnig in port ${process.env.PORT || 3001}`))