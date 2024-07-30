-- Create the user table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL
);
-- Create the spendings table
CREATE TABLE spendings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION
);
-- Table to store global settings, including the common balance and other configuration options
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    currency VARCHAR(10) NOT NULL DEFAULT 'CZK',
    monthly_budget NUMERIC(10, 2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create indexes for spending table
CREATE INDEX idx_spendings_user_id_date ON spendings(user_id, created_at);
CREATE INDEX idx_spendings_date_created ON spendings(created_at);

INSERT INTO settings (monthly_budget) VALUES (0.00);