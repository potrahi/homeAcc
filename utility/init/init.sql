CREATE TABLE IF NOT EXISTS utilities_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS utilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES utilities_types(id)
);
CREATE TABLE IF NOT EXISTS utilities_prices (
    id SERIAL PRIMARY KEY,
    util_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (util_id) REFERENCES utilities(id)
);
CREATE TABLE IF NOT EXISTS utilities_deposit (
    id SERIAL PRIMARY KEY,
    util_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (util_id) REFERENCES utilities(id)
);
CREATE TABLE IF NOT EXISTS utilities_consumption (
    id SERIAL PRIMARY KEY,
    util_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    period DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (util_id) REFERENCES utilities(id)
);
CREATE INDEX IF NOT EXISTS idx_utilities_prices_util_id ON utilities_prices(util_id);
CREATE INDEX IF NOT EXISTS idx_utilities_deposit_util_id ON utilities_deposit(util_id);
CREATE INDEX IF NOT EXISTS idx_utilities_consumption_util_id ON utilities_consumption(util_id);