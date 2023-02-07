const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', async (req, res, next) => {
  try {
    res.render('login');
  } catch (err) {
    console.log('login get error', err);
    next();
  }
})

router.post('/', async (req, res) => {
  try {
    const userId = req.body.id_give;
    const password = req.body.pw_give;

    const userExist = await User.findOne({
      where : {
        userId : userId
      }
    });

    if(!userExist) {
      return res.status(500).json({'result' : 'fail', 'message' : '아이디 또는 비밀번호를 다시한번 확인해주세요.'});    
    } 

    const check = await bcrypt.compare(password, userExist.password);
    if(check) {
      return res.status(200).json({'result' : 'success'})
    } else {
      return res.status(500).json({"result" : 'fail'})
    }
      
  } catch (err) {
    console.log('login post error', err);
    return err;
  }
})

module.exports = router;