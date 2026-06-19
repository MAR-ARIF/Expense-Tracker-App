import { useDispatch, useSelector } from "react-redux"
import databaseService from "../appwrite/database";
import { addTransaction } from "../slices/transactionSlice";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Select from "./Select";
import Button from "./Button";

function AddExpenseForm(){

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const {register , handleSubmit} = useForm({
        defaultValues : {
            description : "",
            amount: "",
            date: "",
            category:""

        }
    })
    const submit = async(data) =>{
        try {
            const transaction = await databaseService.createExpense({...data ,amount : Number(data.amount), userId : userData.$id })
            console.log("transaction", transaction);
            if(transaction){
                dispatch(addTransaction(transaction));
            }
            
        } catch (error) {
            console.log(error);
            
        }

    }
    return(
        <form onSubmit={handleSubmit(submit)} className="w-80 md:w-120 mx-auto border-2 border-gray-200 shadow-sm rounded-2xl px-6 py-6">
            <Input label="Name" placeholder="e.g. Grocery run" {...register("description", {required: true})}  />
            <Select label="Category" placeholder="Select a category..."
            options={["Grocery" , "Transportation" , "Foods" , "Shopping" , "Utilities" , "Entertainment" , "Health"]} 
            {...register("category", {required:true})}
            />
            <Input label="Amount" placeholder="0.00" {...register("amount" , {required: true})}/>
            <Input label="Date" placeholder="e.g. 1st January" {...register("date" , {required: true})}/>
            <Button type="submit" children="Add Expense" className="bg-indigo-500 text-white text-md w-full border-none rounded-xl mt-4 hover:scale-102 active:scale-100 hover:shadow-md transition-all duration-200 font-semibold" />


        </form>
    )
}
export default AddExpenseForm