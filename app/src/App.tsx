import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { RecoilRoot } from 'recoil';
import PaginaCarrinho from './pages/PaginaCarrinho';

const PaginaPadrao = lazy(()=> import('./components/PaginaPadrao'));
const Inicio = lazy(()=> import('./pages/Inicio'));

function App() {
  return (
    <main className='container'>
      <Router>
        <RecoilRoot>
          <Suspense fallback={<p>Carregando...</p>}>   
            <Routes>
              <Route path='/' element={<PaginaPadrao/>}>
                <Route index element={<Inicio/>} />
                <Route path='carrinho' element={<PaginaCarrinho/>} />          
              </Route>        
            </Routes> 
          </Suspense>
        </RecoilRoot> 
      </Router>
    </main>
  );
}
export default App;
