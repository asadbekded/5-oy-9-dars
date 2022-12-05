import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { Register } from "../components/Register/Register";

export const Public = () => {
  return (
   <>
     <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<Navigate to="/login" replace={true}/>}/>
     </Routes>
   </>
  )
}
