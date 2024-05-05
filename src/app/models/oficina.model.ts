import { Ciudad } from "./ciudad.model";

export interface Oficina {
    id: number;
    ciudad: Ciudad;
    nombre: string;
    direccion: string;
    telefono: string;
    urlMapsOficina: string;
    idUsuarioAlta: number;
    idUsuarioBaja: number;
    idUsuarioModif: number;
    fechaAlta: Date;
    fechaBaja: Date;
    fechaUltModif: Date;
}