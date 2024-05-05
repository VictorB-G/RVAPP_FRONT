export interface Ciudad {
    id: number;
	nombre: string;
    codigo: string;
    idUsuarioAlta: number;
    idUsuarioBaja: number;
    idUsuarioModif: number;
    fechaAlta: Date;
    fechaBaja: Date;
    fechaUltModif: Date;
}