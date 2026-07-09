import { useDispatch } from "react-redux"
import authService from "../appwrite/auth";
import { logout } from "../slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout(){
    const [error , setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        setError("");
        try {
            await authService.logout();
            dispatch(logout());
            navigate("/login")
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return(
        <button className="bg-red-500 text-white px-4 py-1 rounded-xl active:scale-98 hover:scale-105 cursor-pointer font-semibold duration-200 transition-all" onClick={handleLogout}>
            Log out
        </button> 
    )
}
export default Logout