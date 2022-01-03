import React, { useState, useEffect, useRef } from 'react';
import logo from '../img/fondo.jpeg'



export const Dashboard = () => {

    return (
        <div className="grid center">
            <div className='container'>
                <h1 style={{ textAlign:'center',marginTop:'10%'}}>Sistema De Apoyo a la Empresa T.I.S</h1>
                <img style={{ width:'100%',margin:'auto',borderRadius:'20px'}} src={logo} />
            </div>

        </div>
    );
}
