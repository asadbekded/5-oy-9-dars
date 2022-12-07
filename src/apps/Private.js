import { Route, Routes } from "react-router-dom"
import { Header } from "../components/Header/Header"
import { Posts } from "../pages/Posts/Posts"
import { SinglePost } from "../pages/SinglePost/SinglePost"

export const Private = () => {
   return (
     <>
       <Header/>
     
     <Routes>
      <Route path="/" element={<div className="container mt-3"><h3>Welcom to the Home page</h3></div>}/>
      <Route path="/posts" element={<Posts/>}/>
      <Route path="/posts/:id" element={<SinglePost/>}/>
      <Route path="/users" element={<div className="container mt-3"><h3>Welcom to the Users page</h3></div>}/>
     </Routes>
     </>
   )
 }