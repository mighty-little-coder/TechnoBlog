// Importing required modules and packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Importing Sequelize for database connectivity
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Creating an Express application
const app = express();
const PORT = process.env.PORT || 3024;

// Creating an instance of Handlebars with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
  secret: 'Super secret secret',  // Secret key for session encryption
  cookie: {
    maxAge: 900000,  // Session duration in milliseconds (15 minutes)
    httpOnly: true,  // Restricting cookie access to HTTP only
    secure: false,   // Allowing cookies over non-HTTPS connections (development only)
    sameSite: 'strict',  // Enforcing strict same-site policy
  },
  resave: false,  // Preventing session data from being resaved if not modified
  saveUninitialized: true,  // Saving uninitialized sessions
  store: new SequelizeStore({
    db: sequelize  // Using Sequelize to store session data in the database
  })
};

// Setting up session middleware
app.use(session(sess));

// Setting up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serving Bootstrap CSS files from the 'node_modules' directory
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Setting up routes from the controllers
app.use(routes);

// Syncing the database and starting the Express server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});