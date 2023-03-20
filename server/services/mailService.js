const nodemailer=require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
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