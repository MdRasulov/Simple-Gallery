import { useContext, useEffect } from 'react';
import LogicContext from '../../context/LogicContext';
import ImageRender from '../ImageRender/ImageRender';
import { motion } from 'framer-motion';
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
      setLoading,
   } = useContext(LogicContext);

   // useEffect(() => {
   //    loadLatest();
   // }, []);

   return (
      <div className='body' ref={ref}>
         <div className='body__buttons'>
            <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.8 }}
               className={`body__button --${latestBtn ? 'active' : ''}`}
               onClick={() => {
                  items.length = 0;
                  pageNum.current = 1;
                  setLoading(true);
                  loadLatest();
               }}
            >
               Latest
            </motion.button>
            <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.8 }}
               className={`body__button --${randomBtn ? 'active' : ''}`}
               onClick={() => {
                  items.length = 0;
                  setLoading(true);
                  loadRandom();
               }}
            >
               Random
            </motion.button>
         </div>
         <div className='images'>
            <ImageRender />
         </div>
         <div
            className={`body__button-more ${
               err || loading ? 'btn-disable' : ''
            }`}
         >
            <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.8 }}
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
            </motion.button>
         </div>
         {modal && <Modal />}
      </div>
   );
};

export default Gallery;
