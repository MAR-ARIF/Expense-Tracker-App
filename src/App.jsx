
import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header/Header"
import { useEffect, useState } from "react"
import authService from "./appwrite/auth"
import { useDispatch } from "react-redux"
import { login, logout } from "./slices/authSlice"





function App() {
  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const isSignUpOrLogInPage = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    authService.getUser().then((userData) => {
      if (userData){
        dispatch(login(userData))
      } else {
        dispatch(logout());
      }
    })
    .finally(() => {setLoading(false)})
  } , [])
 

  return !loading ?  (
    <div className="bg-slate-100 min-h-screen">
      
      {!isSignUpOrLogInPage && <Header /> }
      <main className="pt-7 pb-15 md:pb-0">
        <Outlet />

      </main>
     
   
    </div>
  ) : null
}

export default App
