import React, { Component } from 'react';
import {Listado} from './Listado';

export class Posts extends Component {
     state = {  }
     render() { 
          return (
               <div className="col-12 col-md-8">
                   
                    <Listado 
                         posts={this.props.posts}
                         borrarPost={this.props.borrarPost}
                    />
               </div>
           );
     }
}
 
