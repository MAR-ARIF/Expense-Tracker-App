import { useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavButton from "../Components/navButton";
import Container from "../Container/Container";
import { ChartColumn, LayoutDashboard, List, LogIn, Sparkles, UserPlus } from "lucide-react";
import Logout from "../Components/Logout";

function Header(){
    const authStatus = useSelector((state) => state.auth.status);
    const className = "h-5 w-5"
    const navItems = [
        {name: "Dashboard" , path: "/" , active : true , icon: <LayoutDashboard className={className}/> },
        {name : "Transactions" , path: "/transactions" , active : authStatus , icon : <List className={className}/> },
        {name : "Analytics" , path: "/analytics" , active : authStatus , icon : <ChartColumn className={className}/>},
        {name : "Insights" , path: "/ai-insights" , active : authStatus , icon : <Sparkles className={className}/>},
        {name : "SignUp" , path: "/signup" , active : !authStatus , icon : <UserPlus className={className}/>},
        {name: "Login" , path: "/login" , active : !authStatus , icon: <LogIn className={className}/>}
    ]
    return (
        <header className="w-full bg-white/95 border-b border-gray-200 py-1.5"> 
            <Container>
                <div className="grid grid-cols-3 items-center">
                    
                    <Link to="/"className="flex font-semibold text-xl text-indigo-600 gap-1">
                        <Sparkles /> ExpenseAI
                    </Link>
                    
                    <ul className="flex justify-center items-center text-gray-500 font-semibold gap-2">
                        {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink 
                                    to={item.path}
                                    className={({isActive}) => 
                                        `flex gap-1.5 px-3 py-2 text-sm rounded-xl ${ isActive ? 
                                            `bg-indigo-100 text-indigo-500` : `hover:bg-gray-100`
                                        }` 
                                    }
                                    >
                                        {item.icon} {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                    )}
                    </ul>

                    {authStatus && (
                         <div className="justify-self-end ">
                            <Logout />
                        </div>
                        )
                    }
                </div>
                        
            </Container>
           
           
        
        </header>
    )
}
export default Header