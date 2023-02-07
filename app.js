const express = require('express');
const morgan = require("morgan");
const dotenv = require('dotenv').config();
const nunjucks = require('nunjucks');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'html');

const { sequelize } = require('./models');
const pageRouter = require("./routes/index");

nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB 연결 되었습니다.');
  })
  .catch((err) => {
    console.log(err);
  });


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);

app.listen('8080', () => {
  console.log('8080번 포트 작동');
})