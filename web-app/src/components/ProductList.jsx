import React, { useState } from "react";
import { useEffect } from "react";

//Se importo el framework de Bulma para utilizarse con react para la realizacion de la paginacion
// este es el link "https://bulma.io"
//Se puede instalar a traves de npm o de link en el index.html.

//Aqui se importo el componente que contiene la paginacion
import { Pagination } from "./Pagination";
import { NavLink, Outlet } from "react-router-dom";

const ProductList = () => {

    //Constante donde se almacenan los productos obtenidos de la api de la tienda, y la funcion
    //que guarda los datos obtenidos de la api.
    const [products, setProducts] = useState([]);

    //Aqui se crea una constante para la cantidad de productos que se quieran visualizar por pagina
    //al cambiar el estado cambiara la cantidad de productos que se muestra por pagina.
    const [productsPerPage, setProductsPerPage] = useState(5);

    //Constante para saber en que pagina se ubica el usuario, comienza en la primera pagina.
    const [currentePage, setCurrentePage] = useState(1);

    //Esta variables se creo para almacenar de manera dinamica el ultimo indice para recortar
    //el array donde se guardan los datos. Esto con el objetivo de que se pueda mostrar
    //la cantidad de productos deseados por pagina.
    const lastIndex = currentePage * productsPerPage;

    //Este es el otro extremo de la palicacion anterior, este es el inicio desde donde se
    //cortara el array.
    const firstIndex =  lastIndex - productsPerPage;

    //En esta variable se almacena la cantidad de productos que hay en el arreglo.
    //Si se utiliza otra api con mas elementos, cambiara dinamicamente el paginado.
    const totalProducts = products.length

    //Esta variable se utiliza para la busqueda de un producto por su nombre.
    const [search, setSearch] = useState('');

    //Con esta funcion se hace la conexion con la api, y se almacenan los datos en el arreglos products.
    const productList = async() => {
        const data = await fetch("https://fakestoreapi.com/products")
        const products = await data.json()
        
        setProducts(products);

    }

    useEffect(() => {
        productList();
    }, [])

    return(
        <>
            <div className='search-container'>
                    <input 
                        className='search-input' 
                        type='search' 
                        name='search' 
                        placeholder='Buscar producto'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        /> 
            </div>
            <div className='products-container'>
                
                {products.filter((row) => {
                        if(search == ""){
                            return row;
                        }
                        else if(row.title.toLowerCase().includes(search.toLocaleLowerCase())){
                            return row;
                        }
                    }).map(product => (
                    <div className='product-card' key={product.id}>
                        <figure className='img-container'>
                            <img src={product.image} alt={product.title}/>
                        </figure>
                        <div className='product-info'>
                            <h3>{product.title}</h3>
                            <h4>Precio: ${product.price}</h4>
                            <NavLink to={`/products/:${product.id}`} className='view-btn'>Ver Producto</NavLink>
                        </div>
                    </div>
                ))
                .slice(firstIndex, lastIndex)}
            </div>
            <Pagination 
                        productsPerPage={productsPerPage} 
                        currentPage={currentePage} 
                        setCurrentPage={setCurrentePage}
                        totalProducts={totalProducts}
                        />
        </>
    ) 
};

export default ProductList;