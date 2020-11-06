require('dotenv').config();
const { google } = require('googleapis');

const googleConfig = {
  clientId: process.env.REACT_G_CLIENT_ID,
  clientSecret: process.env.REACT_G_CLIENT_SECRET,
  redirect: process.env.REACT_G_REDIRECT_URL
};

const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    // access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

function urlGoogle() {
  const auth = oauth2Client;
  const url = getConnectionUrl(auth);
  return url;
}

async function tokensFromCode(code) {
  const {tokens} = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens);
  return tokens;
}

module.exports.urlGoogle = urlGoogle
module.exports.tokensFromCode = tokensFromCode
