import dotenv from "dotenv";

dotenv.config();

export class NotificationService {
  static emailNotify() {
    const email = process.env.EMAIL_FOR_ALERT;
    //logic to send email
  }
}
