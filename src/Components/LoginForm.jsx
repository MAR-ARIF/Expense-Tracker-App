import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../slices/authSlice";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

function LoginForm(){
    const {register , handleSubmit} = useForm({
        defaultValues : {
            email : "",
            password : ""
        }
    });
    const [error , setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submit = async(data) => {
        try {
            setError("");
            const loginSession = await authService.login(data);
            if(loginSession){
                const userSession = await authService.getUser();
                if(userSession){
                    dispatch(login(userSession));
                    navigate("/");
                }
            }
            
        } catch (error) {
            setError(error.message);
            
        }
    }
    return(
        <form onSubmit={handleSubmit(submit)} className="w-80 md:w-95 mx-auto bg-white border-2 border-gray-200 shadow-sm rounded-2xl px-6 py-6" >
            <h1 className="text-xl font-bold mt-2">Welcome back</h1>
            <p className="text-gray-600 mb-5">Sign in to your account</p>
            <Input
            label="Email"
            placeholder= "Enter your email"
            {...register("email" , {required: true})}
            />
            <Input 
            label="Password"
            type = "password"
            placeholder="Enter your password"
            {...register("password" , {required : true})}
            />
            <Button 
            type="submit"
            children="Sign In"
            className="w-full"
            />
            {error && (
                <p className="text-red-500 text-sm mt-4">
                    {error}
                </p>
            )}
        
        </form>
    )
}
export default LoginForm