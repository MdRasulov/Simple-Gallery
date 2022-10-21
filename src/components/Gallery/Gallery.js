import { useContext, useEffect } from 'react';
import LogicContext from '../../context/LogicContext';
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
   } = useContext(LogicContext);

   useEffect(() => {
      loadLatest();
   }, []);

   return (
      <div className='body' id='body-id'>
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
         <div className='body__galary'>
            {loading && (
               <div className='lds-facebook'>
                  <div></div>
                  <div></div>
                  <div></div>
               </div>
            )}
            {err && (
               <div className='body__error'>
                  <img
                     alt='error'
                     src={require('../../assets/error-icon.png')}
                  ></img>
                  <p>{err}</p>
               </div>
            )}
            {items &&
               items.map(item => (
                  <div className='body__img-container' key={item.id}>
                     <img src={item.urls.regular} alt='unsplash' />
                  </div>
               ))}
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
      </div>
   );
};

export default Gallery;
