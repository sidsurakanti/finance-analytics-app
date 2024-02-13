export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export type Cashflow = {
  id?: Number;
  savings: string;
  income: string;
  user_id: string;
};

export type Transaction = {
  id?: Number;
  name: string;
  amount: string | Number;
  created_at: Date;
  user_id: string;
};

export type Reoccuring = {
  id?: Number;
  name: string;
  amount: string | Number;
  timeperiod: "weekly" | "monthly" | "yearly";
  user_id: string;
};
