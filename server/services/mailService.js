const nodemailer=require('nodemailer');
const config=require('../config/default.json');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.smtp_host,
            port: config.smtp_port,
            secure: false,
            auth: {
                user: config.smtp_user,
                pass: config.smtp_pass,
            }
        });
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: config.smtp_user,
            to,
            subject: 'Activate your account',
            text: 'hello ebat',
            html: `
                <h1>Activate your account</h1>
                <a href="${link}">Click here to activate your account</a>
                `
        })
    }
}

module.exports = new MailService();