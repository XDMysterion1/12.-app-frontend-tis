import React, { Component } from 'react';
import Post from './Post';
import { MostarComent } from './MostrarComent';

export class ListadoCometario extends Component {

     mostrarPosts = () => {
          const comment = this.props.comment;

          if(comment.length === 0) return null;

          return (
               <React.Fragment>
                    {Object.keys(comment).map(comm => (
                         <>
                         
                         <MostarComent
                              key={comm}
                              info={this.props.comment[comm]}
                              usuario={this.props.usuario}
                             // borrarPost={this.props.borrarPost}
                         />
                         </>
                     
                    ))}
               </React.Fragment>
          )
     }
     

     render() { 
          return (
               
           
           
                    <div>
                         {this.mostrarPosts() }
                    </div>
               
           )
     }
}
 
