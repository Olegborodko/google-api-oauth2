const express = require('express')
const router = express.Router()

router.get('/test', async function(req, res, next) {
  try{
    res.json({ body: 'test' })
  } catch(err){
    next(err)
  }
});

module.exports = router
