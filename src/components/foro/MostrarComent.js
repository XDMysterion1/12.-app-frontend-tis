import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';
import './styles.css';

export class MostarComent extends Component {

   

     render() { 

          const {id, name,body,email} = this.props.info;

          return (
               <>

                    <div className='contenedorComentario'>
                         <div className="contenidoComentario">
                              {/*<h2>{id}</h2>*/}
                              <div className='usuario' >
                                   <p >nombre : {name} </p>
                                   <p>   email: {email}</p>

                              </div>
                              <hr className='separarUsuario'/>
                              <p>{body}</p>

                         </div>

                    </div>
                    <br/>
                    <hr/>

               </>
           );
     }
}
 
