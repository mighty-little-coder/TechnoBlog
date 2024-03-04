// Importing required modules and packages
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const app = express();
const PORT = process.env.PORT || 3024;
const hbs = exphbs.create({ helpers });
const sequelize = require('./config/connection');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Session configuration
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Middleware
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now rendering at http://localhost:${PORT}. Click here to open in browser. 🚀`));
});