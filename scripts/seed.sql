-- initial seeding for database
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
)

 CREATE TABLE IF NOT EXISTS cashflows (
    id SERIAL PRIMARY KEY,
    savings NUMERIC,
    income NUMERIC,
    user_id INTEGER REFERENCES users
)

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    amount NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users
)