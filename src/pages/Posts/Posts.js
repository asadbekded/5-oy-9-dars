import { useEffect, useRef, useState } from "react";
import  axios  from 'axios';
import { Modal } from "../../components/Modal/Modal";
import { Input } from "../../components/Input/Input";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const Posts = () => {

   const { me } = useContext(UserContext);

   const titleRef = useRef();
   const bodyRef = useRef();

   const [ modal, setModal ] = useState(false);
   const [ posts, setPosts ] = useState({});


   useEffect(() =>{
      axios.get("http://localhost:8080/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
   }, [])

   const handleAddPost = (evt) => {
      evt.preventDefault()

      axios.post("http://localhost:8080/posts", {
         userId: me.id,
         title: titleRef.current.value,
         body: bodyRef.current.value,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
   }

  return (
    <div className="container">
      <h3 className="text-center my-3">Posts page</h3>
      <button onClick={() => setModal(true)} className="btn btn-primary">+ Create post</button>

      {
         posts.length ? <ul className="p-0 m-0 mt-4">
         {
            posts.map((el) =>(
            <li key={el.title} className="d-flex align-items-center w-50 shadow p-3 mb-2">
               <h4>{el.title}</h4>
               <h5 className="ms-4">{el.body}</h5>
            </li>))
         }
         </ul>: <h2>Loading...</h2>
      }

      {modal && <Modal modal={modal} setModal={setModal} >
         <form onSubmit={handleAddPost} className="mt-4">
            <Input ref={titleRef} type="text" placeholder="Title"/>
            <Input ref={bodyRef} type="text" placeholder="Body"/>
            <button className="btn btn-primary">POST</button>
         </form>
      </Modal>}
    </div>
  )
}
