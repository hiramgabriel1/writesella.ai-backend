import { Injectable } from '@nestjs/common';
import { transporter } from 'src/config/nodemailer.config';

@Injectable()
export class ConfirmationsService {
    async sendConfirmAccountUser(userEmail: string) {
        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: 'Confirm your account',
                html: `
                <h1>Confirm your account</h1>
                <p>Click on the link below to confirm your account</p>
                // // <a href="${process.env.FRONTEND_URL}/confirm-account/${userEmail}">Confirm your account</a>
                `
            })

            if(!info.accepted.length) throw new Error('Email not sent')

            return {
                    message: 'Email sent',
                    email: info
                }
        } catch (error) {
            throw new Error(error)
        }
    }
}
