import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';

export class MostarComent extends Component {

   

     render() { 

          const {id, name} = this.props.info;

          return (
               <>
               <div>
               <h2>{id}</h2>
               <p>{name}</p>
               </div>
               
               </>
           );
     }
}
 
