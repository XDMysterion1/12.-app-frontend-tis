import React, { useState, useEffect, useRef } from 'react';
import { Link }          from 'react-router-dom';
import classNames        from 'classnames';
import { Button }        from 'primereact/button';
import { useHistory }    from 'react-router-dom';
import { Sidebar }       from 'primereact/sidebar';
import {LoginApp}        from './components/LoginApp';
import {Register}        from './components/Register';


export const AppTopbar = (props) => {
    const [login, setLogin]    = useState(false);
    const history              = useHistory();
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleLeft , setVisibleLeft]  = useState(false);
    


    const customIconsRight = (
        <React.Fragment>
            <button className="p-sidebar-icon p-link p-mr-1"  onClick={() => setVisibleRight(false)} style={{'background': '#d13639','color':'#ffffff'}}>
                <span className="pi pi-times" />
            </button>
        </React.Fragment>
    );

    const customIconsLeft = (
        <React.Fragment>
            <button className="p-sidebar-icon p-link p-mr-1"  onClick={() => setVisibleLeft(false)} style={{'background': '#d13639','color':'#ffffff'}}>
                <span className="pi pi-times" />
            </button>
        </React.Fragment>
    );
    const handleLogin = () =>{
        history.push('/LoginApp');
    };

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
                <span>MAGIC TECH</span>
            </Link>
                {(login)? 
                 ( 
                    <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                        <li>
                            <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                                <i className="pi pi-calendar"/>
                                <span>Events</span>
                            </button>
                        </li>
                        <li>
                            <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                                <i className="pi pi-cog"/>
                                <span>Settings</span>
                            </button>
                        </li>
                        <li>
                            <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                                <i className="pi pi-user"/>
                                <span>Profile</span>
                            </button>
                        </li>
                    </ul>
                )
                :
                (
                    <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                        <li>
                            <button className="p-link layout-topbar-button"  onClick={() => setVisibleLeft(true)}>
                                <i className="pi pi-user-plus"/>
                                <span>Registrarse</span>
                            </button>
                        </li>
                        <li>
                            <button className="p-link layout-topbar-button"  onClick={() => setVisibleRight(true)}>
                                <i className="pi pi-user"/>
                                <span>Iniciar Sesion</span>
                            </button>
                        </li>
                    </ul>
                ) 
                }
                {         
                    <Sidebar visible={visibleRight} fullScreen onHide={() => setVisibleRight(false)} icons={customIconsRight} showCloseIcon={false}>
                        <LoginApp {...props}/>
                    </Sidebar>
                }
                {
                    <Sidebar visible={visibleLeft} fullScreen  onHide={() => setVisibleLeft(false)} icons={customIconsLeft} showCloseIcon={false}>
                        <Register {...props}/>
                    </Sidebar>
                }

        </div>
    );
}
