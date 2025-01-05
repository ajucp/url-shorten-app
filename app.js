const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const mongoConnect = require('./config/db').mongoConnect;

const authRoutes=require('./routes/authRoutes');
const urlRoutes=require('./routes/urlRoutes');
const analyticsRoutes=require('./routes/analyticsRoutes');

dotenv.config();
const app=express();
// console.log('hai')

app.use(bodyParser.json());

app.use('/api/auth',authRoutes);
app.use('/api/shorten',urlRoutes);
app.use('/api/analytics',analyticsRoutes);

mongoConnect(()=>{
    app.listen(3000);
});