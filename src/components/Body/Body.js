import { useEffect, useState } from 'react';
import './body.css';

const Body = () => {
   // useEffect(() => {
   //    loadLatest();
   // }, []);

   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [err, setErr] = useState(null);

   const [randomBtn, setRandomBtn] = useState(false);
   const [latestBtn, setLatestBtn] = useState(false);
   const [pageNumber, setPageNumber] = useState(1);

   const fetchFunction = url => {
      fetch(url)
         .then(response => {
            if (!response.ok) {
               throw Error('Could not fetch the data from that resource ! =(');
            }
            return response.json();
         })
         .then(data => {
            setItems([...items, ...data]);
            setLoading(false);
            setErr(null);
         })
         .catch(err => {
            if (err.name !== 'AbortError') {
               setErr(err.message);
               setLoading(false);
            }
         });
   };

   // const searchFunction = () => {
   //    fetchFunction(
   //       `https://api.unsplash.com/photos/search/?client_id=${process.env.REACT_APP_API_KEY}&page=${pageNumber}&query=${inputValue}`
   //    );

   //    setPageNumber(pageNumber + 1);
   //    inputState(true);
   // };

   const loadRandom = () => {
      fetchFunction(
         `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_API_KEY}&count=30`
      );

      setRandomBtn(true);
      setLatestBtn(false);
   };

   const loadLatest = () => {
      fetchFunction(
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

export default Body;
