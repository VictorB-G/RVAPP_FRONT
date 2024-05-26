import { Sitio } from "./sitio.model";

export interface Reserva {
    id: number;
	sitio: Sitio;
    idSitio: number;
    codigoReserva: string;
    fechaReserva: Date;
    idUsuarioReserva: number;
	nifReserva: string;
    emailReserva: string;
    haFichado: boolean;
    anulada: boolean;
}

export interface ReservaAdd {
    idSitio: number;
    fechaInicio: string;
    fechaFin: string;
}