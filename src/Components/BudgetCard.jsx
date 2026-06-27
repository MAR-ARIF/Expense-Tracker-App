import { useSelector } from "react-redux"
import { selectMonthlyExpense } from "./selectors/expenseSelector";
import Card from "./Card";

function BudgetCard(){
    const transactions = useSelector((state) => state.transaction.transactions);
    const monthlyTotal = selectMonthlyExpense(transactions);
    const budget = useSelector((state) => state.budget.budget);
    const budgetLeft = (budget - monthlyTotal).toFixed(2);
    const isOverBudget = monthlyTotal > budget;
    const budgetUsedPercentage = budget ?  ((monthlyTotal / budget ) * 100).toFixed(1) : 0;

    return(
        <>
            <Card 
            header="Budget Left"
            body={`£${budgetLeft}`}
            footer={ isOverBudget ? "Over Budget" : `${budgetUsedPercentage}% of £${budget} used`}
            className={isOverBudget? "text-red-500" : "text-black"}
            />
        </>
    )
}
export default BudgetCard