import React, { useState, useEffect, useRef } from 'react';
import logo from '../img/fondo.jpeg'
import { Fieldset } from 'primereact/fieldset';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel';



export const Dashboard = () => {

    return (
        <div className='card'>
            {/* <div>
                <h1 className='text-center'>Bienvenido al Sistema de Apoyo a la Empresa TIS</h1>
            </div>
            <Divider align='left'/>
            <div>

                <h3>Sistema de apoyo desarrollado para la materia de taller de ingenieria de software</h3>
            </div> */}
            
                <div class="flex flex-column card-container green-container">
                    <div class="flex align-items-center justify-content-center h-4rem font-bold border-round m-2">
                    <h1 className='text-center'>Bienvenido al Sistema de Apoyo a la Empresa TIS</h1>
                    </div>
                    <div class="flex align-items-center justify-content-center h-4rem border-round m-2">
                    <h3>Sistema de apoyo desarrollado para la materia de taller de ingenieria de software</h3>
                    </div>
                    {/* <div class="flex align-items-center justify-content-center h-4rem bg-green-500 font-bold text-white border-round m-2">3</div> */}
                </div>
            
            
            <Fieldset legend="Descripcion">
                <p>Aplicacion web para el asesoramiento de grupos de desarrollo de software, consiste en acompañar el trabajo de un grupo empresa en el desarrollo de software, donde los asesores indican las observaciones del trabajo de un grupo-empresa con el fin de mejorar la calidad de su proceso de desarrollo.</p>
                
            </Fieldset>
            
            
        </div>
    );
}
