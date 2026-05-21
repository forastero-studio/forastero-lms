-- ============================================================
-- Bootcamp fields + Validations table
-- ============================================================

-- Columnas bootcamp en users
ALTER TABLE users ADD COLUMN IF NOT EXISTS bootcamp_active BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS cohort_number TEXT;

-- Tabla validations: cada validación IFC enviada al agente
CREATE TABLE IF NOT EXISTS validations (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT        NOT NULL,
  week         INTEGER     NOT NULL,
  project      TEXT        NOT NULL,
  software     TEXT,
  color        TEXT        NOT NULL,
  score        INTEGER,
  checks       JSONB,
  data         JSONB,
  ifc_filename TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE validations ENABLE ROW LEVEL SECURITY;

-- El agente inserta via service_role (bypassa RLS).
-- Esta política permite que un usuario autenticado via Supabase Auth
-- lea sus propias validaciones (para futura integración).
CREATE POLICY "users_read_own_validations" ON validations
  FOR SELECT USING (auth.uid()::text = user_id);
