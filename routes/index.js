const express = require('express');

const router = express.Router();

const pageRouter = require('./page');
const loginRouter = require("./login");
const signupRouter = require('./signup');

router.use((req, res, next) => {
  next();
});

router.use('/', pageRouter);
router.use('/login', loginRouter);
router.use("/signup", signupRouter);

module.exports = router;