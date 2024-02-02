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
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users
)


-- insert placeholder data
INSERT INTO users 
(email, password, name)
VALUES 
    ('janedoe@gmail.com', 'abc456', 'Jane Doe'),
    ('johndoe@gmail.com', 'abc123', 'John Doe');

INSERT INTO cashflows
(savings, income, user_id)
VALUES 
    (73000, 6200, 2),
    (90000, 9000, 1);

INSERT INTO transactions
(name, amount, user_id)
VALUES 
    ('Steam', 24.49, 2),
    ('Apple', 124.99, 1),
    ('Spotify', 16.99, 2),
    ('T-Mobile', 400.24, 2),
    ('Tesla', 11.99, 2);


-- fetch user by email
SELECT * FROM users
WHERE email='johndoe@gmail.com'

-- fetch john's cashflow
SELECT * FROM cashflows
WHERE user_id=1;

SELECT * FROM transactions
WHERE user_id=1
ORDER BY created_at DESC
LIMIT 5;

-- find all the the transactions that happened this month
SELECT * FROM transactions
WHERE (user_id=1 AND EXTRACT(MONTH from created_at) = EXTRACT(MONTH from CURRENT_DATE));