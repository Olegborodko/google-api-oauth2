import React, { useState, useEffect } from 'react';
const {
  getUserInfo,
  getToken,
  sendMail
} = require('../requests');

async function trySendMail(params) {
  const result = await sendMail(params)
  console.log(result)
}

function Redirect(props) {
  const [info, setInfo] = useState({})
  const [access, setAccess] = useState(true)

  useEffect(() => {
    const code = new URLSearchParams(props.location.search).get('code')
    const error = new URLSearchParams(props.location.search).get('error')
    if (!code || error) { 
      setAccess(false)
      return 
    }

    async function fetchData() {
      const tokens = await getToken(code);
      const userInfo = await getUserInfo();
      
      if (!tokens || !userInfo) {
        setAccess(false)
        return
      }

      setInfo({
        refreshToken: tokens.refresh_token,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,

        emailTo: process.env.REACT_APP_G_EMAIL,
        subject: 'test subject',
        text: 'test text'
      })
    }
    fetchData();

  }, [])

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
          <div onClick={() => trySendMail(info)}>
            sendMail
          </div>
        </div> 
        :
        'access denied'  
      }
    </>
  );
}

export default Redirect;