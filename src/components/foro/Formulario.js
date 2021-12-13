import React, { Component } from 'react';
import './styles.css'

export class Formulario extends Component {

     // crear los refs
     tituloRef = React.createRef();
     entradaRef = React.createRef();

     crearPost = (e) => {
          e.preventDefault();

          // leer los refs
          const post = {
               title : this.tituloRef.current.value,
               body: this.entradaRef.current.value,
               userId: 1
          }

          // console.log(post);

          // enviar por props o petición de axios
          this.props.crearPost(post);
     }

     render() {  
          return ( 

               <form onSubmit={this.crearPost} className="col-8">
                    <legend className="text-center">Crear Nuevo Foro</legend>
                    <div className="">
                         <label>Titulo del Foro:</label>
                         <input type="text" ref={this.tituloRef} className="textareaTitle" placeholder="Titulo del Foro"/>
                    </div>
                    <div className="form-group">
                         <label>Contenido: </label>
                         <textarea className="texarea" ref={this.entradaRef}  placeholder="Contenido..."></textarea>
                    </div>
                    
                    <button type="submit" class="p-button p-component p-button-success p-mr-2" style={{'color': 'rgb(255, 255, 255)', 'background': 'rgb(19, 175, 78)'}}>
                         
                         <span class="p-button-label p-c">Crear</span>
                         <span class="p-ink" style={{'height': '104px', 'width': '104px', 'top': '-31px', 'left': '20px'}}></span>
                         </button>
               </form>
           );
     }
}
 
