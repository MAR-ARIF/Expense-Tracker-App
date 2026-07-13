import { useEffect } from "react";
import AvgMonthlyCard from "../Components/AvgMonthlyCard";
import LargeExpCard from "../Components/LargeExpCard";
import TopCategoryCard from "../Components/TopCategoryCard";
import databaseService from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { setTransaction } from "../slices/transactionSlice";
import Container from "../Container/Container";
import ExpensePieChart from "../Components/ExpensePieChart";
import ExpenseStackedBar from "../Components/ExpenseStackedBar";
import ExpenseAreaChart from "../Components/ExpenseAreaChart";

function AnalyticsPage(){
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transaction.transactions);
    const isNoTransaction = transactions.length === 0;
    useEffect(() => {
        databaseService.getAllExpenses().then((result) => {
            if(result) dispatch(setTransaction(result.documents));
        })

    },[])
    const grouped ={};
    transactions.forEach((t) => {
        grouped[t.category] = (grouped[t.category] || 0) + Number(t.amount);
    })
    const chartData = Object.keys(grouped).map((key) => ({
        category : key,
        amount : grouped[key]
    }
    ))


    const months = [];
    const now = new Date();
    for(let i = 2 ; i >= 0 ; i-- ){
        const date = new Date(now);
        date.setMonth(now.getMonth() - i);

        months.push({
            month : date.getMonth(),
            year : date.getFullYear(),
        })
    }
    const stackedBarGroup = {}
    transactions.forEach((t) => {
        const date = new Date(t.date);
        const tMonth = date.getMonth();
        const tYear = date.getFullYear();

        const isInLast3Months = months.some((m) => m.month == tMonth && m.year == tYear );

        if(isInLast3Months) {
            const key = `${tYear}-${tMonth}`
            
            if(!stackedBarGroup[key]){
                stackedBarGroup[key] = {
                    month : date.toLocaleDateString("default" , { month: "short"})
                }
                
            }
            stackedBarGroup[key][t.category] = (stackedBarGroup[key][t.category] || 0 ) + Number(t.amount);
        
            
        }


    })
    const stackedBarData = Object.values(stackedBarGroup);
    
    return(
        <div className="py-8">
            <Container>
                <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-5">
                    <TopCategoryCard />
                    <AvgMonthlyCard />
                    <LargeExpCard />
                </div>
                <div className="flex gap-1 flex-col">
                    <ExpensePieChart data={chartData} isNoTransaction={isNoTransaction} />
                    <ExpenseStackedBar data={stackedBarData} isNoTransaction={isNoTransaction} />
                    
                </div>

            </Container>
        </div>
    )
}
export default AnalyticsPage