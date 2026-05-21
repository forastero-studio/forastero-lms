// Lógica de cohorte y drip content para el Bootcamp CAD→BIM

export const COHORT_0 = {
  number: "C00",
  startDate: new Date("2026-07-07T00:00:00Z"),
  endDate: new Date("2026-08-31T23:59:59Z"),
  label: "Cohorte 0",
  dateLabel: "7 jul → 31 ago 2026",
};

// Devuelve true si la semana N ya debería estar disponible por calendario
// La semana N se abre N-1 semanas después del inicio de la cohorte
export function isWeekOpenByCalendar(weekNum: number, now = new Date()): boolean {
  const openDate = new Date(COHORT_0.startDate);
  openDate.setDate(openDate.getDate() + (weekNum - 1) * 7);
  return now >= openDate;
}

// Devuelve la fecha en que se abre la semana N
export function weekOpenDate(weekNum: number): Date {
  const d = new Date(COHORT_0.startDate);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export type WeekStatus =
  | "not_started"   // cohorte no arrancó todavía
  | "locked_prev"   // semana anterior pendiente de validar
  | "available"     // disponible para trabajar
  | "completed";    // IFC validado (marcado como completado)

export interface WeekDripInfo {
  weekNum: number;
  status: WeekStatus;
  openDate: Date;
  isOpen: boolean;
}

// Determina el estado de cada semana dado el progreso del alumno
// completedSlugs: slugs de semanas con IFC validado (ej: ['semana-1', 'semana-2'])
export function computeDripStatus(
  completedSlugs: string[],
  now = new Date()
): WeekDripInfo[] {
  return Array.from({ length: 8 }, (_, i) => {
    const weekNum = i + 1;
    const slug = `semana-${weekNum}`;
    const openDate = weekOpenDate(weekNum);
    const isOpen = now >= openDate;
    const isCompleted = completedSlugs.includes(slug);
    const prevCompleted = weekNum === 1 || completedSlugs.includes(`semana-${weekNum - 1}`);

    let status: WeekStatus;
    if (isCompleted) {
      status = "completed";
    } else if (!isOpen) {
      status = "not_started";
    } else if (!prevCompleted) {
      status = "locked_prev";
    } else {
      status = "available";
    }

    return { weekNum, status, openDate, isOpen };
  });
}
