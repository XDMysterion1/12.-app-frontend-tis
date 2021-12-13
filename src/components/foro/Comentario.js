import React, { Component } from 'react';
import {ListadoCometario}from './ListadoCometario'

export class Comentario extends Component{

    

    render(){

        return(
            <>
                <div className="col-12 col-md-8">
                    <h2 className="text-center">Comentarios</h2>
                    
                    <ListadoCometario
                        comment={this.props.comment}
                        usuario={this.props.usuario}
                        //borrarPost={this.props.borrarPost}
                    />
                </div>
            </>
        );
    }
}