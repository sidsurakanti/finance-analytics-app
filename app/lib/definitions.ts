export type User = {
  id: Number;
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
  amount: string | Number;
  created_at: Date;
  user_id: Number;
};
