export type User = {
    id: Number | null,
    email: string,
    password: string,
    name: string,
};

export type Cashflow = {
    id: Number | null,
    savings: string,
    income: string,
    user_id: Number,
};

export type Transaction = {
    id: Number | null,
    name: string,
    amount: Number,
    date: string | null,
    user_id: Number,
};

