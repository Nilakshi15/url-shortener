CREATE TABLE IF NOT EXISTS urls (
    id BIGSERIAL PRIMARY KEY,

    original_url TEXT NOT NULL,

    short_code VARCHAR(20) UNIQUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    expires_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_short_code
ON urls(short_code);