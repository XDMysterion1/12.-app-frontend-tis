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
import { Permiso }               from './components/Permiso';
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
import { getItems , getItemId,getItemsRol}   from './service/apiItem';

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
    const [permisos, setPermisos]                             = useState([ 
        {
            label: "Home", icon: "pi pi-fw pi-home",
            items: [{
                label: "Tablero", icon: "pi pi-fw pi-home", to: "/"
            }]
        },
        {
            label: "", icon: "",
            items: [
                {label: "", icon: "", to: ""}
               
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "", icon: "", to: ""}
               
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "", icon: "", to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "", icon: "", to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "" , icon: "", to: ""},
               
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "" , icon: "", to: ""},
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "" , icon: "" , to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "" , icon: "" , to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "" , icon: "" , to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "" , icon: "", to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "", icon: "" , to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "", icon: "", to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "" , icon: "" , to: ""},
                
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "", icon: "", to: ""}
            ]
        },
        {
            label: "", icon: "",
            items: [
                {label: "", icon: "", to: ""}
            ]
        }]);
    const [ripple, setRipple]                                 = useState(true);
    const [staticMenuInactive, setStaticMenuInactive]         = useState(false);
    const [overlayMenuActive, setOverlayMenuActive]           = useState(false);
    const [mobileMenuActive, setMobileMenuActive]             = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const [menus, setMenus]                                   = useState([ 
    {
        label: "Home", icon: "pi pi-fw pi-home",
        items: [{
            label: "Tablero", icon: "pi pi-fw pi-home", to: "/"
        }]
    },
    {
        label: "", icon: "",
        items: [
            {label: "", icon: "", to: ""}
           
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "", icon: "", to: ""}
           
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "", icon: "", to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "", icon: "", to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "" , icon: "", to: ""},
           
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "" , icon: "", to: ""},
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "" , icon: "" , to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "" , icon: "" , to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "" , icon: "" , to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "" , icon: "", to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "", icon: "" , to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "", icon: "", to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "" , icon: "" , to: ""},
            
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "", icon: "", to: ""}
        ]
    },
    {
        label: "", icon: "",
        items: [
            {label: "", icon: "", to: ""}
        ]
    }]);

    const cookies                                             = new Cookies();


    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(()=>{
        let _permisos = [...permisos]
        let etiqueta = ["homelabel", "rolelabel","itemlabel","userlabel","empresalabel","convocatorialabel","pliegolabel","contratolabel","ordenlabel","planlabel","parteAlabel","parteBlabel","listEmpresalabel","listConvlabel","listPliegolabel","forolabel"];




        let data =[    
            {
                label:  `${_permisos[0].homelabel}`, icon:  `${_permisos[0].homeIcono}`,
                items: [{
                    label: `${_permisos[0].homeItemLabel}`, icon: `${_permisos[0].homeItemIcono}`, to: `${_permisos[0].homeItemTo}`
                }]
            },
            
            {
                label:  `${_permisos[0].rolelabel}`, icon:  `${_permisos[0].roleIcono}`,
                items: [{
                    label: `${_permisos[0].roleItemLabel}`, icon: `${_permisos[0].roleItemIcono}`, to: `${_permisos[0].roleItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].itemlabel}`, icon:  `${_permisos[0].itemIcono}`,
                items: [{
                    label: `${_permisos[0].itemItemLabel}`, icon: `${_permisos[0].itemItemIcono}`, to: `${_permisos[0].itemItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].userlabel}`, icon:  `${_permisos[0].userIcono}`,
                items: [{
                    label: `${_permisos[0].userItemLabel}`, icon: `${_permisos[0].userItemIcono}`, to: `${_permisos[0].userItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].empresalabel}`, icon:  `${_permisos[0].empresaIcono}`,
                items: [{
                    label: `${_permisos[0].empresaItemLabel}`, icon: `${_permisos[0].empresaItemIcono}`, to: `${_permisos[0].empresaItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].convocatorialabel}`, icon:  `${_permisos[0].convocatoriaIcono}`,
                items: [{
                    label: `${_permisos[0].convocatoriaItemLabel}`, icon: `${_permisos[0].convocatoriaItemIcono}`, to: `${_permisos[0].convocatoriaItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].pliegolabel}`, icon:  `${_permisos[0].pliegoIcono}`,
                items: [{
                    label: `${_permisos[0].pliegoItemLabel}`, icon: `${_permisos[0].pliegoItemIcono}`, to: `${_permisos[0].pliegoItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].contratolabel}`, icon:  `${_permisos[0].contratoIcono}`,
                items: [{
                    label: `${_permisos[0].contratoItemLabel}`, icon: `${_permisos[0].contratoItemIcono}`, to: `${_permisos[0].contratoItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].ordenlabel}`, icon:  `${_permisos[0].ordenIcono}`,
                items: [{
                    label: `${_permisos[0].ordenItemLabel}`, icon: `${_permisos[0].ordenItemIcono}`, to: `${_permisos[0].ordenItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].planlabel}`, icon:  `${_permisos[0].planIcono}`,
                items: [{
                    label: `${_permisos[0].planItemLabel}`, icon: `${_permisos[0].planItemIcono}`, to: `${_permisos[0].planItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].parteAlabel}`, icon:  `${_permisos[0].parteAIcono}`,
                items: [{
                    label: `${_permisos[0].parteAItemLabel}`, icon: `${_permisos[0].parteAItemIcono}`, to: `${_permisos[0].parteAItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].parteBlabel}`, icon:  `${_permisos[0].parteBIcono}`,
                items: [{
                    label: `${_permisos[0].parteBItemLabel}`, icon: `${_permisos[0].parteBItemIcono}`, to: `${_permisos[0].parteBItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].listEmpresalabel}`, icon:  `${_permisos[0].listEmpresaIcono}`,
                items: [{
                    label: `${_permisos[0].listEmpresaItemLabel}`, icon: `${_permisos[0].listEmpresaItemIcono}`, to: `${_permisos[0].listEmpresaItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].listConvlabel}`, icon:  `${_permisos[0].listConvIcono}`,
                items: [{
                    label: `${_permisos[0].listConvItemLabel}`, icon: `${_permisos[0].listConvItemIcono}`, to: `${_permisos[0].listConvItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].listPliegolabel}`, icon:  `${_permisos[0].listPliegoIcono}`,
                items: [{
                    label: `${_permisos[0].listPliegoItemLabel}`, icon: `${_permisos[0].listPliegoItemIcono}`, to: `${_permisos[0].listPliegoItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].forolabel}`, icon:  `${_permisos[0].foroIcono}`,
                items: [{
                    label: `${_permisos[0].foroItemLabel}`, icon: `${_permisos[0].foroItemIcono}`, to: `${_permisos[0].foroItemTo}`
                }]
            }]
        setMenus(data);
    },[permisos])

    useEffect(()=>{
        fetchPermisos();
    },[])

    const fetchPermisos = () =>{
        
        let rol = cookies.get('rol');
        getItemsRol(rol).then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Permisos insertados-----------");
                setPermisos(json.data);
            }
        })
    }

    const modificandoMenu = () => {
        console.log(permisos);
        let _permisos = [...permisos]
        console.log(_permisos);
        let data =[    
            {
                label:  `${_permisos[0].homelabel}`, icon:  `${_permisos[0].homeIcono}`,
                items: [{
                    label: `${_permisos[0].homeItemLabel}`, icon: `${_permisos[0].homeItemIcono}`, to: `${_permisos[0].homeItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].rolelabel}`, icon:  `${_permisos[0].roleIcono}`,
                items: [{
                    label: `${_permisos[0].roleItemLabel}`, icon: `${_permisos[0].roleItemIcono}`, to: `${_permisos[0].roleItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].itemlabel}`, icon:  `${_permisos[0].itemIcono}`,
                items: [{
                    label: `${_permisos[0].itemItemLabel}`, icon: `${_permisos[0].itemItemIcono}`, to: `${_permisos[0].itemItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].userlabel}`, icon:  `${_permisos[0].userIcono}`,
                items: [{
                    label: `${_permisos[0].userItemLabel}`, icon: `${_permisos[0].userItemIcono}`, to: `${_permisos[0].userItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].empresalabel}`, icon:  `${_permisos[0].empresaIcono}`,
                items: [{
                    label: `${_permisos[0].empresaItemLabel}`, icon: `${_permisos[0].empresaItemIcono}`, to: `${_permisos[0].empresaItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].convocatorialabel}`, icon:  `${_permisos[0].convocatoriaIcono}`,
                items: [{
                    label: `${_permisos[0].convocatoriaItemLabel}`, icon: `${_permisos[0].convocatoriaItemIcono}`, to: `${_permisos[0].convocatoriaItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].pliegolabel}`, icon:  `${_permisos[0].pliegoIcono}`,
                items: [{
                    label: `${_permisos[0].pliegoItemLabel}`, icon: `${_permisos[0].pliegoItemIcono}`, to: `${_permisos[0].pliegoItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].contratolabel}`, icon:  `${_permisos[0].contratoIcono}`,
                items: [{
                    label: `${_permisos[0].contratoItemLabel}`, icon: `${_permisos[0].contratoItemIcono}`, to: `${_permisos[0].contratoItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].ordenlabel}`, icon:  `${_permisos[0].ordenIcono}`,
                items: [{
                    label: `${_permisos[0].ordenItemLabel}`, icon: `${_permisos[0].ordenItemIcono}`, to: `${_permisos[0].ordenItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].planlabel}`, icon:  `${_permisos[0].planIcono}`,
                items: [{
                    label: `${_permisos[0].planItemLabel}`, icon: `${_permisos[0].planItemIcono}`, to: `${_permisos[0].planItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].parteAlabel}`, icon:  `${_permisos[0].parteAIcono}`,
                items: [{
                    label: `${_permisos[0].parteAItemLabel}`, icon: `${_permisos[0].parteAItemIcono}`, to: `${_permisos[0].parteAItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].parteBlabel}`, icon:  `${_permisos[0].parteBIcono}`,
                items: [{
                    label: `${_permisos[0].parteBItemLabel}`, icon: `${_permisos[0].parteBItemIcono}`, to: `${_permisos[0].parteBItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].listEmpresalabel}`, icon:  `${_permisos[0].listEmpresaIcono}`,
                items: [{
                    label: `${_permisos[0].listEmpresaItemLabel}`, icon: `${_permisos[0].listEmpresaItemIcono}`, to: `${_permisos[0].listEmpresaItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].listConvlabel}`, icon:  `${_permisos[0].listConvIcono}`,
                items: [{
                    label: `${_permisos[0].listConvItemLabel}`, icon: `${_permisos[0].listConvItemIcono}`, to: `${_permisos[0].listConvItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].listPliegolabel}`, icon:  `${_permisos[0].listPliegoIcono}`,
                items: [{
                    label: `${_permisos[0].listPliegoItemLabel}`, icon: `${_permisos[0].listPliegoItemIcono}`, to: `${_permisos[0].listPliegoItemTo}`
                }]
            },
            {
                label:  `${_permisos[0].forolabel}`, icon:  `${_permisos[0].foroIcono}`,
                items: [{
                    label: `${_permisos[0].foroItemLabel}`, icon: `${_permisos[0].foroItemIcono}`, to: `${_permisos[0].foroItemTo}`
                }]
            }]

    }


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


    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                       mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}/>
        
            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menus} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/"                      exact component={Dashboard}/>
                    <Route path="/Role"                  exact={true} render={props => <Role                 layoutColorMode={layoutColorMode} {...props} />}/>
                    <Route path="/Permiso"               exact={true} render={props => <Permiso              layoutColorMode={layoutColorMode} {...props} />}/>
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
