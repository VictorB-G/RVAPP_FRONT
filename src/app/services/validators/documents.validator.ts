import { Generic } from "../../utils/utils";

export const esDNIValido = (dni: string): boolean => {
  if (Generic.isNullOrUndefined(dni)) {
    return false;
  }
  const doc = dni.toUpperCase();
  const expresionRegularDni = /^\d{8}[a-zA-Z]$/;
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKET';

  if (!expresionRegularDni.test(doc)) {
    return false;
  }

  const resto = parseInt(doc.substring(0, doc.length - 1), 10) % 23;
  const letra = doc.charAt(doc.length - 1);
  if (letra.toUpperCase() !== letras.charAt(resto)) {
    return false;
  }

  return true;
};

export const esNIEValido = (nie: string): boolean => {
  if (Generic.isNullOrUndefined(nie)) {
    return false;
  }
  const doc = nie.toUpperCase();
  const expr = /^[XYZ]\d{5,8}[A-Z]$/;
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKET';

  if (!expr.test(doc)) {
    return false;
  }

  const sNnumero = doc.substring(0, doc.length - 1)
    .replace('X', '0')
    .replace('Y', '1')
    .replace('Z', '2');
  const letra = doc.charAt(doc.length - 1);
  const resto = parseInt(sNnumero, 10) % 23;
  if (letra !== letras.charAt(resto)) {
    return false;
  }
  return true;
};
