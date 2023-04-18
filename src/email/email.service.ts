import { Injectable } from '@nestjs/common';
import { createTestAccount, createTransport } from "nodemailer"
@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<boolean> {

    try {
      let transporter = createTransport({
        service: "gmail",
        auth: {
          user: "info.askanyone@gmail.com",
          pass: "ybdloadoduyoupbf",
        },
      });

      let info = await transporter.sendMail({
        from: 'info.askanyone@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: html || ""
      });

      return !!info || false;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}