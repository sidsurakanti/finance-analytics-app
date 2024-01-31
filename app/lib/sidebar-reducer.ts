import { Cashflow } from "@/app/lib/definitions"
import { updateCashflows } from "@/app/lib/data";

// type Action = 
//     | { type: "income_change", income: string}
//     | { type: "savings_change", savings: string}
//     | { type: "submit"};

// TODO: add action type
export default function cashflowReducer (cashflowObj: Cashflow, action: any) {
    switch (action.type) {
        case 'change': {
            const newCashflow = {...cashflowObj, income: action.income, savings: action.savings};
            console.log('Updated cashflow.');
            return newCashflow;
        };
        case 'submit': {
            updateCashflows(cashflowObj);
            return cashflowObj;
        };
        default: {
            console.log("Failed to perform action");
        };
    }
}