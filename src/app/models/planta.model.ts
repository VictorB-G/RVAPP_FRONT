import { Oficina } from "./oficina.model";
import { Sitio } from "./sitio.model";

export interface Planta {
    id: number;
    oficina: Oficina;
    nombre: string;
    numPlanta: string;
    planoPlanta: any;
    numeroSitios: number;
    idUsuarioAlta: number;
    idUsuarioBaja: number;
    idUsuarioModif: number;
    fechaAlta: Date;
    fechaBaja: Date;
    fechaUltModif: Date;
    sitios: Sitio[];
}