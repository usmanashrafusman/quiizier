import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { createTransport } from "nodemailer"
@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) { }
  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<boolean> {
    try {
      let transporter = createTransport({
        service: this.configService.get("EMAIL_SERVICE"),
        auth: {
          user: this.configService.get("EMAIL_SERVICE_EMAIL"),
          pass: this.configService.get("EMAIL_SERVICE_EMAIL_PASSWORD"),
        },
      });

      let info = await transporter.sendMail({
        from: this.configService.get("EMAIL_SERVICE_INFO"),
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