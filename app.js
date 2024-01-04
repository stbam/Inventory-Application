const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Schema = mongoose.Schema;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var searchRouter = require("./routes/search");


var app = express();

mongoose.connect(
  "mongodb+srv://stbacmtd:Stru5932@cluster0.qoxy26k.mongodb.net/?retryWrites=true&w=majority",
);
app.use("/public", express.static("public")); /* allows image to be displayed*/

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
  })
);
//app.use(express.static(path.join(__dirname, 'search')));
//?

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      const match = await bcrypt.compare(password, user.password);
  if (!match) {
  // passwords do not match!
  return done(null, false, { message: "Incorrect password" })
  }
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());//////before this line
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*app.use("/", indexRouter);*/
app.use("/users", usersRouter);
app.use("/search", searchRouter);

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.get("/sign-up", (req, res) => res.render("sign-up-form"));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

  app.post("/sign-up", async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const user = new User({
        username: req.body.username,
        password: hashedPassword // Use hashed password instead of plain text password
      });
  
      const result = await user.save();
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  });
  app.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/search",
      failureRedirect: "/"
    })
  );
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// error handler
app.use(function (err, req, res, next) {
  // log the error details
  console.error(err.stack);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
