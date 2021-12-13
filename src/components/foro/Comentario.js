import React, { Component } from 'react';
import {ListadoCometario}from './ListadoCometario'
import { FormularioComentario } from './FormularioComentario';
import swal from 'sweetalert2'

import axios from 'axios';

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
                    <FormularioComentario

                        comment={this.props.comment}
                        usuario={this.props.usuario}
                        crearComentario={this.props.crearComentario}
                    />
                </div>
            </>
        );
    }
}