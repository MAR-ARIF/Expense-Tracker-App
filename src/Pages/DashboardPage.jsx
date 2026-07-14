import { useEffect, useState } from "react";
import Button from "../Components/Button";
import TransactionList from "../Components/TransactionList";
import Container from "../Container/Container";
import AddExpenseForm from "../Components/AddExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import ExpenseAreaChart from "../Components/ExpenseAreaChart";
import LatestMonthCard from "../Components/LatestMonthCard";
import BudgetCard from "../Components/BudgetCard";
import NumOfTranCard from "../Components/NumOfTranCard";
import BudgetInput from "../Components/BudgetInput";
import authService from "../appwrite/auth";
import { setName } from "../slices/authSlice";

function DashboardPage(){
    const [isOpen , setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const click = () => {
        setIsOpen(true);
        
    }
    useEffect(() => {
        authService.getUser().then((user) => {
            if(user) dispatch(setName(user.name));
        })
    } ,[])
    const transactions = useSelector( (state) => state.transaction.transactions);
    const userName = useSelector((state) => state.auth.userName);
    
    
    const grouped = {};
    transactions.forEach((t) => {
        grouped[t.category] = (grouped[t.category] || 0) + Number(t.amount);
    })
    const chartData = Object.keys(grouped).map((key) => ({
        category : key,
        amount : grouped[key]
    }))
    const isNoTransaction = transactions.length === 0;
    return (
        <div className="py-8">
            <Container>
            
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                       {isNoTransaction ?<>Welcome, <span className="text-indigo-600">{userName}</span></>
                       :
                        <>Welcome back, <span className="text-indigo-600">{userName}</span></>} 
                    </h1>

                    {isNoTransaction ? <p className="mt-2 text-gray-500">
                           Add your first transaction to unlock analytics and AI insights.
                        </p>
                        : 
                        
                        <p className="mt-2 text-gray-500">
                            Here's a quick overview of your expenses and AI-powered financial insights.
                        </p>
                    }
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-5">
                    <LatestMonthCard />
                    <BudgetCard />
                    <NumOfTranCard />
                </div>
                <ExpenseAreaChart  data={chartData} isNoTransaction={isNoTransaction}/>
                <TransactionList />
                <div className="flex flex-col md:flex-row items-center justify-between  gap-4">
                    <div className="flex-1 mt-4">
                        <Button onClick={click} children="+ Add Transaction" className="w-full py-4 mx-auto px-10 text-xl" />
                    </div>
                    <div className="flex-1">
                        <BudgetInput />
                    </div>
                </div>
                
                
                {isOpen && <div
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <AddExpenseForm onSuccess={() => setIsOpen(false)} />
                    </div>
                    
                    </div>}

            
                
            </Container>
        
        </div>
    )
}
export default DashboardPage