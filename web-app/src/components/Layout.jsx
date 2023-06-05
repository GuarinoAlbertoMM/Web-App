import React from "react";
import { Outlet, Link } from "react-router-dom";

//Este componente se utiliza para tener el nombre de la pagina siempre visible
// y al darle clic retorna a la pagina principal.

const Layout = () => {
    return(
        <div className='title-store'>
            <Link to="/" className='title'>Fake Store</Link>
            <Outlet />
        </div>
    )
}

export default Layout;