const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const multer = require('multer');
const upload = multer();


// console.log(process.env.MONGO_URI);


app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://express-blog-zeta.vercel.app',
    // origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));


app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(upload.array());


connectDB();


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api', require('./routes/commentRoutes'));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})

module.exports = app;
