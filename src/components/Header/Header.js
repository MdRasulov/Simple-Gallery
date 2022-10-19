import './header.css';

const Header = () => {
   function handle() {
      console.log('hi');
   }

   return (
      <div className='header'>
         <div className='header__text'>
            <h1>Huge Collection of High Resolution Wallpapers</h1>
         </div>
         <div className='header__search-bar'>
            <form onSubmit={handle}>
               <input type='text' placeholder='Search for images' />
               <button type='submit' onClick={handle}>
                  <img src={require('../../assets/search-icon.png')} alt='' />
               </button>
            </form>
         </div>
      </div>
   );
};

export default Header;
