
import { useSelector } from "react-redux";
import TransactionList from "../Components/TransactionList";
import Container from "../Container/Container";
import { useState } from "react";


function TransactionPage(){
    const [selected , setSelected] = useState("All");
    const transactions = useSelector((state) => state.transaction.transactions);
    const categories = ["All", "Foods" , "Grocery" , "Transportation", "Shopping" , "Utilities" , "Entertainment" , "Health"]
    
    return(
        <Container>
            <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
            <div className="flex gap-3 ">
                {categories.map((c) => (
                    <div key={c}>
                       <button 
                       onClick={() => setSelected(c)}
                       className={`border border-gray-200 px-4 py-0.5 rounded-xl text-md font-semibold ${selected == c ? "bg-indigo-500 text-white" : "bg-slate-50 hover:bg-slate-100"} `}
                       >
                            {c}
                       </button>
                    </div>
                ))}


            </div>
            <TransactionList hideHeader={true} category={selected} />
            
            
        </Container>
    )
}
export default TransactionPage