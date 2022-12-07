import { useEffect, useRef, useState } from "react";
import  axios  from 'axios';
import { Modal } from "../../components/Modal/Modal";
import { Input } from "../../components/Input/Input";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { PostCard } from "../../components/PostCard/PostCard";

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
   }, [posts])

   const handleAddPost = (evt) => {
      evt.preventDefault()

      axios.post("http://localhost:8080/posts", {
         userId: me.id,
         title: titleRef.current.value,
         body: bodyRef.current.value,
      })
      .then(res => {
         if(res.status === 201){
            setModal(false);
         }
      })
      .catch(err => console.log(err))
   }

  return (
    <div className="container">
      <h3 className="text-center my-3">Posts page</h3>
      <button onClick={() => setModal(true)} className="btn btn-primary">+ Create post</button>

      {
         posts.length ? <ul className="p-0 m-0 mt-4">
         {
            posts.map((item) =>(
               <PostCard key={item.id} item={item} />
            ))
         }
         </ul>: <h2>Loading...</h2>
      }

      {modal && (<Modal modal={modal} setModal={setModal} title='Add'>
         <form onSubmit={handleAddPost} className="mt-4">
            <Input ref={titleRef} type="text" placeholder="Title"/>
            <Input ref={bodyRef} type="text" placeholder="Body"/>
            <button className="btn btn-primary">POST</button>
         </form>
      </Modal>)}
    </div>
  )
}
