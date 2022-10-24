import Header from '../Header/Header.js';
import Gallery from '../Gallery/Gallery.js';
import { LogicProvider } from '../../context/LogicContext.js';
const Main = () => {
   return (
      <div className='main'>
         <LogicProvider>
            <Header />
            <Gallery />
         </LogicProvider>
      </div>
   );
};

export default Main;
