import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';

class Post extends Component {

    confirmarEliminacion = () => {

            const {id} = this.props.info;

            swal.fire({
                title: 'Estas seguro??',
                text: "Esta acción no se puede deshacer!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!',
                cancelButtonText : 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.props.borrarPost(id)
                    swal.fire(
                        'Eliminado!',
                        'El post ha sido eliminado.',
                        'success'
                    )
                }
            })

        
    }

     render() { 

          const {id, title} = this.props.info;

          return (
               <tr  >
                    <td>{id}</td>
                    <td>{title}</td>
                    <td style={{'margin-left':'auto','margin-right':'auto'}}>

                        
                         <Link to={`/post/${id}`} class="p-button p-component p-button-rounded p-button-success mr-2 p-button-icon-only" style={{'background': 'rgb(19, 175, 78'}}> Ver</Link>
                         <Link to={`/editar/${id}`} class="p-button p-component p-button-rounded p-button-success mr-2 p-button-icon-only" style={{'background': 'rgb(19, 175, 78'}}> 
                            <span class="p-button-icon p-c pi pi-pencil"></span>
                            <span class="p-button-label p-c">&nbsp;</span>
                            <span class="p-ink" style={{'height': '50px', 'width': '50px', 'top': '-5.64062px', 'left': '-2px'}}></span>  
                         </Link>
                         
                         <button onClick={ this.confirmarEliminacion }  class="p-button p-component p-button-rounded p-button-warning p-button-icon-only" style={{'background': 'rgb(238, 229, 0)'}}>
                             <span class="p-button-icon p-c pi pi-trash"></span>
                             <span class="p-button-label p-c">&nbsp;</span>
                             <span class="p-ink" style={{'height': '38px', 'width': '38px', 'top': '4.85938px', 'left': '0.296875px'}}></span>
                             </button>
                         </td>
               </tr>
           );
     }
}
 
export default Post;