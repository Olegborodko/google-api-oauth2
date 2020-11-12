import React, { useState, useLayoutEffect } from 'react';
const {
  request,
  getToken,
  sendMail
} = require('../requests');

async function trySendMail(params) {
  const result = await sendMail(params)
  console.log(result)
}

function Redirect(props) {
  const [info, setInfo] = useState({})
  const [access, setAccess] = useState(false)

  useLayoutEffect(() => {
    const code = new URLSearchParams(props.location.search).get('code')
    const error = new URLSearchParams(props.location.search).get('error')
    if (!code || error) { 
      setAccess(false)
      return 
    }

    async function fetchData() {
      const tokens = await getToken(code);
      const userInfo = await request({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo'
      });
      
      if (!tokens || !userInfo) {
        setAccess(false)
        return
      }

      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('access_token', tokens.access_token);

      setInfo( prev => {
        return {
          ...prev,
          refreshToken: tokens.refresh_token,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,

          emailTo: process.env.REACT_APP_G_EMAIL,
          subject: 'test subject',
          text: 'test text'
        }
      })
      setAccess(true)
    }

    if (!localStorage.getItem('refresh_token') && !code) {
      setAccess(false)
      return
    }
    if (!localStorage.getItem('refresh_token') && code) {
      // new refresh_token and access_token
      fetchData();
      return
    }
    if (localStorage.getItem('refresh_token') && code) {
      async function refreshPage(){
        const res = await request({
          url: 'https://www.googleapis.com/oauth2/v2/userinfo', 
          access_token: localStorage.getItem('refresh_token'), 
          refresh_token: localStorage.getItem('access_token')
        });

        setInfo( prev => {
          return {
            ...prev,
            refreshToken: localStorage.getItem('refresh_token'),
            name: res.name,
            email: res.email,
            picture: res.picture,
  
            emailTo: process.env.REACT_APP_G_EMAIL,
            subject: 'test subject',
            text: 'test text'
          }
        })
        setAccess(true)
      }
      refreshPage();
    }

  }, [])

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccess(false);
  }

  return (
    <>
      {access 
        ? 
        <div>
          {info.name}
          <br/>
          {info.email}
          <br/>
          <img src={info.picture} alt='user' />
          <br/>
          <div className='button' onClick={() => trySendMail(info)}>
            sendMail
          </div>
          <br/>
          <div className='button' onClick={logout}>
            Logout
          </div>
        </div> 
        :
        'access denied'  
      }
    </>
  );
}

export default Redirect;