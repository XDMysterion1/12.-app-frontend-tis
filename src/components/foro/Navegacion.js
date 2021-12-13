import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

export const Navegacion = () => {
     return (  
          <nav className="col-12 col-md-8">
               <Link to={'/'}>Todos los Foros</Link>
               <Link to={'/crear'}>Nuevo Foro</Link>
          </nav>
     );
}
 
