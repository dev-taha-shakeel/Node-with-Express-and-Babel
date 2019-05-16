import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';
import config from './config';
import {
	todoRouter,
	dishRouter,
	leaderRouter,
	promoRouter,
	userRouter,
} from './module';


// Init App
const app = express();
app.set('secPort', '3002'+443);

// Init db
mongoose.connect(config.mongoUrl, { userNewUrlParser: true });
let db = mongoose.connection;

// Checking for db errors
db.on('error', (err) => {
	console.log('error', err);
});

// Checking if connected to db
db.once('open', () => {
	console.log('connected to db');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(passport.initialize());

// // Init Views
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//Routes
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
app.use('/todo/', [todoRouter]);

// Dish, promo, and leader routes used here
app.use('/dishes', [dishRouter]);
app.use('/leaders', [leaderRouter]);
app.use('/promotions', promoRouter);
app.use('/users', userRouter);

// Error Handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
			message: err.message,
			error: err
	});
});

//server initialization
app.listen(3002, () => console.log('Example app listening on port 3001!'))