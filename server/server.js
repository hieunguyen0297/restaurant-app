const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const router = require('./routes');



app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.use('/api/v1/restaurants', router);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is running... on port ${PORT}`));