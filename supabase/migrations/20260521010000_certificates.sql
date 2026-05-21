-- ============================================================
-- Certificates table
-- NOTA: Crear el bucket 'certificates' (público) en el dashboard
-- de Supabase Storage antes de activar el endpoint emit-certificate.
-- ============================================================

-- Crear bucket en storage (falla silenciosamente si ya existe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Política de storage: lectura pública del bucket
CREATE POLICY "public_read_certificates" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificates');

-- Tabla certificates: un registro por certificado emitido
CREATE TABLE IF NOT EXISTS certificates (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         TEXT        NOT NULL,
  student_name    TEXT        NOT NULL,
  project_name    TEXT        NOT NULL,
  project_slug    TEXT        NOT NULL,
  software        TEXT        NOT NULL,
  cohort_number   TEXT        NOT NULL DEFAULT 'C00',
  start_date      DATE        NOT NULL,
  end_date        DATE        NOT NULL,
  emit_date       TIMESTAMPTZ DEFAULT NOW(),
  pdf_url         TEXT,
  revoked         BOOLEAN     DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede verificar un certificado no revocado (página /verify/[id])
CREATE POLICY "public_verify_certificates" ON certificates
  FOR SELECT USING (NOT revoked);

-- Índice para lookup rápido por user_id
CREATE INDEX IF NOT EXISTS certificates_user_id_idx ON certificates (user_id);
