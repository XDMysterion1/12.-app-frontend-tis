import React, { useState, useEffect, useRef } from 'react';
import { Link }          from 'react-router-dom';
import classNames        from 'classnames';
import { useHistory }    from 'react-router-dom';
import { Avatar }        from 'primereact/avatar';
import Cookies           from 'universal-cookie';

export const AppTopbar = (props) => {
    const [login, setLogin]    = useState(false);
    const [nombre, setNombre]    = useState(false);
    const history              = useHistory();
    const cookies              = new Cookies();
    
    useEffect(()=>{
        setLogin(cookies.get('isLogin'));
        console.log("--------------login---------------")
        console.log(login);
    },[cookies.get('isLogin')]) 

    useEffect(()=>{

    },[login]) 
    
    const cerraSesion = () => {
        cookies.remove('id');
        cookies.remove('nombre');
        cookies.remove('apellido');
        cookies.remove('email');
        cookies.set('rol' , "rol-kvjva7f6" ,{path: "/"});
        cookies.set('isLogin', false);
        history.push('/Login');
    }

    return (
        <div className="layout-topbar">

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>
        

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <Link to="/" className="layout-topbar-logo ml-6 ">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/MagicTech.png' : 'assets/layout/images/MagicTech.png'} alt="logo" style={{'height': '1.8em','width':'2.0em',}}/>
                {(props.layoutColorMode === 'light')?cookies.set('theme', 'light'):cookies.set('theme', 'dark')}
                <span>MAGIC TECH</span>
            </Link>
                {console.log("---------------login2136546897----------")}
                {console.log(login)}
                {(login === "true")? 
                 ( 
                    <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                        <li >
                            <Avatar icon="pi pi-user" className="" size="large" shape="circle" style={{ backgroundColor: '#13af4e', color: '#ffffff' }} />
                        </li>
                        <li className="m-2 mt-3">
                            {<span><b>{cookies.get('nombre')}</b>  <b>{cookies.get('apellido')}</b></span>}
                        </li>
    
                        <li>
                            <button className="p-link layout-topbar-button" onClick={cerraSesion}>
                                <i className="pi pi-sign-out"/>
                                <span>Cerrar sesion</span>
                            </button>
                        </li>
                    </ul>
                )
                :
                (
                    <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                        <li>
                            <button className="p-link layout-topbar-button"  onClick={() => history.push('/Register')}>
                                <i className="pi pi-user-plus"/>
                                <span>Registrarse</span>
                            </button>
                        </li>
                        <li>
                            <button className="p-link layout-topbar-button"  onClick={() => history.push('/Login')}>
                                <i className="pi pi-user"/>
                                <span>Iniciar Sesion</span>
                            </button>
                        </li>
                    </ul>
                ) 
                }

        </div>
    );
}
