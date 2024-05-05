import { Oficina } from "./oficina.model";
import { Planta } from "./planta.model";

export interface Sitio {
    id: number | null;
    planta?: Planta | null;
    oficina?: Oficina | null;
    numeroSitio: number | null;
    idUsuarioAlta: number | null;
    idUsuarioBaja: number | null;
    idUsuarioModif: number | null;
    fechaAlta: Date | null;
    fechaBaja: Date | null;
    fechaUltModif: Date | null;
}