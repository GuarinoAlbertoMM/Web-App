import React, { useEffect, useState } from "react";

//Se importaron los providers de navlink y outlet para utilizar el boton de volver
//cuando se esta visualizando un solo producto.
import { NavLink, Outlet, useParams } from "react-router-dom";

//Esta funcion se utiliza para poder visualizar un solo objeto con los detalles extra
//que no se muestran cuando estan listados en la pagina inicial
const SingleProduct = () => {

    //Primero se captura el parametro pasado por la url, que es el id
    const params = useParams();

    //Luego se almacena el id en un array
    let productId =[];

    productId = params.id;
    
    //Y por ultimo se toma el array y dependiendo de si tiene 2 o 3 caracteres, se corta y solo se toma 
    //el numero.
    //Al guardad el id en la variable params, se guarda con el caracter de 2 puntos al inicio, por eso se transforma
    //en array y se le remueve dicho caracter
    if(productId.length == 2){
        var productIdCort = productId.slice(1,2);
    }
    else if(productId.length == 3){
        productIdCort = productId.slice(1,3);
    }

    //Luego se crean la variable product para guardar los datos obtenidos de la api, y se crea la funcion
    //setproduct para guardarlos.
    const [product, setProduct] = useState([]);

    //Se accede a la funcion de la api de solo obtener un producto, utilizanto el array recortado anteriormente
    //para asi obtener el producto al cual se le haga clic.
    const productView = async() => {
        const data = await fetch(`https://fakestoreapi.com/products/${productIdCort}`)
        const product = await data.json()
                
            setProduct(product);
        }
        
        useEffect(() => {
            productView();
        }, [])

        //Aqui se imprime por consola el producto guardado para confirmar que es el correcto.
        console.log(product)

    return(
        <div className='single-product-container'>
            <figure className='img-container'>
                <img src={product.image} alt={product.title}/>
            </figure>
            <div className='single-product-view'>
                <h3>{product.title}</h3>
                <h4><strong>Precio:</strong> ${product.price}</h4>
                <h4><strong>Categoría:</strong> {product.category}</h4>
                <p><strong>Descripción:</strong> {product.description}</p>
                <NavLink to="/" className='view-btn'>Volver</NavLink>
                <Outlet />
            </div>
        </div>
    )
}

export default SingleProduct;