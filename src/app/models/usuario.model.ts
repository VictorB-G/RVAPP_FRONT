import { Rol } from "./rol.model";

export interface Usuario {
    id?: number;
    nif?: string;
    nombre?: string;
    apellido1?: string;
    apellido2?: string;
    email?: string;
    rol: Rol;
    activo?: boolean;
}

export interface UsuarioAlta {
    id?: number;
    nif?: string;
    nombre?: string;
    apellido1?: string;
    apellido2?: string;
    email?: string;
    rol: Rol;
    activo?: boolean;
    username?: string;
    password?: string;
    confirmarPassword?: string;
    confirmacionEmail?: string;
}