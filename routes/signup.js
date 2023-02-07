const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', async (req, res, next) => {
  try {
    res.render('signup')
  } catch (err) {
    console.log(err);
    next();
  }
});

router.post('/', async(req,res,next) => {
    try{
        const userId = req.body.id_give;
        const password = req.body.pw_give;
        const phoneNumber = req.body.pn_give;

        const pw_hash = await bcrypt.hash(password, 10);

        await User.create({
          userId : userId,
          password : pw_hash,
          phoneNumber : phoneNumber,
        })
        return res.json({'result' : 'success'})
    } catch(err) {
      console.log(err);
        return {'result' : 'fail'}
    }
})

module.exports = router;