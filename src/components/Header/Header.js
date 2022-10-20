import { useState } from 'react';
import './header.css';

const Header = ({ fetch, items }) => {
   const [inputValue, SetInputValue] = useState('');

   const searchFunction = e => {
      e.preventDefault();
      items.length = 0;
      if (inputValue !== '') {
         fetch(
            `https://api.unsplash.com/search/photos/?query=${inputValue}&per_page=30&client_id=${process.env.REACT_APP_API_KEY}`
         );
         SetInputValue('');
      }
   };

   return (
      <div className='header'>
         <div className='header__text'>
            <h1>Huge Collection of High Resolution Wallpapers</h1>
         </div>
         <div className='header__search-bar'>
            <form onSubmit={searchFunction}>
               <input
                  type='text'
                  placeholder='Search for images'
                  value={inputValue}
                  onChange={e => {
                     SetInputValue(e.target.value);
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
