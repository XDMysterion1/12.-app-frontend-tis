import React, { useState, useEffect } from 'react';
import classNames           from 'classnames';
import { Route}             from 'react-router-dom';
import { CSSTransition }    from 'react-transition-group';


import { AppTopbar }        from './AppTopbar';
import { AppFooter }        from './AppFooter';
import { AppMenu }          from './AppMenu';
import { AppConfig }        from './AppConfig';
import { Derechos}          from './Derechos';

import { Dashboard }             from './components/Dashboard';
import { Role }                  from './components/Role';
import { User }                  from './components/User';
import {Empresa}                 from './components/Empresa';
import { Convocatoria }          from './components/Convocatoria';
import { PliegoEspecificacion }  from './components/PliegoEspecificacion';
import { Aviso }                 from './components/Aviso';
import { ListEmpresa }           from './components/ListEmpresa';
import { ListConvocatoria }      from './components/ListConvocatoria';
import { ListPliego }            from './components/ListPliego';
import { Forum }            from './components/Forum';
import { Contrato }             from './components/Contrato';
import { Orden }                from './components/Orden';
import { Plan }                 from './components/Plan';
import { ParteA }               from './components/ParteA';
import { ParteB }               from './components/ParteB';   



import Cookies                   from 'universal-cookie';
import { MenuService }           from './service/Menu';


import PrimeReact           from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';


import './layout/layout.scss';
import './App.scss';


const App = () => {

    const [layoutMode, setLayoutMode]                         = useState('static');
    const [layoutColorMode, setLayoutColorMode]               = useState('light')
    const [inputStyle, setInputStyle]                         = useState('outlined');
    const [ripple, setRipple]                                 = useState(true);
    const [staticMenuInactive, setStaticMenuInactive]         = useState(false);
    const [overlayMenuActive, setOverlayMenuActive]           = useState(false);
    const [mobileMenuActive, setMobileMenuActive]             = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const [menus, setMenus]                                   = useState(null);
    const cookies                                             = new Cookies();
    const menuService = new MenuService();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;


    useEffect(()=>{
        menuService.getMenusAdmin().then(data => setMenus(data));
    },[])

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if(mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    const menu = [
            {
                label: "Home", icon: "pi pi-fw pi-home",
                "items": [{
                    label: "Tablero", icon: "pi pi-fw pi-home", to: "/"
                }]
            },
            {
                label: "Gestion de Roles", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {"label": "Roles", icon: "pi pi-fw pi-users", to: "/Role"}
                   
                ]
            },
            {
                label: "Gestion de Usuario", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {"label": "Usuarios", icon: "pi pi-fw pi-user", to: "/User"}
                ]
            },
            {
                label: "Gestion de Empresa", icon: "pi pi-fw pi-briefcase",
                "items": [
                    {"label": "Empresas", icon: "pi pi-fw pi-briefcase", to: "/Empresa"}
                ]
            },
            {
                label: "Gestion Publicacion", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {"label": "Convocatoria"              , icon: "pi pi-fw pi-id-card"     , to: "/Convocatoria"},
                    {"label": "Pliego de Especificaciones", icon: "pi pi-fw pi-check-square", to: "/PliegoEspecificacion"}
                ]
            },
            {
                label: "Gestion de Firma de Contrato", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {"label": "Firma de contrato"              , icon: "pi pi-fw pi-id-card"     , to: "/Contrato"}
                ]
            },
            {
                label: "Gestion de Orden de Cambio", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {"label": "Orden de cambio"              , icon: "pi pi-fw pi-id-card"     , to: "/Orden"}
                ]
            },
            {
                label: "Gestion de Plan de Pagos", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {"label": "Plan de pagos"              , icon: "pi pi-fw pi-id-card"     , to: "/Plan"}
                ]
            },
            {
                label: "Gestion de Entrega", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {"label": "Parte A"              , icon: "pi pi-fw pi-id-card"     , to: "/ParteA"},
                    {"label": "Parte B"              , icon: "pi pi-fw pi-id-card"     , to: "/ParteB"}
                ]
            },
            {
                label: "Lista de empresas", icon: "pi pi-fw pi-briefcase",
                "items": [
                    {"label": "Empresas", icon: "pi pi-fw pi-briefcase", to: "/ListEmpresa"}
                ]
            },
            {
                label: "Lista de Publicaciones", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {"label": "Convocatoria"              , icon: "pi pi-fw pi-id-card"     , to: "/ListConvocatoria"},
                    {"label": "Pliego de Especificaciones", icon: "pi pi-fw pi-check-square", to: "/ListPliego"}
                ]
            },
            {
                label: "FORO DE DISCUSION", icon: "pi pi-fw pi-sitemap",
                "items": [
                    {label: "Foro", icon: "pi pi-fw pi-users", to: "/Forum"}
                ]
            }
    
    ];

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                       mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}/>

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/"                      exact component={Dashboard}/>
                    <Route path="/Role"                  exact={true} render={props => <Role                 layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/User"                  exact={true} render={props => <User                 layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/Empresa"               exact={true} render={props => <Empresa              layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/Convocatoria"          exact={true} render={props => <Convocatoria         layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/PliegoEspecificacion"  exact={true} render={props => <PliegoEspecificacion layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/Aviso"                 component={Aviso}/>
                    <Route path="/ListEmpresa"           exact={true} render={props => <ListEmpresa          layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/ListConvocatoria"      exact={true} render={props => <ListConvocatoria     layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/ListPliego"            exact={true} render={props => <ListPliego           layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/Forum"            exact={true} render={props => <Forum           layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/Contrato"             exact={true} render={props => <Contrato              layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/Orden"                exact={true} render={props => <Orden                 layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/Plan"                 exact={true} render={props => <Plan                  layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/ParteA"               exact={true} render={props => <ParteA                layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/ParteB"               exact={true} render={props => <ParteB                layoutColorMode={layoutColorMode} {...props} />}/>

                </div>

                <AppFooter layoutColorMode={layoutColorMode}/>
                <Derechos layoutColorMode={layoutColorMode}/>
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                       layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default App;
