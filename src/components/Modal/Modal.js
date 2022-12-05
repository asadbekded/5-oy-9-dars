import { useEffect, useRef } from 'react';
import './Modal.css';

export const Modal = ({ modal, setModal, children }) => {

   const overlayRef = useRef()

   const handleCloseModal = (evt) => {
      if(evt.target === overlayRef.current) {
         setModal(false)
      }
   }

   useEffect(() => {

      function closeModal(evt){
         if(evt.key === 'Escape'){
            setModal(false)
         }
       }

      if(modal) {
         window.addEventListener("keyup", closeModal);
      };

      return () => 
       window.removeEventListener('keyup', closeModal);
   }, [modal]);

  return (
    <div ref={overlayRef} onClick={handleCloseModal} className="overlay">
      <div className="bg-white w-50 p-5 rounded-10 just">
         <div className="modal-header">
            <h3>Add</h3>
            <button onClick={() => setModal(false)} className="btn btn-danger">&times;</button>
         </div>
         <div className="modal-content">
         {children}
         </div>
      </div>
    </div>
  )
}
