import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LogicContext from '../../context/LogicContext';
import format from 'date-fns/format';
import './modal.css';

const Modal = () => {
   const { item, setModal } = useContext(LogicContext);
   const [fullScreen, setFullScreen] = useState(false);
   const [modalLoadig, SetModalLoading] = useState(false);
   const refModal = useRef();

   //closing modal on click outside
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
         <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className='modal__container'
            ref={refModal}
         >
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
            <div
               className='modal__image'
               onClick={() => {
                  setFullScreen(true);
                  SetModalLoading(true);
               }}
            >
               <img src={item.urls.regular} alt='modal' />
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
         </motion.div>
         {fullScreen && (
            <motion.div
               initial={{ scale: 0.5 }}
               animate={{ scale: 1 }}
               className='modal__fullScreen-image'
               onClick={() => {
                  setFullScreen(false);
                  SetModalLoading(false);
               }}
            >
               <img
                  src={item.urls.raw}
                  alt='fullscreen'
                  onLoad={() => {
                     SetModalLoading(false);
                  }}
               />
            </motion.div>
         )}
         {modalLoadig && (
            <div className='modal__loading'>
               <div className='lds-spinner'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Modal;
