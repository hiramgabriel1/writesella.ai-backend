import { Injectable } from '@nestjs/common';
import { transporter } from 'src/config/nodemailer.config';


/**
 * This class is used to send email 
 */
@Injectable()
export class EmailServices {

    /**
     * this method is used to send all emails from app
     * 
     * @param subject subject of email
     * @param template templete of email
     * @param userEmail user to send email
     * @param text text of email
     * @returns if emails is sent succesfully return true else false
     */
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
        ! error ? resolve(true): resolve(false);
      });
    });
  }
}