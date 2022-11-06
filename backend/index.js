const express = require('express');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');
const app = express();

// DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});

app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', routesHandler);
app.use(express.static('public'))

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});