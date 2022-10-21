import { useContext, useState } from 'react';
import LogicContext from '../../context/LogicContext';
import './header.css';

const Header = () => {
   const { searchFunction, setInputValue, pageNum, items } =
      useContext(LogicContext);

   const [input, setInput] = useState('');

   const submitFunction = e => {
      items.length = 0;
      pageNum.current = 1;
      searchFunction(e);
      setInput('');
   };

   return (
      <div className='header'>
         <div className='header__text'>
            <h1>Huge Collection of High Resolution Wallpapers</h1>
         </div>
         <div className='header__search-bar'>
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
         </div>
      </div>
   );
};

export default Header;
