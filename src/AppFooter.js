import React from 'react';
// import "./AppFooter.css"
export const AppFooter = (props) => {

    return (
        <div className='layout-footer grid'>
            
            <div class="col-12 md:col-6 lg:col-3 text-left">        
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/MagicTech.png' : 'assets/layout/images/MagicTech.png'} alt="logo" style={{'height': '3.5em','width':'3.8em',}}/>

            </div>

            <div class="col-12 md:col-6 lg:col-3">
                <h6 className='text-center'>SOBRE NOSOTROS</h6>
                <p>Grupo Empresa de diseño y desarrollo de sitios y aplicaciones web</p>
            </div>

            <div class="col-12 md:col-6 lg:col-3">
                <h6 className='text-center'>INFORMACION CONTACTOS</h6>
                <i className="pi pi-home text-left" style={{'fontSize': '1em'}} > calle 16 de julio # 100 Cochabamba<br></br>  </i> 
                <i className="pi pi-mobile text-left" style={{'fontSize': '1em'}}> +591-67562165            </i>
                <i className="pi pi-envelope text-left" style={{'fontSize': '1em'}}> magictech.tis@gmail.com <br></br></i>
            </div> 
                   

        </div>
        
        

        
    );
}
