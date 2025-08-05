import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/home';
import Filme from './pages/filme';
import Header from './components/Header';
import Favoritos from './pages/favoritos';
import Erro from './pages/Erro/erro';

function RoutesApp() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />


        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;