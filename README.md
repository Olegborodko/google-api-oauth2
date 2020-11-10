try oauth2 and nodemailer

##### Work was done using
- React
- Node <br>
-- googleapis <br>
-- nodemailer <br>
- google api

##### How to start
1. git clone
2. go to https://console.developers.google.com/ and create new project <br>
2.1. dashboard -> enable apis and services -> select Gmail API -> enable <br>
2.2. credentials -> create credentials -> oauth client id -> web application ->
    Authorized redirect URIs -> add uri -> http://localhost:3000/redirect <br>
2.3. OAuth consent screen -> fill in the consent screen <br>
2.4. credentials -> OAuth 2.0 Client IDs -> copy your client secret and client id and paste to .env file
3. create .env in root  <br>
      `SERVER_PORT = 3001` <br>
      `REACT_APP_API_ENDPOINT = http://localhost:3001` <br>
      `G_CLIENT_ID = your client id` <br>
      `G_CLIENT_SECRET = your client secret` <br>
      `G_REDIRECT_URL = http://localhost:3000/redirect` <br>
      `REACT_APP_G_EMAIL = your gmail for incoming mail`
4. run server `node src/api/app.js`  <br>
	 run client in a new terminal tab `yarn start`

more information see <br>
https://developers.google.com/identity/protocols/oauth2 <br>
https://developers.google.com/identity/protocols/oauth2/web-server <br>
https://www.youtube.com/watch?v=wevmV9iZswI&t=864s