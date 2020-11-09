const nodemailer = require('nodemailer')

const transporter = (refreshToken, email) => nodemailer.createTransport(
  {
    // pool: true,
    service: 'Gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,  
    auth: {
      type: 'OAuth2',
      user: email,
      refreshToken,
      clientId: process.env.G_CLIENT_ID,
      clientSecret:  process.env.G_CLIENT_SECRET
    }
  }
)

const mailer = (params) => new Promise((resolve) => {
  transporter(params.refreshToken, params.email).sendMail({
    from: `<${params.email}>`,
    to: `<${params.emailTo}>`,
    subject: params.subject,
    text: params.text
  }, (err, info) => {
    if (err) {
      console.log(err);
      resolve(false)
    } else {
      console.log('Email sent: ', info);
      resolve(true)
    }
  })
});

module.exports = mailer