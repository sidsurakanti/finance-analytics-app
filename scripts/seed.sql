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

CREATE TABLE IF NOT EXISTS income_sources (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) UNIQUE NOT NULL,
    income_amt NUMERIC(10, 2) NOT NULL,
    frequency VARCHAR(255) NOT NULL,
    pay_dates text[]
)

CREATE TABLE IF NOT EXISTS savings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

-- some placeholder data if needed
INSERT INTO income_sources
(user_id, name, income_amt, frequency, pay_dates)
VALUES 
    (2, 'job1', 6200, 'bi-weekly', '{1, 15}'),
    (2, 'job2', 9000, 'bi-weekly', '{1, 15}');


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

--
ALTER TABLE cashflows
ADD COLUMN IF NOT EXISTS last_updated date;

ALTER TABLE cashflows
ALTER COLUMN income TYPE int

ALTER TABLE users
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS last_logged_in TIMESTAMP;

ALTER TABLE users
ADD COLUMN IF NOT EXISTS last_paycheck_sync TIMESTAMP;

UPDATE cashflows
SET 
    income_sources = '{"job1", "job2"}',
    frequency = 'bi-weekly',
    pay_dates = '{1, 15}',
    last_updated = '2024-12-05'
WHERE user_id = 2;

SELECT * FROM cashflows
WHERE user_id = 2;

UPDATE income_sources
SET pay_dates = '{1, 18}',
WHERE name = 'job1';

UPDATE income_sources
SET name = "Job 1"
WHERE name = 'job1';

UPDATE income_sources
SET frequency = "semi-monthly"
WHERE name = 'Job 1';

UPDATE income_sources
SET 
    frequency = "monthly"
    pay_dates = '{1}'
WHERE name = 'Job 2';

UPDATE users
SET 
    last_paycheck_sync = '2024-12-05'
WHERE id = 2;

CREATE INDEX idx_transactions_ ON transactions(created_at, amount);