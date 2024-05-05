import { Passwords } from "../../utils/utils";

export class PasswordValidation {
    static validatePasswordComplex(pass: string): boolean {
      return Passwords.getRegexForPassword().test(pass);
    }
  }