import React, { Component } from 'react';
import { Comentario } from './Comentario';
import swal from 'sweetalert2'

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




     mostrarPost = (props) => {
          if(!props.post) return null;
          const {title, body, userId, id } = this.props.post;

          return (
               <React.Fragment>
                    <h1>{title}</h1>
                    <p>Autor: {userId}</p>
                    {body}
                    <h2>{id}</h2>
                    
                    <Comentario comment={this.state.comment} usuario={this.props.post}/>  
               </React.Fragment>
          )
     }
     crearPost = (post) => {
          axios.post(`https://jsonplaceholder.typicode.com/comments`, {post})
                 .then(res => {
                     if(res.status === 201) {
                         swal.fire(
                             'Post Creado',
                             'Se creo correctamente',
                             'success'
                         
                         )
                         let postId = {id: res.data.id};
                        const nuevoPost = Object.assign({}, res.data.post, postId);
 
                        this.setState(prevState => ({
                            posts: [...prevState.posts, nuevoPost]
                        }))
                     }
                 })
      }

     render() { 

          return (
               <>
                    <div className="col-12 col-md-8">
                         
                         {this.mostrarPost(this.props)}
                         
                    
                    </div>
                    
                   
               </>

          );
     }
}
 