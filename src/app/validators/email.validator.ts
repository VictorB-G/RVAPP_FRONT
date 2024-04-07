import { Emails } from "../utils/utils";

export class EmailValidation {
  static validationEmail(email: string): boolean {
    return Emails.getRegexForEmail().test(email);
  }
}
