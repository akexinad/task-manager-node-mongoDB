const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
  to: 'danny.ceccattini@gmail.com',
  from: 'danixeka@gmail.com',
  subject: 'My first sendgrid email!',
  text: 'Shadows and dust Maximus. Shadows and dust!!!'
})
