import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export const SinglePost = () => {

   const [ post, setPost ] = useState();
   const navigate = useNavigate();
   const { id } = useParams();

   useEffect(() => {
      axios
      .get("http://localhost:8080/posts/" + id)
      .then(res => {
         if(res.status === 200){
            setPost(res.data)
         }
      })
      .catch(err => console.log(err))
   }, [])

  return (
   <div className="container">
     <button onClick={() => navigate(-1)} className="btn btn-danger mt-3">Back</button>
     {
      post && (
      <div className="shadow p-3 mb-3 mt-4">
         <h3 className="m-0">{post.title}</h3>
         <p className="m-0 mt-2">{post.body}</p>
      </div>
      )
     }
   </div>
  )
}