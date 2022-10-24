import { useContext, useEffect, useRef } from 'react';
import LogicContext from '../../context/LogicContext';
import format from 'date-fns/format';
import './modal.css';

const Modal = () => {
   const { item, setModal } = useContext(LogicContext);
   const refModal = useRef();

   useEffect(() => {
      const handler = e => {
         if (!refModal.current.contains(e.target)) {
            setModal(false);
         }
      };

      document.addEventListener('mousedown', handler);

      return () => {
         document.removeEventListener('mousedown', handler);
      };
   });

   return (
      <div className='modal'>
         <div className='modal__container' ref={refModal}>
            <div className='modal__buttons'>
               <div className='modal__exit'>
                  <button
                     onClick={() => {
                        item.length = 0;
                        setModal(false);
                     }}
                  >
                     <img
                        src={require('../../assets/exit-icon.png')}
                        alt='exit-button'
                     />
                  </button>
               </div>
               <div className='modal__download'>
                  <a href={item.links.download + '&force=true'}>
                     <img
                        src={require('../../assets/download-icon.png')}
                        alt='download-button'
                     />
                  </a>
               </div>
            </div>
            <div className='modal__image'>
               <img src={item.urls.regular} alt='' />
            </div>
            <div className='modal__info'>
               <div className='modal__user'>
                  <div className='modal__user-image'>
                     <img
                        src={item.user.profile_image.medium}
                        alt={item.user.name}
                     />
                  </div>
                  <div className='modal__user-name'>
                     <p>{item.user.name}</p>
                     <p className='modal__date'>
                        {format(new Date(item.created_at), 'dd/MM/yyyy')}
                     </p>
                  </div>
               </div>
               <div className='modal__likes'>
                  <img
                     src={require('../../assets/heard-icon.png')}
                     alt='like icon'
                  />
                  <p>{item.likes}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Modal;
