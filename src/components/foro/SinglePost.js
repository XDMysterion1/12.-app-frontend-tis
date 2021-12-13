import React, { Component } from 'react';
import { Comentario } from './Comentario';
import swal from 'sweetalert2';
import './styles.css';

import axios from 'axios';




export class SinglePost extends Component {
     state = { 
          comment: []
          
      }

     componentDidMount() {
          this.obtenerComment();
          
     }
     obtenerComment = () => {
          axios.get(`https://jsonplaceholder.typicode.com/comments`)
               .then(res => {
                    let aux=[]
                 res.data.forEach(element => {

                      if(element.postId=== 1){
                          aux.push(element);
                         console.log(element)
                      }
                 });
                   
              console.log(aux)
              this.setState({
                   comment:aux
              })
               })

              
     }
     crearComentario = (comm) => {
          axios.post(`https://jsonplaceholder.typicode.com/comments`, {comm})
                 .then(res => {
                     if(res.status === 201) {

                         let postId = {id: res.data.id};
                        const nuevoPost = Object.assign({}, res.data.comm, postId);
  
                        this.setState(prevState => ({
                          comment: [...prevState.comment, nuevoPost]
                        }))
                     }
                 })
      }




     mostrarPost = (props, cc) => {
          if(!props.post) return null;
          const {title, body, userId, id } = this.props.post;

          return (
               <React.Fragment>
                    <div className='contenedorForo'>
                         <h1>{title}</h1>
                         <p>Autor: {userId}</p>
                         {body}

                    </div>

                    
                    <Comentario comment={this.state.comment} usuario={this.props.post} crearComentario={this.crearComentario}/>  
               </React.Fragment>
          )
     }


     render() { 

          return (
               <>
                    <div className="col-12 col-md-8">
                         
                         {this.mostrarPost(this.props, this.crearComentario)}
                         
                    
                    </div>
                    
                   
               </>

          );
     }
}
 