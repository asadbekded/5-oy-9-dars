import { Formik,Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import  axios  from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import * as Yup from 'yup';

export const Register = () => {

  const { setToken } = useContext(AuthContext);
  const { setMe } = useContext(UserContext);

  const navigate = useNavigate()


  const initialValues =  {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  }
  const onSubmit = (values) => {

    axios.post('http://localhost:8080/register', 
    {
      firstname: values.first_name,
      lastname: values.last_name,
      email: values.email,
      password: values.password,
    }
    )  
    .then((res) => {
      if(res.status === 201) {
        setToken(res.data.accessToken)
        setMe(res.data.user)
        navigate('/')
      }
    })
  }

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required !!"),
    last_name: Yup.string().required("Required !!"),
    email: Yup.string().email("Invalid email address").required("Required !!"),
    password: Yup.string().min(4,'Password must be longer 4 characters').max(8, "Password must be lost 8 characters").required("Required !!")
  })
  
  return (
    <div className="w-50 mx-auto shadow p-5 mt-5">
      <h1 className="text-center text-primary">Register</h1>
      <p className="mt-4">Do you have account? <Link to='/login'>Sign in</Link></p>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>

            <Field className="form-control " name="first_name"  type="text"  placeholder="First name"/>
            <ErrorMessage name="first_name" component='div' className="text-danger"/>

            <Field className="form-control mt-3" name="last_name"  type="text" placeholder="Last name"/>
            <ErrorMessage name="last_name" component='div' className="text-danger"/>

            <Field className="form-control mt-3" name="email"  type="email" placeholder="Email"/>
            <ErrorMessage name="email" component='div' className="text-danger"/>

            <Field className="form-control mt-3" name="password"  type="password" placeholder="Password"/>
            <ErrorMessage name="password" component='div' className="text-danger"/>

            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </Form>
      </Formik>
    </div>
  )
}















// import { useRef, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Input } from "../Input/Input";
// import  axios  from 'axios';
// import { AuthContext } from "../../context/AuthContext";
// import { UserContext } from "../../context/UserContext";

// export const Register = () => {

//   const { setToken } = useContext(AuthContext);
//   const { setMe } = useContext(UserContext);

//   const navigate = useNavigate()

//   const firstRef = useRef()
//   const lastRef = useRef()
//   const emailRef = useRef()
//   const passwordRef = useRef()

//   const handleFormSub = (evt) => {
//     evt.preventDefault();

//     axios.post('http://localhost:8080/register', {
//       firstname: firstRef.current.value,
//       lastname: lastRef.current.value,
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     })
//     .then((res) => {
//       if(res.status === 201) {
//         setToken(res.data.accessToken)
//         setMe(res.data.user)
//         navigate('/')
//       }
//     })
//     .catch((err) => console.log(err));
//   };

//   return (
//     <div className="w-50 mx-auto shadow p-5 mt-5">
//       <h1 className="text-center text-primary">Register</h1>
//       <p className="mt-4">Do you have account? <Link to='/login'>Sign in</Link></p>

//       <form onSubmit={handleFormSub} method="post">
//         <Input ref={firstRef} type="text"  placeholder="First name"/>
//         <Input ref={lastRef} type="text" placeholder="Last name"/>
//         <Input ref={emailRef} type="email" placeholder="Email"/>
//         <Input ref={passwordRef} type="password" placeholder="Password"/>
//         <button type="submit" className="btn btn-primary">Submit</button>
//      </form>
//     </div>
//   )
// }