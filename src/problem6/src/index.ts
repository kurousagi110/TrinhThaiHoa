import express, { Express, Request, Response,NextFunction  } from "express";
import mongoose from 'mongoose';
import createError from 'http-errors';
import path from 'path';
import userAPI from './userAPI';


const session = require('express-session');
const cookieParser = require('cookie-parser');


const app: Express = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

//connect to database
mongoose.connect('mongodb+srv://thaihoa:trinhthaihoa1402@problem5.dnfd7do.mongodb.net/?retryWrites=true&w=majority&appName=problem5')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });

  //khai báo thong tin session, cookie
app.use(session({
    secret: 'iloveyou',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userAPI);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

export default app;