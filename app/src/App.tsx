import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const PaginaPadrao = lazy(()=> import('./components/PaginaPadrao'));
const Inicio = lazy(()=> import('./pages/Inicio'));

function App() {
  return (
    <main className='container'>
      <Router>
        <Suspense fallback={<p>Carregando...</p>}>   
          <Routes>
            <Route path='/' element={<PaginaPadrao/>}>
              <Route index element={<Inicio/>} />          
            </Route>        
          </Routes> 
        </Suspense> 
      </Router>
    </main>
  );
}
export default App;
