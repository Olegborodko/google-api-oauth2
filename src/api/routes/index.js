const express = require('express')
const router = express.Router()
const {
  urlGoogle, 
  initial,
  getInfo
} = require('../googleModule')

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

router.get('/getUserInfo', async function(req, res, next) {
  try{
    const result = await getInfo()
    res.json({ body: result })
  } catch(err){
    console.log(err)
    next(err)
  }
});

module.exports = router
