import { createContext, useRef, useState } from 'react';

const LogicContext = createContext();

export const LogicProvider = ({ children }) => {
   const [items, setItems] = useState([]);
   const [item, setItem] = useState([]);
   const [loading, setLoading] = useState(true);
   const [err, setErr] = useState(null);

   const [randomBtn, setRandomBtn] = useState(false);
   const [latestBtn, setLatestBtn] = useState(false);
   const [searchBtn, setSearchBtn] = useState(false);
   const [modal, setModal] = useState(false);
   const pageNum = useRef(1);
   const ref = useRef(null);

   const [inputValue, setInputValue] = useState('');

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
               if (data.total === 0) {
                  throw Error('Soory, no matches are found =(');
               }
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

   const loadRandom = () => {
      fetchFunction(
         `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_API_KEY}&count=30`
      );

      setRandomBtn(true);
      setLatestBtn(false);
      setSearchBtn(false);
   };

   const loadLatest = () => {
      fetchFunction(
         `https://api.unsplash.com/photos/?client_id=${
            process.env.REACT_APP_API_KEY
         }&page=${pageNum.current}&per_page=${30}`
      );
      pageNum.current = pageNum.current + 3;
      setLatestBtn(true);
      setRandomBtn(false);
      setSearchBtn(false);
   };

   const searchFunction = e => {
      if (e) {
         e.preventDefault();
      }
      fetchFunction(
         `https://api.unsplash.com/search/photos/?query=${inputValue}&page=${pageNum.current}&per_page=20&client_id=${process.env.REACT_APP_API_KEY}`
      );
      pageNum.current = pageNum.current + 2;
      setSearchBtn(true);
      setRandomBtn(false);
      setLatestBtn(false);
   };

   return (
      <LogicContext.Provider
         value={{
            items,
            loading,
            err,
            loadRandom,
            loadLatest,
            searchFunction,
            randomBtn,
            setRandomBtn,
            latestBtn,
            setLatestBtn,
            inputValue,
            setInputValue,
            searchBtn,
            pageNum,
            item,
            setItem,
            modal,
            setModal,
            ref,
            setLoading,
         }}
      >
         {children}
      </LogicContext.Provider>
   );
};

export default LogicContext;
