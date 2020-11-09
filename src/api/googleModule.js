require('dotenv').config();
const { google } = require('googleapis');

const googleConfig = {
  clientId: process.env.G_CLIENT_ID,
  clientSecret: process.env.G_CLIENT_SECRET,
  redirect: process.env.G_REDIRECT_URL
};

const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

const oauth2 = google.oauth2({
  auth: oauth2Client,
  version: 'v2'
});

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://mail.google.com'
];

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    // how I understand 'offline' will automatically 
    // refresh access_token
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

function urlGoogle() {
  const auth = oauth2Client;
  const url = getConnectionUrl(auth);
  return url;
}

async function initial(code) {
  const {tokens} = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens);
  return tokens;
}

async function getInfo() {
  return await oauth2.userinfo.get()
}

function tokenInfo() {

}

// oauth2Client.on('tokens', (tokens) => {
//   if (tokens.refresh_token) {
//     console.log('refresh===>' + tokens.refresh_token);
//   }
//   console.log('access===>' + tokens.access_token);
// });

module.exports.urlGoogle = urlGoogle
module.exports.initial = initial
module.exports.getInfo = getInfo
