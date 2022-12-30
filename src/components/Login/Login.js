import { Formik,Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import axios from "axios";
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

export const Login = () => {

  const { token, setToken } = useContext(AuthContext);
  const { me, setMe } = useContext(UserContext);

  const navigate = useNavigate()

  const initialValues =  {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  }
  const onSubmit = (values) => {

    axios.post('http://localhost:8080/login', 
    {
      email: values.email,
      password: values.password,
    }
    )  
    .then((res) => {
      if(res.status === 200) {
        setToken(res.data.accessToken)
        setMe(res.data.user)
        navigate('/')
      }
    })
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required !!"),
    password: Yup.string().min(4,'Password must be longer 4 characters').max(8, "Password must be lost 8 characters").required("Required !!")
  })

  return (
    <div className="w-50 mx-auto shadow p-5 mt-5">
      <h1 className="text-center text-primary">Login</h1>
      <p className="mt-4">Do you not have account? <Link to='/register'>Sign up</Link></p>
       
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            
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
