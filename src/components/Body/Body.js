import { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './body.css';

const Body = () => {
   const [items, setItems] = useState(null);
   const [loading, setLoading] = useState(true);
   const [err, setErr] = useState(null);

   useEffect(() => {
      random();
   }, []);

   const random = () => {
      fetch(
         `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_API_KEY}&count=30`
      )
         .then(response => {
            if (!response.ok) {
               throw Error('Could not fetch the data from that resource ! =(');
            }
            return response.json();
         })
         .then(data => {
            setItems(data);
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

   return (
      <div className='body' id='main'>
         <div className='body__buttons'>
            <button className='body__button'>Latest</button>
            <button className='body__button' onClick={random}>
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
         {items && (
            <AnchorLink href='#main'>
               <div className='random__button'>
                  <button onClick={random}>Randomize</button>
               </div>
            </AnchorLink>
         )}
      </div>
   );
};

export default Body;
