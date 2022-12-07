import { Modal } from "../Modal/Modal";
import { useContext, useRef, useState } from "react";
import { Input } from "../Input/Input";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export const PostCard = ({ item }) => {
   
   const [ editModal, setEditModal] = useState(false);
   const { me } = useContext(UserContext);
   const titleRef = useRef();
   const bodyRef = useRef();

   const handleEditPost = (evt) => {
      evt.preventDefault()
      axios
      .put("http://localhost:8080/posts/" + item.id, {
         userId: me.id,
         title: titleRef.current.value,
         body: bodyRef.current.value,
      })
      .then(res => {
         if(res.status === 200){
            setEditModal(false)
         };
      })
      .catch(err => console.log(err))
   }

   const handleDel = () => {
      axios
      .delete("http://localhost:8080/posts/" + item.id)
      .then(res => {
         if(res.status === 200){
            setEditModal(false)
         };
      })
      .catch(err => console.log(err))
   }

  return (
   <>
    <li className="d-flex align-items-center justify-content-between shadow p-3 mb-3">
      <Link to={`/posts/${item.id}`} className="text-dark text-decoration-none">
        <h5 className="m-0">{item.title}</h5>
      </Link>
     <button onClick={() => setEditModal(true)} className="btn btn-warning m-0">EDIT</button>
    </li> 

   {editModal && (<Modal  modal={editModal} setModal={setEditModal} title='Edit'>
   <form onSubmit={handleEditPost} className="mt-4">
      <Input ref={titleRef} defaultValue={item.title} type="text" placeholder="Title"/>
      <Input ref={bodyRef} defaultValue={item.body} type="text" placeholder="Body"/>
      <button className="btn btn-primary">EDIT</button>
      <button type="button" onClick={handleDel} className="btn btn-danger ms-2">DEL</button>
   </form>
   </Modal>)}
   </>
  )
};