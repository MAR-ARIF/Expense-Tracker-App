import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import NavButton from "../Components/navButton";

function Header(){
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {name: "Dashboard" , path: "/" , active : true },
        {name : "Transactions" , path: "/transactions" , active : authStatus },
        {name : "Analytics" , path: "/analytics" , active : authStatus},
        {name : "Settings" , path: "/settings" , active : authStatus},
        {name : "SignUp" , path: "/signup" , active : !authStatus},
        {name: "Login" , path: "/login" , active : !authStatus}
    ]
    return (
        <div className="flex "> 
            <ul className="flex">
                {navItems.map((item) => 
                    item.active ? (
                        <li key={item.name}>
                            <NavButton onClick={() => navigate(item.path)} >
                                {item.name}
                            </NavButton>
                        </li>
                    ) : null
                )}
            </ul>
        
        </div>
    )
}
export default Header