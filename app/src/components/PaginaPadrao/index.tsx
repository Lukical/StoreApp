import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer';

const PaginaPadrao = () =>{
  return(
    <>
      <Header/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </>
  );
}
export default PaginaPadrao;