import React, { Component } from 'react';
import './styles.css'

export class FormularioComentario extends Component {

     // crear los refs
     tituloRef = React.createRef();
     entradaRef = React.createRef();

     crearPost = (e) => {
          e.preventDefault();

          // leer los refs
          const post = {
               name:"cesar",
               email:"cesar@gmail.com",
               body: this.entradaRef.current.value,
               userId: 1
          }

          // console.log(post);

          // enviar por props o petición de axios
          this.props.crearComentario(post);
     }

     render() {  
          return ( 

               <form onSubmit={this.crearPost} className="col-8">
                    <legend className="text-center">Crear Nuevo Comentario</legend>
                    <div className="form-group">
                  
                         <textarea className="texarea" ref={this.entradaRef}  placeholder="Escribe un comentario..."></textarea>
                    </div>
                    
                    <button type="submit" class="p-button p-component p-button-success p-mr-2" style={{'color': 'rgb(255, 255, 255)', 'background': 'rgb(19, 175, 78)'}}>
                         
                         <span class="p-button-label p-c">Comentar</span>
                         <span class="p-ink" style={{'height': '104px', 'width': '104px', 'top': '-31px', 'left': '20px'}}></span>
                         </button>
               </form>
           );
     }
}
 
