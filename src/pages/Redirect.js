import React, { useState, useLayoutEffect } from 'react';
const {
  request,
  getToken,
  sendMail,
  updateRefreshToken,
  getRefreshToken
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

    async function fromRefreshToken(userId) {
      return await getRefreshToken(userId)
    }

    async function initial() {
      const tokens = await getToken(code);

      if (!tokens) {
        setAccess(false)
        return
      }

      const userInfo = await request({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo'
      });
      
      if (!userInfo) {
        setAccess(false)
        return
      }

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

      localStorage.setItem('userId', userInfo.id)

      await updateRefreshToken({
        googleId: userInfo.id,
        refreshToken: tokens.refresh_token
      })
    }

    async function refreshPage(refresh_token){
      const res = await request({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        refresh_token
      });

      if (!res) {
        setAccess(false)
        return
      }

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

    if (!localStorage.getItem('userId') && !code) {
      setAccess(false)
      return
    }

    if (!localStorage.getItem('userId')) {
      initial();
      return;
    }

    if (localStorage.getItem('userId')) {
      fromRefreshToken(localStorage.getItem('userId')).then((res) => {
        const refresh_token = res;
        refreshPage(refresh_token)
      })
    }

  }, [])

  async function logout() {
    const userId = localStorage.getItem('userId')
    if (userId) {
      await updateRefreshToken({
        googleId: localStorage.getItem('userId'),
        refreshToken: ''
      })
      localStorage.removeItem('userId');
    }
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