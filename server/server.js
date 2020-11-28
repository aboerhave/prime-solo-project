// server file for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// requires all files used for routing and uses them to redirect there for 
// the intended routes

const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const parksRouter = require('./routes/parks.router');
const attractionsRouter = require('./routes/attractions.router');
const favoritesRouter = require('./routes/favorites.router');
const datesRouter = require('./routes/dates.router');
const visitRouter = require('./routes/park.visit.router');
const visitAttractionsRouter = require('./routes/visit.attractions.router');
const quantityRouter = require('./routes/attractions.quantity.router');
const notesRouter = require('./routes/notes.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/parks', parksRouter);
app.use('/api/attractions', attractionsRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/dates', datesRouter);
app.use('/api/visitPark', visitRouter);
app.use('/api/visitAttractions', visitAttractionsRouter);
app.use('/api/attractionsQuantity', quantityRouter);
app.use('/api/visitNotes', notesRouter);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
