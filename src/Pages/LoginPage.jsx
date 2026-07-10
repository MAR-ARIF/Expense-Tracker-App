import { Sparkles } from "lucide-react";
import LoginForm from "../Components/LoginForm";
import Logout from "../Components/Logout";
import Container from "../Container/Container";
import { Link } from "react-router-dom";

function LoginPage(){
    return(
        <div className="min-h-screen py-0 flex justify-center items-center">
            <Container>
                <h1 className="flex items-center justify-center mb-8 font-bold text-2xl  gap-1">
                    <Sparkles className="text-indigo-500"/>
                    ExpenseAI
                    
                    </h1>
                <LoginForm />
                
                <p className="text-center mt-4 text-gray-600">Don't have an account? 
                    <Link className="text-indigo-500 font-semibold ml-2 underline"
                     to="/signup"
                    >
                    
                    Sign Up
                    
                    </Link>
                    
                    
                </p>
                
             
              
            </Container>
        </div>
    )
}
export default LoginPage