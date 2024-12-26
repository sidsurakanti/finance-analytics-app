-- creating tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, -- auto-incrementing id
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
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
    type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users
)

CREATE TABLE IF NOT EXISTS reoccuring (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    timeperiod VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users
)

CREATE TABLE IF NOT EXISTS balance (
    id SERIAL PRIMARY KEY,
    amount NUMERIC NOT NULL,
    user_id INTEGER REFERENCES users
)



-- some placeholder data if needed
INSERT INTO cashflows
(savings, income, user_id)
VALUES 
    (73000, 6200, 2),
    (90000, 9000, 1);

INSERT INTO reoccuring 
(name, amount, timeperiod, user_id)
VALUES 
    ('Mortgage', 'monthly', 'housing', 2),
    ('Netflix', 'monthly', 'subscriptions', 2),
    ('Gym', 'monthly', 'health' 2),
    ('Electricity', 'monthly', 'bills' 2);

INSERT INTO transactions
(name, amount, type, user_id)
VALUES 
    ('Steam', 24.49, 'expense', 2),
    ('Apple', 124.99, 'expense', 1),
    ('Spotify', 16.99, 'expense', 2),
    ('T-Mobile', 400.24 'expense', 2),
    ('Tesla', 11.99, 'expense', 2);

INSERT INTO balance 
(amount, user_id) 
VALUES (3018.63, 2);

-- fetch user by email
SELECT * FROM users
WHERE email='johndoe@gmail.com'

-- fetch someone's cashflow
SELECT * FROM cashflows
WHERE user_id=1;

-- fetch someone's last 5 transactions
SELECT * FROM transactions
WHERE user_id=1
ORDER BY created_at DESC
LIMIT 5;

-- find all the the transactions that happened this month
SELECT * FROM transactions
WHERE (user_id=1 AND EXTRACT(MONTH from created_at) = EXTRACT(MONTH from CURRENT_DATE AND (type in ('expense', 'reoccuring'))));

---
ALTER TABLE cashflows
ADD COLUMN IF NOT EXISTS income_sources text[];

ALTER TABLE cashflows
ADD COLUMN IF NOT EXISTS frequency VARCHAR(255);

ALTER TABLE cashflows
ADD COLUMN IF NOT EXISTS pay_dates text[];

ALTER TABLE cashflows
ADD COLUMN IF NOT EXISTS last_updated date;

ALTER TABLE cashflows
ALTER COLUMN income TYPE int[]


UPDATE cashflows
SET 
    income_sources = '{"job1", "job2"}',
    frequency = 'bi-weekly',
    pay_dates = '{1, 15}',
    last_updated = '2024-12-05'
WHERE user_id = 2;

SELECT * FROM cashflows
WHERE user_id = 2;