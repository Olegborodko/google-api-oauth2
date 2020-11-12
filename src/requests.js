const axios = require('axios');
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT + '/api';

module.exports.request = (obj) => {
  return axios.post(`/request`, obj)
  .then(function (res) {
    if (res && 
      res.data && 
      res.data.body && 
      res.data.body.data) {
      return res.data.body.data
    }
    return false
  })
  .catch(function (error) {
    console.log(error)
    return false
  })
}

module.exports.getToken = (code) => {
  return axios.post(`/getToken`, {code})
    .then(function (res) {
      if (res && res.data && res.data.body){
        return res.data.body
      }
      return false
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
}

module.exports.sendMail = (params) => {
  return axios.post(`/sendMail`, params)
    .then(function (res) {
      if (res && res.data && res.data.body){
        return res.data.body
      }
      return false
    })
    .catch(function (error) {
      console.log(error)
      return false
    }) 
}

module.exports.getRefreshToken = (googleId) => {
  if (!googleId) {
    return false;
  }
  return axios.get(`/getRefreshToken`, {
    params: {
      googleId
    }
  })
    .then(function (res) {
      if (res && 
        res.data &&
        res.data.body) {
        return res.data.body
      }
      return false
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
}

module.exports.updateRefreshToken = (params) => {
  return axios.post(`/updateRefreshToken`, params)
    .then(function (res) {
      if (res && res.data && res.data.body){
        return res.data.body
      }
      return false
    })
    .catch(function (error) {
      console.log(error)
      return false
    }) 
}