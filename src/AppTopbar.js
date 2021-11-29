import React, { useState, useEffect, useRef } from 'react';
import { Link }          from 'react-router-dom';
import classNames        from 'classnames';
import { useHistory }    from 'react-router-dom';
import Cookies           from 'universal-cookie';

export const AppTopbar = (props) => {
    const [login, setLogin]    = useState(false);
    const history              = useHistory();
    const cookies              = new Cookies();
    
    
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
