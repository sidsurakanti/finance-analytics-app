import { type Cashflow } from "@lib/definitions";

type Actions =
  | { type: "update_savings"; savings: string }
  | { type: "update_income"; income: string }

// reducer for when user wants to update their cashflows
export function cashflowReducer(state: Cashflow, action: Actions) {
  switch (action.type) {
    case "update_savings": {
      const newCashflows = { ...state, savings: action.savings };
      console.log(newCashflows);
      return newCashflows;
    }
    case "update_income": {
      const newCashflows = { ...state, income: action.income };
      console.log(newCashflows);
      return newCashflows;
    }
  }
}
