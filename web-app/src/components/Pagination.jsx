import React from "react";

//Aqui se pasan los props que necesita el componente de para el paginado.
//productsPerPage, son los productos que habra por pagina.
//currentPage, para saber en que pagina se encuentra el usuario.
//setCurrentPage, funcion para establecer la nueva pagina actual.
//totalProducts, para saber la cantidad de productos que tiene la tienda.
export const Pagination = ({ productsPerPage, currentPage, setCurrentPage, totalProducts }) => {

    //Esta contaste esta para saber el numero de pagina que tiene el paginador.
    const pageNumbers = [];

    //Con este for se establece la cantidad de paginas que tendra el paginador,
    //es decir, visualmente se veran cuantas paginas tiene la tienda.
   for(let i = 1; i <= Math.ceil(totalProducts/productsPerPage) ;i++){
        pageNumbers.push(i)
   }

   //Esta funcion sirve para que cuando se presione el boton "Anterior"
   //vaya a la pagina anterior.
   const onPrevPage = () => {
    setCurrentPage(currentPage-1)
   }

   //Esta funcion sirve para que cuando se presione el boton "Siguiente"
   //vaya a la pagina siguiente.
   const onNextPage = () => {
    setCurrentPage(currentPage+1)
   }

   //Esta funcion sirve para cuando se presione uno de los numeros de paginas, vaya a la pagina elegida.
   const onSelectPage = (x) => {
    setCurrentPage(x)
   }

    return(
        <nav 
            className="pagination is-centered mb-6" 
            role="navigation" 
            aria-label="pagination">
            <a 
                className={`pagination-previous ${currentPage === 1 ? "is-disabled" : ""}`} 
                onClick={onPrevPage}>
                    Anterior
                </a>
            <a 
                className={`pagination-next ${currentPage >= pageNumbers.length ? "is-disabled" : ""}`} 
                onClick={onNextPage}>
                    Siguiente
                </a>
            <ul className="pagination-list">
                {
                    pageNumbers.map(nPage => (
                        <li key={nPage}>
                            <a 
                                className={`pagination-link ${nPage == currentPage ? 'is-current':''}`}
                                onClick={() => onSelectPage(nPage)}
                                >
                                {nPage}
                            </a>
                        </li>   
                    ))
                }
            </ul>
        </nav>
    ) 
};