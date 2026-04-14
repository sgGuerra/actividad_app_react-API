/**
 * Sport.ts
 * ─────────────────────────────────────────────────────────────
 * Entidad de dominio: representa un deporte (Football, Basketball, etc.)
 *
 * En Clean Architecture, las entidades son objetos PUROS.
 * No dependen de Express, bases de datos, ni librerías externas.
 * Solo definen la FORMA de los datos y las reglas de negocio.
 * ─────────────────────────────────────────────────────────────
 */
export interface Sport {
  /** Identificador único del deporte */
  id: number;

  /** Nombre legible del deporte (ej: "Football") */
  name: string;

  /** Slug para URLs amigables (ej: "football") */
  slug: string;
}
