require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://mail.google.com'
];

const oAuth2Client = getOAuth2Client();

oAuth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    console.log('refresh===>' + tokens.refresh_token);
  }
  console.log('access===>' + tokens.access_token);
});

function getOAuth2Client() {
  return new OAuth2Client(
    process.env.G_CLIENT_ID,
    process.env.G_CLIENT_SECRET,
    process.env.G_REDIRECT_URL)
}

function urlGoogle() {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: defaultScope,
  });
}

async function initial(code){
  const r = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(r.tokens);
  return r.tokens;
}

async function request(param) {
  const url = param.url;
  if (param.refresh_token && param.access_token) {
    const oAuth2Client = getOAuth2Client();
    // oAuth2Client.credentials = {
    //   refresh_token: param.refresh_token,
    //   access_token: param.access_token
    // }
    oAuth2Client.setCredentials({
      refresh_token: param.refresh_token
    });
    return await oAuth2Client.request({ url });
  }
  return await oAuth2Client.request({ url });
}

module.exports.urlGoogle = urlGoogle
module.exports.initial = initial
module.exports.request = request