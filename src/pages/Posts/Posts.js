import { useEffect, useState } from "react";
import  axios  from 'axios';
import { Modal } from "../../components/Modal/Modal";

export const Posts = () => {
   const [ modal, setModal ] = useState(false);

   const [ posts, setPosts ] = useState({});

   useEffect(() =>{
      axios.get("http://localhost:8080/posts")
      .then(res => console.log(res))
      .catch(err => console.log(err))
   }, [])

  return (
    <div className="container">
      <h3 className="text-center my-3">Posts page</h3>
      <button onClick={() => setModal(true)} className="btn btn-primary">+ Create post</button>

      {modal && <Modal modal={modal} setModal={setModal} />}
    </div>
  )
}
