//CLASE CON UTILIDADAES GENERICAS

import { AbstractControl } from "@angular/forms";

type ComparableKeys = number | boolean | string;
//Utilidades genericas para revisar nulos y cloanar objetos
export class Generic {
    static isNullOrUndefined<T>(v: T): boolean {
      return v === null || v === undefined;
    }
  
    static coalesce<T>(...vals: Array<any>): T {
      let result = null;
      if (vals) {
        let i = 0;
        while (result === null && i < vals.length) {
          if (vals[i] !== null && vals[i] !== undefined) {
            result = vals[i];
          }
          i++;
        }
      }
      return result;
    }
  
    static clone<T>(value: T): T {
      if (value === null || value === undefined) {
        return value;
      }
      return JSON.parse(JSON.stringify(value));
    }
}

//Utilidades genericas para manejo de cadenas de texto
export class Strings {
  static isNotEmpty(cad: string | number): boolean {
    return !Generic.isNullOrUndefined(cad) && `${cad}`.trim() !== '';
  }

  static isEmpty(cad: string | number): boolean {
    return Generic.isNullOrUndefined(cad) || `${cad}`.trim() === '';
  }

  static trim(cad: string | number): string {
    if (!Generic.isNullOrUndefined(cad)) {
      return `${cad}`.trim();
    }
    return '';
  }

  static ltrim(cad: string, char = ' '): string {
    if (cad) {
      if (char && char.length > 0) {
        const charAux = char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regEx = new RegExp(`^(${charAux})*`);
        return cad.replace(regEx, '');
      }
      return cad.replace(/^\s*/gm, '');
    }
    return '';
  }

  static rtrim(cad: string, char = ' '): string {
    if (cad) {
      if (char && char.length > 0) {
        const charAux = char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regEx = new RegExp(`(${charAux})*$`);
        return cad.replace(regEx, '');
      }
      return cad.replace(/\s*$/gm, '');
    }
    return '';
  }

  static lowerCase(cad: string): string {
    if (cad) {
      return cad.toLowerCase();
    }
    return '';
  }

  static upperCase(cad: string): string {
    if (cad) {
      return cad.toUpperCase();
    }
    return '';
  }

  static capitalize(cad: string): string {
    if (cad) {
      const trimmedCad = cad.trim();
      if (trimmedCad.length > 1) {
        return (
          trimmedCad.substring(0, 1).toUpperCase() +
          trimmedCad.substring(1).toLowerCase()
        );
      }
      return trimmedCad.toUpperCase();
    }
    return '';
  }
}

export class Arrays {
  static toArray<T>(val: T | Array<T>): Array<T> {
    if (val === null || val === undefined) {
      return [];
    }
    return Array.isArray(val) ? [...val] : [val];
  }

  static isArray<T>(x: Array<T>): x is Array<T> {
    return (Array.isArray && Array.isArray(x)) && (x && typeof x.length === 'number');
  }

  static isEmpty<T>(arr: Array<T>): boolean {
    return !arr || arr.length === 0;
  }

  static isNotEmpty<T>(arr: Array<T>): boolean {
    return arr && arr.length > 0;
  }

  static size<T>(arr: Array<T>): number {
    if (Generic.isNullOrUndefined(arr)) {
      return 0;
    }
    return arr.length;
  }

  static join<T>(arr: Array<T>, glue = ', '): string {
    if (Generic.isNullOrUndefined(arr) || Arrays.isEmpty(arr)) {
      return '';
    }
    return arr.join(glue);
  }

}

export class Numbers {
  static isNumber(val: any): val is number {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat
    return !Arrays.isArray(val) && (val - parseFloat(val) + 1) >= 0;
  }
}

export class Emails {
  static getRegexForEmail(): RegExp {
    return /^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-zA-Z-_.]+\.[a-zA-Z.-_]{2,5}$/;
  }
}

export class Passwords {
  static getRegexForPassword(): RegExp {
    return /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  }
}

export class FormsUtils {
  static obtenerMensajeError(control: AbstractControl): string {
    if (control?.dirty && control.invalid) {
      if (control.errors?.['isNotNumber']) {
        return 'El campo tiene que ser numérico';
      }
      if (control.errors?.['empty']) {
        return 'El campo no puede estar vacío';
      }
      if (control.errors?.['invalidNif']) {
        return 'El campo tiene un DNI incorrecto';
      }

      if (control.errors?.['invalidNie']) {
        return 'El campo tiene un NIE incorrecto';
      }

      if (control.errors?.['invalidDoc']) {
        return 'El campo tiene un documento (DNI / NIE) incorrecto';
      }

      if (control.errors?.['invalidEmail']) {
        return 'El campo tiene un email incorrecto';
      }
    }
    return '';
  }
}

