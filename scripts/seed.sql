-- creating tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, -- auto-incrementing id
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_paycheck_sync TIMESTAMP,
    last_logged_in TIMESTAMP,
    login_count INTEGER DEFAULT 0,
    provider VARCHAR(255);
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
    name VARCHAR(255) NOT NULL,
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
    name VARCHAR(255) NOT NULL,
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
    (2, 'Job 1', 6200, 'semi-monthly', '{1, 15}'),
    (2, 'Job 2', 9000, 'monthly', '{8, 24}');


INSERT INTO reoccuring 
(name, amount, timeperiod, user_id)
VALUES 
    ('Mortgage', 'monthly', 'housing', 2),
    ('Netflix', 'monthly', 'subscriptions', 2),
    ('Gym', 'monthly', 'health' 2),
    ('Electricity Bill', 'monthly', 'bills' 2);

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
VALUES (888.88, 2);

INSERT INTO savings
(amount, user_id)
VALUES (888.88, 2);

-- fetch user by email
SELECT * FROM users
WHERE email='johndoe@gmail.com'

-- fetch someone's last 5 transactions
SELECT * FROM transactions
WHERE user_id=1
ORDER BY created_at DESC
LIMIT 5;

-- find all the the transactions that happened this month
SELECT * FROM transactions
WHERE (user_id=1 AND EXTRACT(MONTH from created_at) = EXTRACT(MONTH from CURRENT_DATE AND (type in ('expense', 'reoccuring'))));



-- scrap
UPDATE users
SET 
    last_paycheck_sync = '2025-1-10'
WHERE id = 2;

SELECT reoccuring.category, transactions.name, transactions.amount
FROM reoccuring
INNER JOIN transactions
ON transactions.name = reoccuring.name AND transactions.user_id = reoccuring.user_id
WHERE reoccuring.user_id = 2;

SELECT reoccuring.category, transactions.name, SUM(transactions.amount) as total_amount
FROM reoccuring
INNER JOIN transactions
ON transactions.name = reoccuring.name AND transactions.user_id = reoccuring.user_id
WHERE reoccuring.user_id = 2
GROUP BY reoccuring.category, transactions.name;

SELECT reoccuring.category, SUM(transactions.amount) as total_amount
FROM reoccuring
INNER JOIN transactions
ON transactions.name = reoccuring.name AND transactions.user_id = reoccuring.user_id
WHERE reoccuring.user_id = 2
GROUP BY reoccuring.category;

SELECT type, SUM(amount) as total_amount
FROM transactions
WHERE user_id = 2
GROUP BY type;

INSERT INTO transactions
(name, amount, type, user_id, created_at)
VALUES ('missed paycheck', 333, 'paycheck', 2, '2025-01-01 00:00:00');