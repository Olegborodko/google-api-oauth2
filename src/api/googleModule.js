require('dotenv').config();
const { google } = require('googleapis');

const googleConfig = {
  clientId: process.env.REACT_G_CLIENT_ID,
  clientSecret: process.env.REACT_G_CLIENT_SECRET,
  redirect: process.env.REACT_G_REDIRECT_URL
};

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

function urlGoogle() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
}

module.exports.urlGoogle = urlGoogle