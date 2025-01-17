export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at: Date;
  login_count: number;
  last_logged_in: Date | null;
  provider: string | null;
  picture?: string
};

export type Balance = {
  id?: Number;
  amount: string;
  user_id: string;
};

export type IncomeSources = {
  id: Number;
  user_id: string;
  name: string;
  income_amt: string;
  frequency: string;
  pay_dates: string[];
};

export type Savings = {
  id?: number;
  user_id: number;
  amount: string;
  created_at: Date;
};

export type Transaction = {
  id?: Number;
  name: string;
  amount: string | Number;
  type: "paycheck" | "expense" | "deposit" | "withdrawl" | "reoccuring";
  created_at: Date;
  user_id: string;
};

export type Reoccuring = {
  id?: Number;
  name: string;
  timeperiod: "weekly" | "monthly" | "yearly" | "bi-annually";
  category:
    | "bills"
    | "entertainment"
    | "food"
    | "health"
    | "housing"
    | "insurance"
    | "personal"
    | "invesments"
    | "transportation"
    | "subscriptions"
    | "misc";
  user_id: string;
};
