import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import { todoRouter } from './module';

// Init App
const app = express();

// Init db
mongoose.connect('mongodb://localhost/ecommerce', { userNewUrlParser: true });
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

// // Init Views
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//Routes
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
app.use('/todo/', [todoRouter]);

//server initialization
app.listen(3001, () => console.log('Example app listening on port 3001!'))