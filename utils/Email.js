const {convert} = require('html-to-text');
const nodemailer= require('nodemailer');
const pug = require('pug');

module.exports = class Email{
    constructor(user,url){
     this.to = user.email;
     this.firstName = user.firstName;
     this.url = url;
     this.from = `Ojo Ayodeji <${process.env.EMAIL_FROM}>`;
    };

    newTransport() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    };

    async send(template,subject) {
      const html= pug.renderFile(`${__dirname}/../views/email/${template}.pug`,{
        firstName: this.firstName,
        url: this.url,
        subject,
      });

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html)
      };

      await this.newTransport().sendMail(mailOptions);
    };

    async sendWelcome() {
     await this.send('Welcome','Welcome to this Ecommerce app');
    };

    async sendPasswordReset() {
      await this.send('passwordReset', 'Your password reset token (Only valid for 10 minutes)');
    };
}
