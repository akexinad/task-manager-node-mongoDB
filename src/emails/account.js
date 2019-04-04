const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'danixeka@gmail.com',
    subject: 'Cheers for joining!',
    text: `Welcome to the app, ${ name }. Let me know how you get along with the app.`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'danixeka@gmail.com',
    subject: 'Sorry to see you go',
    text: `Hey ${ name },\n\n We just wanted to say it's a shame that you're going. If you have any feedback on the reasons for your cancellation please let us know, we are always looking to improve the app. Hope to see you again soon!`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail // ES6 shorthand
}
