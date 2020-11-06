import React, { useState, useEffect } from 'react';
const axios = require('axios');
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT + '/api'

function Redirect() {
  return (
    <>
      redirect
    </>
  );
}

export default Redirect;