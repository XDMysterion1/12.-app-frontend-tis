import React, { Component } from 'react';
import Post from './Post';

export class Listado extends Component {

     mostrarPosts = () => {
          const posts = this.props.posts;

          if(posts.length === 0) return null;

          return (
               <React.Fragment>
                    {Object.keys(posts).map(post => (
                         <Post
                              key={post}
                              info={this.props.posts[post]}
                              borrarPost={this.props.borrarPost}
                         />
                    ))}
               </React.Fragment>
          )
     }
     

     render() { 
          return (
               <table className="table">
                    <thead>
                         <tr > 
                              <th style={{'background-color': 'rgb(19, 175, 78)', 'width': '5%'}} scope="col">ID</th>
                              <th style={{'background-color': 'rgb(19, 175, 78)', 'width': '50%'}} scope="col">Titulo</th>
                              <th style={{'background-color': 'rgb(19, 175, 78)', 'width': '10%'}} scope="col">Acciones</th>
                         </tr> 
                    </thead>
                    <tbody>
                         {this.mostrarPosts() }
                    </tbody>
               </table>
           )
     }
}
 
