import './header.css';

const Header = () => {
   return (
      <div className='header'>
         <div className='header__text'>
            <h1>Huge Collection of High Resolution Wallpapers</h1>
         </div>
         <div className='header__search-bar'>
            <input type='text' placeholder='Search for images' />
            <i
               onClick={() => {
                  console.log('hiiiii');
               }}
            >
               <img src={require('../../assets/search-icon.png')} alt='' />
            </i>
         </div>
      </div>
   );
};

export default Header;
