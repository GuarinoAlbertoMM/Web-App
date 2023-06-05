import './App.css';
import React from 'react';

//Estos son los componentes utilizados en la pagina
import ProductList from './components/ProductList';
import Layout from './components/Layout';
import SingleProduct from './components/SingleProduct';

//Se importaron los providers de rutas para poder hacer la conexion entre paginas.
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<ProductList />} />
          <Route path={`/products/:id`} element={<SingleProduct />} />
          <Route path='*' element={<ProductList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;