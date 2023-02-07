const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  next();
});



router.get('/', async (req, res, next) => {
  try {
    res.render('main')
  } catch (err) {
    console.log(err);
    next();
  }
})

module.exports = router;