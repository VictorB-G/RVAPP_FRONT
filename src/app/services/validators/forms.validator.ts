import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Generic, Numbers, Strings} from '../../utils/utils';
import {esDNIValido, esNIEValido} from './documents.validator';
import {EmailValidation} from './email.validator';
import { PasswordValidation } from './password.validator';


export class FormsValidation {
  static notEmpty(control: AbstractControl): ValidationErrors | null {
    if (Generic.isNullOrUndefined(control.value) || Strings.isEmpty(`${control.value}`)) {
      return { empty: true };
    }
    return null;
  }

  static isNumber(control: AbstractControl): ValidationErrors | null {
    if (Generic.isNullOrUndefined(control.value) || Strings.isEmpty(`${control.value}`)) {
      return null;
    }
    if (!Numbers.isNumber(control.value)) {
      return { isNotNumber: true };
    }
    return null;
  }

  static validationEmail(control: AbstractControl): ValidationErrors | null {
    if (Generic.isNullOrUndefined(control.value) || Strings.isEmpty(control.value)) {
      return null;
    }
    if (!EmailValidation.validationEmail(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  static validationNIF(control: AbstractControl): ValidationErrors | null {
    if (Generic.isNullOrUndefined(control.value) || Strings.isEmpty(control.value)) {
      return null;
    }
    const nif = Strings.upperCase(control.value);
    if (!esDNIValido(nif)) {
      return { invalidNif: true };
    }
    return null;
  }

  static validationNIE(control: AbstractControl): ValidationErrors | null {
    if (Generic.isNullOrUndefined(control.value) || Strings.isEmpty(control.value)) {
      return null;
    }

    const nie = Strings.upperCase(control.value);
    if (!esNIEValido(nie)) {
      return { invalidNie: true };
    }
    return null;
  }

  static validationDocumentoId(control: AbstractControl): ValidationErrors | null {
    if (Generic.isNullOrUndefined(control.value) || Strings.isEmpty(control.value)) {
      return null;
    }
    const nifValid = FormsValidation.validationNIF(control);
    const nieValid = FormsValidation.validationNIE(control);
    if (nifValid !== null && nieValid !== null) {
      return { invalidDoc: true };
    }
    return null;
  }

  static validationPassword(control: AbstractControl): ValidationErrors | null {
    if (Generic.isNullOrUndefined(control.value) || Strings.isEmpty(control.value)) {
      return null;
    }
    if (!PasswordValidation.validatePasswordComplex(control.value)) {
      return { passNotComplex: true };
    }
    return null;
  }
}
