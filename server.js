const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with helpers

const hbs = exphbs.create({ helpers });

// session storage
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars as view engine

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware for parsing JSON and form data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory

app.use(express.static(path.join(__dirname, "public")));

// Use the routes defined in the controllers

app.use(routes);

// Sync sequelize models to the database and then start the server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
