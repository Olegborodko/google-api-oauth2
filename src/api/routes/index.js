const express = require('express')
const router = express.Router()
const {
  urlGoogle, 
  initial,
  request
} = require('../googleModule')
const mailer = require('../nodemailer');

router.get('/googleLink', async function(req, res, next) {
  try{
    const url = urlGoogle();
    res.json({ body: url })
  } catch(err){
    console.log(err);
    next(err)
  }
});

router.post('/getToken', async function(req, res, next) {
  try{
    const param = req.body
    const result = await initial(param.code)
    res.json({ body: result })
  } catch(err){
    console.log(err)
    next(err)
  }
});

router.post('/request', async function(req, res, next) {
  try{
    const param = req.body
    const result = await request(param)
    res.json({ body: result })
  } catch(err){
    console.log(err)
    next(err)
  }
});

router.post('/sendMail', async function(req, res, next) {
  try{
    const params = req.body
    const result = await mailer(params)
    res.json({ body: result })
  } catch(err){
    console.log(err)
    next(err)
  }
});

module.exports = router
