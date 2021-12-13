import React from 'react';
import {Link} from 'react-router-dom';

export const Header = () => {
     return ( 
          <header className="col-12 col-md-8">
               <Link to={'/'} >
                    <h1 className="text-center">Foro de Discusion</h1>
               </Link>
          </header>
      );
}
 
