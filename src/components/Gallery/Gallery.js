import { useContext, useEffect } from 'react';
import LogicContext from '../../context/LogicContext';
import ImageRender from '../ImageRender/ImageRender';
import Modal from '../Modal/Modal';
import './gallery.css';

const Gallery = () => {
   const {
      loadLatest,
      loadRandom,
      searchFunction,
      items,
      loading,
      err,
      randomBtn,
      latestBtn,
      searchBtn,
      pageNum,
      modal,
      ref,
   } = useContext(LogicContext);

   useEffect(() => {
      loadLatest();
   }, []);

   return (
      <div className='body' ref={ref}>
         <div className='body__buttons'>
            <button
               className={`body__button --${latestBtn ? 'active' : ''}`}
               onClick={() => {
                  items.length = 0;
                  pageNum.current = 1;
                  loadLatest();
               }}
            >
               Latest
            </button>
            <button
               className={`body__button --${randomBtn ? 'active' : ''}`}
               onClick={() => {
                  items.length = 0;
                  loadRandom();
               }}
            >
               Random
            </button>
         </div>
         <div className='images'>
            <ImageRender />
         </div>
         <div
            className={`body__button-more ${
               err || loading ? 'btn-disable' : ''
            }`}
         >
            <button
               onClick={() => {
                  if (randomBtn) {
                     loadRandom();
                  } else if (latestBtn) {
                     loadLatest();
                  } else if (searchBtn) {
                     searchFunction();
                  }
               }}
            >
               More
            </button>
         </div>
         {modal && <Modal />}
      </div>
   );
};

export default Gallery;
