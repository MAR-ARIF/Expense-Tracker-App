import { useSelector } from "react-redux"
import Card from "./Card";

function LargeExpCard(){
    const transactions = useSelector((state) => state.transaction.transactions);

    let maxAmount = 0;
    let largestTran = null;

    transactions.forEach((t) => {
        if(Number(t.amount) > maxAmount){
            maxAmount = Number(t.amount);
            largestTran = t
        }
    }) 
    if(!largestTran){
        return(
            <>
                <Card
                header="Largest Expense"
                body="£0"
                footer="No expense yet"
                />


            </>
        )
    }
    const date = new Date(largestTran.date).toLocaleDateString("en-GB" , {
        day : "numeric",
        month : "short",
        year : "numeric"
    })
    return(
        <>
            <Card 
            header="Largest Expense"
            body={`£${largestTran.amount}`}
            footer={`For ${largestTran.description} on ${date}`}

            />
        
        </>
    )
}
export default LargeExpCard