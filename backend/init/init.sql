-- Create the user table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create the spending table
CREATE TABLE spending (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION
);
-- Create the balance table
CREATE TABLE balance (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create indexes for spending table
CREATE INDEX idx_spending_user_id_date ON spending(user_id, created_at);
CREATE INDEX idx_spending_date_created ON spending(created_at);
-- Create indexes for balance table
CREATE INDEX idx_balance_date_created ON balance(created_at);
CREATE INDEX idx_balance_date_updated ON balance(updated_at);