import { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Input/Input";
import  axios  from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

export const Register = () => {

  const { token, setToken } = useContext(AuthContext);
  const { me, setMe } = useContext(UserContext);

  const navigate = useNavigate()

  const firstRef = useRef()
  const lastRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleFormSub = (evt) => {
    evt.preventDefault();

    axios.post('http://localhost:8080/register', {
      firstname: firstRef.current.value,
      lastname: lastRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
    .then((res) => {
      if(res.status === 201) {
        setToken(res.data.accessToken)
        setMe(res.data.user)
        navigate('/')
      }
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="w-50 mx-auto shadow p-5 mt-5">
      <h1 className="text-center text-primary">Register</h1>
      <p className="mt-4">Do you have account? <Link to='/login'>Sign in</Link></p>

      <form onSubmit={handleFormSub} method="post">
        <Input ref={firstRef} type="text"  placeholder="First name"/>
        <Input ref={lastRef} type="text" placeholder="Last name"/>
        <Input ref={emailRef} type="email" placeholder="Email"/>
        <Input ref={passwordRef} type="password" placeholder="Password"/>
        <button type="submit" className="btn btn-primary">Submit</button>
     </form>
    </div>
  )
}
