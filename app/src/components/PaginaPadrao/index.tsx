import { Outlet } from 'react-router-dom';

function PaginaPadrao(){
  return(
    <>
      <header>Header</header>
      <div>
        <Outlet/>
      </div>
      <footer>Footer</footer>
    </>
  );
}
export default PaginaPadrao;