import { useState, useEffect } from 'react';
import './gallery.css';

const Gallery = ({ fetch, items, loading, err }) => {
   // useEffect(() => {
   //    loadLatest();
   // }, []);

   const [randomBtn, setRandomBtn] = useState(false);
   const [latestBtn, setLatestBtn] = useState(false);
   const [pageNumber, setPageNumber] = useState(1);

   const loadRandom = () => {
      fetch(
         `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_API_KEY}&count=30`
      );

      setRandomBtn(true);
      setLatestBtn(false);
   };

   const loadLatest = () => {
      fetch(
         `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_API_KEY}&page=${pageNumber}`
      );

      setPageNumber(pageNumber + 1);
      setRandomBtn(false);
      setLatestBtn(true);
   };

   return (
      <div className='body' id='body-id'>
         <div className='body__buttons'>
            <button
               className={`body__button --${latestBtn ? 'active' : ''}`}
               onClick={() => {
                  items.length = 0;
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
                  setPageNumber(1);
               }}
            >
               Random
            </button>
         </div>
         <div className='body__galary'>
            {loading && <div className='body__loading'>Loading.....</div>}
            {err && <div>{err}</div>}
            {items &&
               items.map(item => (
                  <div className='body__img-container' key={item.id}>
                     <img src={item.urls.regular} alt='unsplash' />
                  </div>
               ))}
         </div>
         <div className='random__button'>
            <button
               onClick={() => {
                  if (randomBtn) {
                     loadRandom();
                  } else if (latestBtn) {
                     loadLatest();
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
