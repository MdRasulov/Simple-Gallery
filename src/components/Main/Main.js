import { useState } from 'react';
import Header from '../Header/Header.js';
import Gallery from '../Gallery/Gallery.js';

const Main = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [err, setErr] = useState(null);

   const fetchFunction = url => {
      fetch(url)
         .then(response => {
            if (!response.ok) {
               throw Error('Could not fetch the data from that resource ! =(');
            }
            return response.json();
         })
         .then(data => {
            if (!Array.isArray(data)) {
               setItems([...items, ...data.results]);
            } else {
               setItems([...items, ...data]);
            }
            setLoading(false);
            setErr(null);
         })
         .catch(err => {
            setErr(err.message);
            setLoading(false);
         });
   };

   return (
      <div className='main'>
         <Header fetch={fetchFunction} items={items} />
         <Gallery
            fetch={fetchFunction}
            items={items}
            loading={loading}
            err={err}
         />
      </div>
   );
};

export default Main;
