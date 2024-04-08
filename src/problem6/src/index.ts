import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';
import createError from 'http-errors';
import path from 'path';
import userAPI from './userAPI';
import UserService from './service/userService';


const session = require('express-session');
const cookieParser = require('cookie-parser');


const app: Express = express();
const PORT = process.env.PORT || 3000;


// view engine setup
app.use(express.json());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));


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


app.get('/', async (req: Request, res: Response) => {
    try {
        const score = await UserService.getScoreBroad();
        console.log(score);
        if (!score) {
            return res.status(404).json({ message: 'No user found' });
        }
        res.render('score', { score });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//use router
app.use('/api', userAPI);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(500);
    res.render('error');
});


// Start the server
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

export default app;