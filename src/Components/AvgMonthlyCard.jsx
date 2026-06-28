import { useSelector } from "react-redux"
import Card from "./Card";

function AvgMonthlyCard(){
    const transactions = useSelector((state) => state.transaction.transactions);

    let total = 0;
    const months = new Set();

    const now = new Date();
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    transactions.forEach((t) => {
       
        const transactionDate = new Date(t.date);
        
        if(transactionDate >= sixMonthsAgo && transactionDate <= now){
            total += Number(t.amount);
            const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth()}`
            months.add(monthKey);
        }
    })
    const averageMonthly = months.size > 0 ?  (total / months.size).toFixed(2) : "0.00";


    return(
        <>
            <Card 
            header="Avg Monthly"
            body={`£${averageMonthly}`}
            footer="last 6 months"
            />
        </>
    )
}
export default AvgMonthlyCard