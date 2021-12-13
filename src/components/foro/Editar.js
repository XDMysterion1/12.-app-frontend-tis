import React, { Component } from 'react';
import './styles.css'

export class Editar extends Component {

     // crear los refs
     tituloRef = React.createRef();
     entradaRef = React.createRef();

     editarPost = (e) => {
          e.preventDefault();

          // leer los refs
          const post = {
               title : this.tituloRef.current.value,
               body: this.entradaRef.current.value,
               userId: 1,
               id: this.props.post.id
          }

          // console.log(post);

          // enviar por props o petición de axios
           this.props.editarPost(post);
     }

     cargarFormulario = () => {

          if(!this.props.post) return null;

          const {title, body} = this.props.post;

          return(
               <form onSubmit={this.editarPost} className="col-8">
                    <legend className="text-center">Editar foro</legend>
                    <div className="form-group">
                         <label>Titulo del Foro:</label>
                         <input  type="text" ref={this.tituloRef} className="textareaTitle" defaultValue={title} />
                    </div>
                    <div className="form-group">
                         <label>Contenido: </label>
                         <textarea className="texarea"  ref={this.entradaRef}  defaultValue={body} ></textarea>
                    </div>
                    <button type="submit" class="p-button p-component p-button-success p-mr-2" style={{'color': 'rgb(255, 255, 255)', 'background': 'rgb(19, 175, 78)'}}>
                         
                         <span class="p-button-label p-c">Guardar Cambios</span>
                         <span class="p-ink" style={{'height': '104px', 'width': '104px', 'top': '-31px', 'left': '20px'}}></span>
                    </button>
               </form>
          )
     }

     render() { 

          
          return ( 
               <React.Fragment>
                    { this.cargarFormulario() }
               </React.Fragment>
           );
     }
}
 
