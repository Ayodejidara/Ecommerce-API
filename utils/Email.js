const htmlToText = require('html-to-text');
const nodemailer= require('nodemailer');

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
    }
}
