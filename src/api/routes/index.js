const express = require('express')
const router = express.Router()
const {urlGoogle} = require('../googleModule')

router.get('/googleLink', async function(req, res, next) {
  try{
    const url = urlGoogle();
    console.log(url);
    res.json({ body: url })
  } catch(err){
    console.log(err);
    next(err)
  }
});

module.exports = router
