import { useContext } from 'react';
import LogicContext from '../../context/LogicContext';
import { format } from 'date-fns';
import './imageRender.css';

const ImageRender = () => {
   const { items, loading, err, setModal, setItem } = useContext(LogicContext);

   return (
      <>
         {loading && (
            <div className='images__loading'>
               <div></div>
               <div></div>
               <div></div>
            </div>
         )}
         {err && (
            <div className='images__error'>
               <img
                  alt='error'
                  src={require('../../assets/error-icon.png')}
               ></img>
               <p>{err}</p>
            </div>
         )}
         {items &&
            items.map((item, index) => (
               <div className='images__container' key={index}>
                  <div className='image'>
                     <img
                        src={item.urls.regular}
                        alt='unsplash'
                        onClick={() => {
                           setModal(true);
                           setItem(item);
                        }}
                     />
                  </div>
                  <div className='image__info'>
                     <div className='image__user'>
                        <div className='image__user-image'>
                           <img
                              src={item.user.profile_image.medium}
                              alt={item.user.name}
                           />
                        </div>
                        <div className='image__user-name'>
                           <p>{item.user.name}</p>
                           <p className='image__date'>
                              {format(new Date(item.created_at), 'dd/MM/yyyy')}
                           </p>
                        </div>
                     </div>
                     <div className='image__likes'>
                        <img
                           src={require('../../assets/heard-icon.png')}
                           alt='like icon'
                        />
                        <p>{item.likes}</p>
                     </div>
                  </div>
               </div>
            ))}
      </>
   );
};

export default ImageRender;
