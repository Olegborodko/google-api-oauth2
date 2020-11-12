const express = require('express')
const router = express.Router()
const {
  urlGoogle, 
  initial,
  request
} = require('../googleModule')
const mailer = require('../nodemailer');
const knex = require('../../../knexConfig');

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
    if (err.response && 
      err.response.data &&
      err.response.data.error &&
      err.response.data.error === "invalid_grant") {
        res.json({ body: false })
        return;
      }
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
    if (err.response && 
      err.response.data &&
      err.response.data.error &&
      err.response.data.error === "invalid_grant") {
        res.json({ body: false })
        return;
      }
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

router.post('/updateRefreshToken', async function(req, res, next) {
  try{
    const params = req.body

    const user = await knex('users')
      .where('googleId', params.googleId)

    if (user.length === 0) {
      const result = await knex('users')
      .returning('id')
      .insert({
        googleId: params.googleId,
        refreshToken: params.refreshToken
      })
      res.json({ body: !!result[0] })
    } else {
      const result = await knex('users')
      .returning('id')
      .update({
        refreshToken: params.refreshToken
      })
      .where('googleId', params.googleId)
      res.json({ body: !!result[0] })
    }
  } catch(err){
    console.log(err)
    next(err)
  }
});

router.get('/getRefreshToken', async function(req, res, next) {
  try{
    const token = await knex('users')
      .where('googleId', req.query.googleId)
      .select('refreshToken')
    if (token[0] && token[0]['refreshToken']) {
      res.json({ body: token[0]['refreshToken'] })
    }  else {
      res.json({ body: false })
    }
  } catch(err){
    console.log(err);
    next(err)
  }
});

module.exports = router
