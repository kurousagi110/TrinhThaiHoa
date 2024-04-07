import express, { Express, Request, Response,NextFunction  } from "express";
import mongoose from 'mongoose';
import createError from 'http-errors';
import UserCpanel from './cpanel/UserCpanel';
import UserAPI from './cpanel/UserAPI';
import UserService from './service/UserService';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());

// view engine setup
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


app.use("/", UserCpanel);
app.use("/api", UserAPI);


app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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



export default app;
