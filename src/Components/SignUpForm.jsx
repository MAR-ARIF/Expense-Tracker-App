import { useForm } from "react-hook-form"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { login } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

function SignUpForm(){
    const {register , handleSubmit , watch , formState: {errors}} = useForm({
        defaultValues : {
            name: "",
            email : "",
            password: ""
        }
    }) 
    const [error , setError] = useState("");
    const password = watch("password");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submit = async(data) => {
        try {
            setError("");
            const {confirmPassword , ...userData} = data;
            const user = await authService.createUser(userData);
            if(user) {
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
        <form onSubmit={handleSubmit(submit)} className="w-80 bg-white md:w-95 mx-auto border-2 border-gray-200 shadow-sm rounded-2xl px-6 py-6" >
            <h1 className="text-xl font-bold mt-2">Create account</h1>
            <p className="text-gray-600 mb-5">Start tracking your expenses</p>
            <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name",{required : true})}

            />
             <Input
            label="Email"
            placeholder="Enter your email"
            {...register("email",{required : true})}

            />
             <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password" , {required : "Password is required"})}

            />
             <Input
            label="Confirm Password"
            placeholder="Retype the password"
            type="password"
            {...register("confirmPassword" , {
                required: "Please confirm your password",
                validate : (value) => 
                    value === password || "Passwords do not match"
            })}

            />
            {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                </p>
            )}
            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}
            <Button 
            type="submit"
            children="Create Account"
            className="w-full"
            />
            
        
        </form>
    )
}
export default SignUpForm;