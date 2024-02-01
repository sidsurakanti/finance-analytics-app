export type User = {
  id?: Number;
  email: string;
  password: string;
  name: string;
};

export type Cashflow = {
  id?: Number;
  savings: string;
  income: string;
  user_id: Number;
};

export type Transaction = {
  id?: Number;
  name: string;
  amount: Number;
  date: string | null;
  user_id: Number;
};
