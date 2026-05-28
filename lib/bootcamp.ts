// Lógica de drip content para el Bootcamp CAD→BIM
// Modelo: completion-based (sin cohortes ni calendario)
// La semana N se desbloquea cuando el alumno valida el IFC de semana N-1

// TESTING_MODE = true → todas las semanas accesibles sin restricción
// Cambiar a false para producción (restaura el bloqueo por validación IFC)
export const TESTING_MODE = true;

export type WeekStatus =
  | "locked_prev"   // semana anterior pendiente de validar
  | "available"     // disponible para trabajar
  | "completed";    // IFC validado (marcado como completado)

export interface WeekDripInfo {
  weekNum: number;
  status: WeekStatus;
}

// completedSlugs: slugs de semanas con IFC validado (ej: ['semana-1', 'semana-2'])
export function computeDripStatus(completedSlugs: string[]): WeekDripInfo[] {
  return Array.from({ length: 8 }, (_, i) => {
    const weekNum = i + 1;

    if (TESTING_MODE) {
      const slug = `semana-${weekNum}`;
      const isCompleted = completedSlugs.includes(slug);
      return { weekNum, status: isCompleted ? "completed" : "available" };
    }

    const slug = `semana-${weekNum}`;
    const isCompleted = completedSlugs.includes(slug);
    const prevCompleted = weekNum === 1 || completedSlugs.includes(`semana-${weekNum - 1}`);

    let status: WeekStatus;
    if (isCompleted) {
      status = "completed";
    } else if (!prevCompleted) {
      status = "locked_prev";
    } else {
      status = "available";
    }

    return { weekNum, status };
  });
}
