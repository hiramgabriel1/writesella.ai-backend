import { Injectable } from '@nestjs/common';
import { transporter } from 'src/config/nodemailer.config';

@Injectable()
export class emailServices {
  async sendEmail(
    subject: string,
    template: string,
    userEmail: string,
    text: string,
  ): Promise<boolean> {
    const mailData = {
      from: process.env.EMAILNOTIFY,
      to: userEmail,
      subject: subject,
      text: text,
      html: template,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          resolve(false); // Resolve with false if exist error
        } else {
          resolve(true); // Resolve with true if dont exist error and  send email was succesfully
        }
      });
    });
  }
}