const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  next();
});


router.get('/:maker', async (req, res, next) => {
  try {
    const maker = req.params.maker;
    return res.render('list');
  } catch (err) {
    console.log(err);
    next();
  }
})

module.exports = router;