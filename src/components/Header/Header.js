import { useContext, useState } from 'react';
import LogicContext from '../../context/LogicContext';
import { motion } from 'framer-motion';
import './header.css';

const Header = () => {
   const { searchFunction, setInputValue, pageNum, items, ref, setLoading } =
      useContext(LogicContext);
   const [input, setInput] = useState('');

   const submitFunction = e => {
      items.length = 0;
      pageNum.current = 1;
      searchFunction(e);
      setInput('');
      ref.current?.scrollIntoView({ behavior: 'smooth' });
      setLoading(true);
   };

   return (
      <div className='header'>
         <div className='header__text'>
            <motion.h1
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 2 }}
            >
               Huge Collection of High Resolution Wallpapers
            </motion.h1>
         </div>
         <motion.div
            initial={{ opacity: 0, y: '15vh' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='header__search-bar'
         >
            <form
               onSubmit={e => {
                  submitFunction(e);
               }}
            >
               <input
                  type='text'
                  required
                  placeholder='Search for images'
                  value={input}
                  onChange={e => {
                     setInputValue(e.target.value);
                     setInput(e.target.value);
                  }}
               />
               <button type='submit'>
                  <img src={require('../../assets/search-icon.png')} alt='' />
               </button>
            </form>
         </motion.div>
      </div>
   );
};

export default Header;
