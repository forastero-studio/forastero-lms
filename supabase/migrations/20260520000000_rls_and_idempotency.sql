-- ============================================================
-- RLS + Idempotencia — ejecutar en Supabase SQL Editor
-- ============================================================
-- Arquitectura: Clerk (auth) + Supabase (DB).
-- Todas las queries del LMS usan service_role (bypassa RLS).
-- El anon key queda expuesto en el cliente pero con RLS activo
-- y sin políticas permisivas, no puede leer ninguna tabla.
-- ============================================================

-- ── RLS: users ──────────────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- Sin políticas → anon key no puede leer ni escribir.
-- service_role bypassa RLS: el servidor sigue funcionando.

-- ── RLS: purchases ──────────────────────────────────────────
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- ── RLS: progress ───────────────────────────────────────────
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- ── Idempotencia: UNIQUE en lemon_order_id ──────────────────
-- Si Lemon Squeezy reenvía el mismo evento, el INSERT falla con
-- código 23505 (duplicate key). El webhook lo detecta y devuelve
-- 200 sin duplicar la compra.

ALTER TABLE purchases
  ADD CONSTRAINT purchases_lemon_order_id_key UNIQUE (lemon_order_id);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
  ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

  ALTER TABLE purchases
    ADD CONSTRAINT purchases_lemon_order_id_key UNIQUE (lemon_order_id);
