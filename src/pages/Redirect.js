import React, { useState, useEffect } from 'react';
const axios = require('axios');
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT + '/api'

function getUserInfo(){
  return axios.get(`/getUserInfo`)
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

function Redirect(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState('')

  useEffect(() => {
    const code = new URLSearchParams(props.location.search).get('code')
    axios.post(`/getToken`, {code})
    .then(function (res) {
      if (res && res.data && res.data.body){
        localStorage.setItem("token", res.data.body.access_token);
        getUserInfo().then((res) => {
          if (res && res.data) {
            setName(res.data.name)
            setEmail(res.data.email)
            setPicture(res.data.picture)
          }
        })
      }
    })
    .catch(function (error) {
      
    })
  }, [])

  return (
    <>
      {name}
      <br/>
      {email}
      <br/>
      <img src={picture}/>
    </>
  );
}

export default Redirect;