import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {

   const { me, setMe } = useContext(UserContext);
   const { token, setToken } = useContext(AuthContext);
   const navigate = useNavigate()

   return (
      <header className=" bg-primary shadow">
       <div className="container">
       <nav className="d-flex align-items-center justify-content-between p-3">
         <NavLink className="fs-3 text-light text-decoration-none" to="/">
            Accaunt
         </NavLink>
         <ul className="d-flex p-0 m-0">
            <li className="">
               <NavLink className={({ isActive }) => isActive ? "text-danger text-decoration-none fs-5" : "text-light text-decoration-none fs-5"} to="/">
                  Home
               </NavLink>
            </li>
            <li className="ms-5">
               <NavLink className={({ isActive }) => isActive ? "text-danger text-decoration-none fs-5" : "text-light text-decoration-none fs-5"} to="/posts">
                  Posts
               </NavLink>
            </li>
            <li className="ms-5">
               <NavLink className={({ isActive }) => isActive ? "text-danger text-decoration-none fs-5" : "text-light text-decoration-none fs-5"} to="/users">
                  Users
               </NavLink>
            </li>
         </ul>
         <button onClick={() => {
            setMe('')
            setToken('')
            navigate('/')
         }} className="btn btn-warning rounded-circle text-light">
            {me.firstname.charAt(0) + me.lastname.charAt(0)}
         </button>
      </nav>
       </div>
      </header>
      )
   }
   