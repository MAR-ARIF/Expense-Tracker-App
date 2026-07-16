import { useMemo } from "react";
import { useSelector } from "react-redux"
import Card from "./Card";
import { selectMonthlyExpense } from "./selectors/expenseSelector";

function LatestMonthCard(){
    const transactions = useSelector((state) => state.transaction.transactions);
    const monthlyExpense = Number(selectMonthlyExpense(transactions)).toFixed(2);
    
    

    return(
        <>
            <Card 
            header="Total spent"
            body={`£${monthlyExpense}`}
            footer="this month"
            />
        </>
    )
}
export default LatestMonthCard