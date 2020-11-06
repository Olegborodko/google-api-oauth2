import React, { useState, useEffect } from 'react';
import './index.css';
const axios = require('axios');
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT + '/api'

function App() {
  const [googleLink, setGoogleLink] = useState('#')

  useEffect(() => {
    axios.get(`/googleLink`)
    .then(function (res) {
      if (res && res.data && res.data.body){
        setGoogleLink(res.data.body)
      }
    })
    .catch(function (error) {
      setGoogleLink('#')
    })
  }, [])

  return (
    <div className="App">
      <a href={googleLink}>test</a>
    </div>
  );
}

export default App;
