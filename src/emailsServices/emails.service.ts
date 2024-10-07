import { Injectable } from '@nestjs/common';
import { transporter } from 'src/config/nodemailer.config';


/**
 * This class is used to send email 
 */
@Injectable()
export class emailServices {

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
        if (error) {
          resolve(false); // Resolve with false if exist error
        } else {
          resolve(true); // Resolve with true if dont exist error and  send email was succesfully
        }
      });
    });
  }
}