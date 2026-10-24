-- 0001_identity: tables owned by the identity module (entities.md; NFR8.3).
-- Forward-only migration (team Deployment practice).

CREATE TABLE businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses (id),
  name text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 100),
  phone text NOT NULL
    CONSTRAINT users_phone_key UNIQUE
    CONSTRAINT users_phone_format CHECK (phone ~ '^[0-9]{6,15}$'),
  role text NOT NULL CONSTRAINT users_role_check CHECK (
    role IN ('owner', 'manager', 'supervisor', 'warehouse_worker', 'sales_rep', 'accountant')
  ),
  password_hash text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX users_business_id_idx ON users (business_id);

CREATE TABLE sessions (
  id_hash char(64) PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  csrf_token text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);

CREATE INDEX sessions_expires_at_idx ON sessions (expires_at);
CREATE INDEX sessions_user_id_idx ON sessions (user_id);
