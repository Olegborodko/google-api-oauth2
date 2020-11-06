import React, { useState, useEffect } from 'react';
const axios = require('axios');
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT + '/api'

function Redirect(props) {
  useEffect(() => {
    const code = new URLSearchParams(props.location.search).get('code')
    axios.post(`/getToken`, {code})
    .then(function (res) {
      if (res && res.data && res.data.body){
        console.log(res.data.body)
      }
    })
    .catch(function (error) {
      
    })
  }, [])

  return (
    <>
      redirect
    </>
  );
}

export default Redirect;