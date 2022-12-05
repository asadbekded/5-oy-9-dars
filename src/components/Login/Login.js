import axios from "axios";
import { useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { Input } from "../Input/Input"

export const Login = () => {

  const { token, setToken } = useContext(AuthContext);
  const { me, setMe } = useContext(UserContext);

  const navigate = useNavigate()

   const emailRef = useRef()
   const passwordRef = useRef()

   const handleFormSub = (evt) => {
      evt.preventDefault();

      axios.post('http://localhost:8080/login', {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
    .then((res) => {
      if(res.status === 200) {
        setToken(res.data.accessToken)
        setMe(res.data.user)
        navigate('/')
      }
    })
    .catch((err) => console.log(err));
   } 

  return (
    <div className="w-50 mx-auto shadow p-5 mt-5">
      <h1 className="text-center text-primary">Login</h1>
      <p className="mt-4">Do you not have account? <Link to='/register'>Sign up</Link></p>
       
      <form onSubmit={handleFormSub} method="post">
        <Input ref={emailRef} type="email" placeholder="Email"/>
        <Input ref={passwordRef} type="password" placeholder="Password"/>
        <button type="submit" className="btn btn-primary">Submit</button>
     </form>
    </div>
  )
}
