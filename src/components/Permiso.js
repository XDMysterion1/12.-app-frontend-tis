import React, { useState, useEffect, useRef } from 'react';
import classNames           from 'classnames';
import { DataTable }        from 'primereact/datatable';
import { Column }           from 'primereact/column';
import { Toast }            from 'primereact/toast';
import { Button }           from 'primereact/button';
import { Toolbar }          from 'primereact/toolbar';
import { Dialog }           from 'primereact/dialog';
import { InputText }        from 'primereact/inputtext';
import { Password }         from 'primereact/password';
import { ColumnGroup }      from 'primereact/columngroup';
import { Row }              from 'primereact/row';
import { Dropdown }         from 'primereact/dropdown';
import { useFormik }        from "formik";
import { Checkbox }         from 'primereact/checkbox';


import uniqid               from 'uniqid';

import { getItems , getItemId, createItem,updateItemID} from '../service/apiItem';
import { getRoles,getRolesActivas }         from '../service/apiRole';

export const Permiso = (props) => {

    let emptyUser = {
        id:             null,
        home:           '',
        role:           '',
        item:           '',
        user:           '',
        empresa:        '',
        convocatoria:   '',
        pliego:         '',
        contrato:       '',
        orden:          '',
        plan:           '',
        parteA:         '',
        parteB:         '',
        listEmpresa:    '',
        listConv:       '',
        listPliego:     '',
        foro:           '',
        estado:         '',
        rol:            ''
    };

    const estados = [
        { name: "Activo"      },
        { name: "Desactivado" }
    ];

    const estados1  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados2  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados3  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados4  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados5  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados6  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados7  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados8  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados9  = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados10 = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados11 = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados12 = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados13 = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados14 = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados15 = [{ name: "Activo" },{ name: "Desactivado" }];
    const estados16 = [{ name: "Activo" },{ name: "Desactivado" }];

  
    const [roles,setRoles]                           = useState(null);
    const [rol, setRol]                              = useState(null);
    const [users, setUsers]                          = useState(null);
    const [globalFilter, setGlobalFilter]            = useState('');
    const [loading, setLoading]                      = useState(true);
    const [userDialog, setUserDialog]                = useState(false);
    const [deleteUserDialog, setDeleteUserDialog]    = useState(false);

    const [user, setUser]                            = useState(emptyUser);
    const [selectedUsers, setSelectedUsers]          = useState(null);
    const [submitted, setSubmitted]                  = useState(false);
    const toast                                      = useRef(null);
    const dt                                         = useRef(null);
    const [stateUser,setStateUser]                   = useState(false);
    const [emailUpdate, setEmailUpdate]              = useState("");
  
    const formik = useFormik({
        initialValues: {
            home:           '',
            role:           '',
            item:           '',
            user:           '',
            empresa:        '',
            convocatoria:   '',
            pliego:         '',
            contrato:       '',
            orden:          '',
            plan:           '',
            parteA:         '',
            parteB:         '',
            listEmpresa:    '',
            listConv:       '',
            listPliego:     '',
            foro:           '',
            estado:         '',
            rol:            ''
        },
        
         validate: (data) => {
            
            let errors = {};
            if(stateUser){
                if (!data.home) {
                    errors.home = "Se requiere el campo";
                }
                if (!data.role) {
                    errors.role = "Se requiere el campo";
                }
                if (!data.item) {
                    errors.item = "Se requiere el campo";
                }
                if (!data.user) {
                    errors.user = "Se requiere el campo";
                }
                if (!data.empresa) {
                    errors.empresa = "Se requiere el campo";
                }
                if (!data.convocatoria) {
                    errors.convocatoria = "Se requiere el campo";
                }
                if (!data.pliego) {
                    errors.pliego = "Se requiere el campo";
                }
                if (!data.contrato) {
                    errors.contrato = "Se requiere el campo";
                }
                if (!data.orden) {
                    errors.orden = "Se requiere el campo";
                }
                if (!data.plan) {
                    errors.plan = "Se requiere el campo";
                }
                if (!data.parteA) {
                    errors.parteA = "Se requiere el campo";
                }
                if (!data.parteB) {
                    errors.parteB = "Se requiere el campo";
                }
                if (!data.listEmpresa) {
                    errors.listEmpresa = "Se requiere el campo";
                }
                if (!data.listConv) {
                    errors.listConv = "Se requiere el campo";
                }
                if (!data.listPliego) {
                    errors.listPliego = "Se requiere el campo";
                }
                if (!data.foro) {
                    errors.foro = "Se requiere el campo";
                }

                if (!data.estado) {
                    errors.estado = "Se requiere el estado";
                } else if (data.estado.length < 2) {
                    errors.estado = "Como minimo 2 caracteres";
                } else if (data.estado.length > 30) {
                    errors.estado = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.estado)) {
                    errors.estado = "No se permiten numero o caracteres especiales";
                }

                if (!data.rol) {
                    errors.rol = "Se requiere el rol";
                }
            }else{
                if (!data.home) {
                    errors.home = "Se requiere el campo";
                }
                if (!data.role) {
                    errors.role = "Se requiere el campo";
                }
                if (!data.item) {
                    errors.item = "Se requiere el campo";
                }
                if (!data.user) {
                    errors.user = "Se requiere el campo";
                }
                if (!data.empresa) {
                    errors.empresa = "Se requiere el campo";
                }
                if (!data.convocatoria) {
                    errors.convocatoria = "Se requiere el campo";
                }
                if (!data.pliego) {
                    errors.pliego = "Se requiere el campo";
                }
                if (!data.contrato) {
                    errors.contrato = "Se requiere el campo";
                }
                if (!data.orden) {
                    errors.orden = "Se requiere el campo";
                }
                if (!data.plan) {
                    errors.plan = "Se requiere el campo";
                }
                if (!data.parteA) {
                    errors.parteA = "Se requiere el campo";
                }
                if (!data.parteB) {
                    errors.parteB = "Se requiere el campo";
                }
                if (!data.listEmpresa) {
                    errors.listEmpresa = "Se requiere el campo";
                }
                if (!data.listConv) {
                    errors.listConv = "Se requiere el campo";
                }
                if (!data.listPliego) {
                    errors.listPliego = "Se requiere el campo";
                }
                if (!data.foro) {
                    errors.foro = "Se requiere el campo";
                }
               
                if (!data.rol) {
                    errors.rol = "Se requiere el rol";
                }

            }
            return errors;
    
        },
        
        onSubmit: (data ) => {

        
            if(submitted === true){
                let _users = [...users];
                let _user  = {...user };

                _user['home']          = data.home;
                _user['role']          = data.role;
                _user['item']          = data.item;
                _user['user']          = data.user;
                _user['empresa']       = data.empresa;
                _user['convocatoria']  = data.convocatoria;
                _user['pliego']        = data.pliego;
                _user['contrato']      = data.contrato;
                _user['orden']         = data.orden;
                _user['plan']          = data.plan;
                _user['parteA']        = data.parteA;
                _user['parteB']        = data.parteB;
                _user['listEmpresa']   = data.listEmpresa;
                _user['listConv']      = data.listConv;
                _user['listPliego']    = data.listPliego;
                _user['userIcono']     = data.userIcono;
                _user['foro']          = data.foro;
                _user['estado']        = data.estado;
                _user['rol']           = data.rol;

                let _homelabel              = "*";
                let _homeIcono              = "*";
                let _homeItemLabel          = "*"; 
                let _homeItemIcono          = "*"; 
                let _homeItemTo             = "*";
                let _rolelabel              = "*";
                let _roleIcono              = "*";
                let _roleItemLabel          = "*"; 
                let _roleItemIcono          = "*"; 
                let _roleItemTo             = "*";
                let _itemlabel              = "*";
                let _itemIcono              = "*";
                let _itemItemLabel          = "*"; 
                let _itemItemIcono          = "*"; 
                let _itemItemTo             = "*";
                let _userlabel              = "*";
                let _userIcono              = "*";
                let _userItemLabel          = "*"; 
                let _userItemIcono          = "*"; 
                let _userItemTo             = "*"; 
                let _empresalabel           = "*";
                let _empresaIcono           = "*";
                let _empresaItemLabel       = "*"; 
                let _empresaItemIcono       = "*"; 
                let _empresaItemTo          = "*";
                let _convocatorialabel      = "*";
                let _convocatoriaIcono      = "*";
                let _convocatoriaItemLabel  = "*"; 
                let _convocatoriaItemIcono  = "*"; 
                let _convocatoriaItemTo     = "*";
                let _pliegolabel            = "*";
                let _pliegoIcono            = "*";
                let _pliegoItemLabel        = "*"; 
                let _pliegoItemIcono        = "*"; 
                let _pliegoItemTo           = "*";
                let _contratolabel          = "*";
                let _contratoIcono          = "*";
                let _contratoItemLabel      = "*"; 
                let _contratoItemIcono      = "*"; 
                let _contratoItemTo         = "*";
                let _ordenlabel             = "*";
                let _ordenIcono             = "*";
                let _ordenItemLabel         = "*"; 
                let _ordenItemIcono         = "*"; 
                let _ordenItemTo            = "*";
                let _planlabel              = "*";
                let _planIcono              = "*";
                let _planItemLabel          = "*"; 
                let _planItemIcono          = "*"; 
                let _planItemTo             = "*";
                let _parteAlabel            = "*";
                let _parteAIcono            = "*";
                let _parteAItemLabel        = "*"; 
                let _parteAItemIcono        = "*"; 
                let _parteAItemTo           = "*";
                let _parteBlabel            = "*";
                let _parteBIcono            = "*";
                let _parteBItemLabel        = "*"; 
                let _parteBItemIcono        = "*"; 
                let _parteBItemTo           = "*";
                let _listEmpresalabel       = "*";
                let _listEmpresaIcono       = "*";
                let _listEmpresaItemLabel   = "*"; 
                let _listEmpresaItemIcono   = "*"; 
                let _listEmpresaItemTo      = "*";
                let _listConvlabel          = "*";
                let _listConvIcono          = "*";
                let _listConvItemLabel      = "*"; 
                let _listConvItemIcono      = "*"; 
                let _listConvItemTo         = "*";
                let _listPliegolabel        = "*";
                let _listPliegoIcono        = "*";
                let _listPliegoItemLabel    = "*"; 
                let _listPliegoItemIcono    = "*"; 
                let _listPliegoItemTo       = "*";
                let _foroIcono              = "*";
                let _forolabel              = "*";
                let _foroItemLabel          = "*"; 
                let _foroItemIcono          = "*"; 
                let _foroItemTo             = "*";     


                if (_user.rol.trim()) {
                    if (user.id) {
                        setUser({ ...user });
                        const index = findIndexById(user.id);
                        _users[index] = _user;

                        if (data.home === "Activo") {
                            _homelabel     = "Home";
                            _homeIcono     = "pi pi-fw pi-home";
                            _homeItemLabel = "Tablero"; 
                            _homeItemIcono = "pi pi-fw pi-home"; 
                            _homeItemTo    = "pi pi-fw pi-home";  
                        }

                        if (data.role === "Activo") {
                            _rolelabel     = "Gestion de Roles";
                            _roleIcono     = "pi pi-fw pi-sitemap";
                            _roleItemLabel = "Roles"; 
                            _roleItemIcono = "pi pi-fw pi-users"; 
                            _roleItemTo    = "/Role";  
                        }

                        if (data.item === "Activo") {
                            _itemlabel     = "Gestion de Permisos";
                            _itemIcono     = "pi pi-fw pi-globe";
                            _itemItemLabel = "Permisos"; 
                            _itemItemIcono = "pi pi-fw pi-globe"; 
                            _itemItemTo    = "/Permiso";  
                        }

                        if (data.user === "Activo") {
                            _userlabel     = "Gestion de Usuario";
                            _userIcono     = "pi pi-fw pi-sitemap";
                            _userItemLabel = "Usuarios"; 
                            _userItemIcono = "pi pi-fw pi-user"; 
                            _userItemTo    = "/User";  
                        }

                        if (data.empresa === "Activo") {
                            _empresalabel     = "Gestion de Empresa";
                            _empresaIcono     = "pi pi-fw pi-briefcase";
                            _empresaItemLabel = "Empresas"; 
                            _empresaItemIcono = "pi pi-fw pi-briefcase"; 
                            _empresaItemTo    = "/Empresa";  
                        }

                        if (data.convocatoria === "Activo") {
                            _convocatorialabel     = "Gestion Publicacion Convocatoria";
                            _convocatoriaIcono     = "pi pi-fw pi-sitemap";
                            _convocatoriaItemLabel = "Convocatoria"; 
                            _convocatoriaItemIcono = "pi pi-fw pi-id-card"; 
                            _convocatoriaItemTo    = "/Convocatoria";  
                        }

                        if (data.pliego === "Activo") {
                            _pliegolabel     = "Gestion Publicacion Pliego de Especificaciones";
                            _pliegoIcono     = "pi pi-fw pi-sitemap";
                            _pliegoItemLabel = "Pliego de Especificaciones"; 
                            _pliegoItemIcono = "pi pi-fw pi-check-square"; 
                            _pliegoItemTo    = "/PliegoEspecificacion";  
                        }

                        if (data.contrato === "Activo") {
                            _contratolabel     = "Gestion de Firma de Contrato";
                            _contratoIcono     = "pi pi-fw pi-sitemap";
                            _contratoItemLabel = "Firma de contrato"; 
                            _contratoItemIcono = "pi pi-fw pi-id-card"; 
                            _contratoItemTo    = "/Contrato";  
                        }

                        if (data.orden === "Activo") {
                            _ordenlabel     = "Gestion de Orden de Cambio";
                            _ordenIcono     = "pi pi-fw pi-sitemap";
                            _ordenItemLabel = "Orden de cambio"; 
                            _ordenItemIcono = "pi pi-fw pi-id-card"; 
                            _ordenItemTo    = "/Orden";  
                        }

                        if (data.plan === "Activo") {
                            _planlabel     = "Gestion de Plan de Pagos";
                            _planIcono     = "pi pi-fw pi-sitemap";
                            _planItemLabel = "Plan de pagos"; 
                            _planItemIcono = "pi pi-fw pi-id-card"; 
                            _planItemTo    = "/Plan";  
                        }

                        if (data.parteA === "Activo") {
                            _parteAlabel     = "Gestion de Entrega Parte A";
                            _parteAIcono     = "pi pi-fw pi-sitemap";
                            _parteAItemLabel = "Parte A"; 
                            _parteAItemIcono = "pi pi-fw pi-id-card"; 
                            _parteAItemTo    = "/ParteA";  
                        }

                        if (data.parteB === "Activo") {
                            _parteBlabel     = "Gestion de Entrega Parte B";
                            _parteBIcono     = "pi pi-fw pi-sitemap";
                            _parteBItemLabel = "Parte B"; 
                            _parteBItemIcono = "pi pi-fw pi-id-card"; 
                            _parteBItemTo    = "/ParteB";  
                        }

                        if (data.listEmpresa === "Activo") {
                            _listEmpresalabel     = "Lista de empresas";
                            _listEmpresaIcono     = "pi pi-fw pi-briefcase";
                            _listEmpresaItemLabel = "Empresas"; 
                            _listEmpresaItemIcono = "pi pi-fw pi-briefcase"; 
                            _listEmpresaItemTo    = "/ListEmpresa";  
                        }
                        if (data.listConv === "Activo") {
                            _listConvlabel     = "Lista de Publicaciones Convocatorias";
                            _listConvIcono     = "pi pi-fw pi-sitemap";
                            _listConvItemLabel = "Convocatoria"; 
                            _listConvItemIcono = "pi pi-fw pi-id-card"; 
                            _listConvItemTo    = "/ListConvocatoria";  
                        }

                        if (data.listPliego === "Activo") {
                            _listPliegolabel     = "Lista de Publicaciones Pliego de Especificaciones";
                            _listPliegoIcono     = "pi pi-fw pi-sitemap";
                            _listPliegoItemLabel = "Pliego de Especificaciones"; 
                            _listPliegoItemIcono = "pi pi-fw pi-id-card"; 
                            _listPliegoItemTo    = "/ListPliego";  
                        }

                        if (data.foro === "Activo") {
                            _forolabel     = "FORO DE DISCUSION";
                            _foroIcono     = "pi pi-fw pi-sitemap ";
                            _foroItemLabel = "Foro"; 
                            _foroItemIcono = "pi pi-fw pi-users"; 
                            _foroItemTo    = "/Forum";  
                        }
                        updateItemID(
                        {
                            homelabel:              `${_homelabel}`,
                            homeIcono:              `${_homeIcono}`,
                            homeItemLabel:          `${_homeItemLabel}`,
                            homeItemIcono:          `${_homeItemIcono}`,
                            homeItemTo:             `${_homeItemTo}`,
                    
                            rolelabel:              `${_rolelabel}`,
                            roleIcono:              `${_roleIcono}`,
                            roleItemLabel:          `${_roleItemLabel}`,
                            roleItemIcono:          `${_roleItemIcono}`,
                            roleItemTo:             `${_roleItemTo}`,
                    
                            itemlabel:              `${_itemlabel}`,
                            itemIcono:              `${_itemIcono}`,
                            itemItemLabel:          `${_itemItemLabel}`,
                            itemItemIcono:          `${_itemItemIcono}`,
                            itemItemTo:             `${_itemItemTo}`,
                    
                            userlabel:              `${_userlabel}`,
                            userIcono:              `${_userIcono}`,
                            userItemLabel:          `${_userItemLabel}`,
                            userItemIcono:          `${_userItemIcono}`,
                            userItemTo:             `${_userItemTo}`,
                    
                            empresalabel:           `${_empresalabel}`,
                            empresaIcono:           `${_empresaIcono}`,
                            empresaItemLabel:       `${_empresaItemLabel}`,
                            empresaItemIcono:       `${_empresaItemIcono}`,
                            empresaItemTo:          `${_empresaItemTo}`,
                    
                            convocatorialabel:      `${_convocatorialabel}`,
                            convocatoriaIcono:      `${_convocatoriaIcono}`,
                            convocatoriaItemLabel:  `${_convocatoriaItemLabel}`,
                            convocatoriaItemIcono:  `${_convocatoriaItemIcono}`,
                            convocatoriaItemTo:     `${_convocatoriaItemTo}`,

                            pliegolabel:            `${_pliegolabel}`,
                            pliegoIcono:            `${_pliegoIcono}`,
                            pliegoItemLabel:        `${_pliegoItemLabel}`,
                            pliegoItemIcono:        `${_pliegoItemIcono}`,
                            pliegoItemTo:           `${_pliegoItemTo}`,
                    
                            contratolabel:          `${_contratolabel}`,
                            contratoIcono:          `${_contratoIcono}`,
                            contratoItemLabel:      `${_contratoItemLabel}`,
                            contratoItemIcono:      `${_contratoItemIcono}`,
                            contratoItemTo:         `${_contratoItemTo}`,
                    
                            ordenlabel:             `${_ordenlabel}`,
                            ordenIcono:             `${_ordenIcono}`,
                            ordenItemLabel:         `${_ordenItemLabel}`,
                            ordenItemIcono:         `${_ordenItemIcono}`,
                            ordenItemTo:            `${_ordenItemTo}`,
                    
                            planlabel:              `${_planlabel}`,
                            planIcono:              `${_planIcono}`,
                            planItemLabel:          `${_planItemLabel}`,
                            planItemIcono:          `${_planItemIcono}`,
                            planItemTo:             `${_planItemTo}`,
                    
                            parteAlabel:            `${_parteAlabel}`,
                            parteAIcono:            `${_parteAIcono}`,
                            parteAItemLabel:        `${_parteAItemLabel}`,
                            parteAItemIcono:        `${_parteAItemIcono}`,
                            parteAItemTo:           `${_parteAItemTo}`,
                    
                            parteBlabel:            `${_parteBlabel}`,
                            parteBIcono:            `${_parteBIcono}`,
                            parteBItemLabel:        `${_parteBItemLabel}`,
                            parteBItemIcono:        `${_parteBItemIcono}`,
                            parteBItemTo:           `${_parteBItemTo}`,
                    
                            listEmpresalabel:       `${_listEmpresalabel}`,
                            listEmpresaIcono:       `${_listEmpresaIcono}`,
                            listEmpresaItemLabel:   `${_listEmpresaItemLabel}`,
                            listEmpresaItemIcono:   `${_listEmpresaItemIcono}`,
                            listEmpresaItemTo:      `${_listEmpresaItemTo}`,
                    
                            listConvlabel:          `${_listConvlabel}`,
                            listConvIcono:          `${_listConvIcono}`,
                            listConvItemLabel:      `${_listConvItemLabel}`,
                            listConvItemIcono:      `${_listConvItemIcono}`,
                            listConvItemTo:         `${_listConvItemTo}`,
                    
                            listPliegolabel:       `${_listPliegolabel}`,
                            listPliegoIcono:       `${_listPliegoIcono}`,
                            listPliegoItemLabel:   `${_listPliegoItemLabel}`,
                            listPliegoItemIcono:   `${_listPliegoItemIcono}`,
                            listPliegoItemTo:      `${_listPliegoItemTo}`,
                            
                            forolabel:             `${_forolabel}`,
                            foroIcono:             `${_foroIcono}`,
                            foroItemLabel:         `${_foroItemLabel}`,
                            foroItemIcono:         `${_foroItemIcono}`,
                            foroItemTo:            `${_foroItemTo}`,

                            home:                   `${_user.home}`,               
                            role:                   `${_user.role}`,             
                            item:                   `${_user.item}`,             
                            user:                   `${_user.user}`,             
                            empresa:                `${_user.empresa}`,            
                            convocatoria:           `${_user.convocatoria}`,         
                            pliego:                 `${_user.pliego}`,              
                            contrato:               `${_user.contrato}`,            
                            orden:                  `${_user.orden}`,              
                            plan:                   `${_user.plan}`,               
                            parteA:                 `${_user.parteA}`,              
                            parteB:                 `${_user.parteB}`,              
                            listEmpresa:            `${_user.listEmpresa}`,           
                            listConv:               `${_user.listConv}`,            
                            listPliego:             `${_user.listPliego}`,           
                            foro:                   `${_user.foro}`, 

                    
                            estado:                `${_user.estado}`,
                            rol:                   `${_user.rol}`

                        },user.id);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Permiso Actualizado', life: 3000 });
                    }
                    else {
                        _user.id = uniqid("items-");
                        if (data.home === "Activo") {
                            _homelabel     = "Home";
                            _homeIcono     = "pi pi-fw pi-home";
                            _homeItemLabel = "Tablero"; 
                            _homeItemIcono = "pi pi-fw pi-home"; 
                            _homeItemTo    = "pi pi-fw pi-home";  
                        }

                        if (data.role === "Activo") {
                            _rolelabel     = "Gestion de Roles";
                            _roleIcono     = "pi pi-fw pi-sitemap";
                            _roleItemLabel = "Roles"; 
                            _roleItemIcono = "pi pi-fw pi-users"; 
                            _roleItemTo    = "/Role";  
                        }

                        if (data.item === "Activo") {
                            _itemlabel     = "Gestion de Permisos";
                            _itemIcono     = "pi pi-fw pi-globe";
                            _itemItemLabel = "Permisos"; 
                            _itemItemIcono = "pi pi-fw pi-globe"; 
                            _itemItemTo    = "/Permiso";  
                        }

                        if (data.user === "Activo") {
                            _userlabel     = "Gestion de Usuario";
                            _userIcono     = "pi pi-fw pi-sitemap";
                            _userItemLabel = "Usuarios"; 
                            _userItemIcono = "pi pi-fw pi-user"; 
                            _userItemTo    = "/User";  
                        }

                        if (data.empresa === "Activo") {
                            _empresalabel     = "Gestion de Empresa";
                            _empresaIcono     = "pi pi-fw pi-briefcase";
                            _empresaItemLabel = "Empresas"; 
                            _empresaItemIcono = "pi pi-fw pi-briefcase"; 
                            _empresaItemTo    = "/Empresa";  
                        }

                        if (data.convocatoria === "Activo") {
                            _convocatorialabel     = "Gestion Publicacion Convocatoria";
                            _convocatoriaIcono     = "pi pi-fw pi-sitemap";
                            _convocatoriaItemLabel = "Convocatoria"; 
                            _convocatoriaItemIcono = "pi pi-fw pi-id-card"; 
                            _convocatoriaItemTo    = "/Convocatoria";  
                        }

                        if (data.pliego === "Activo") {
                            _pliegolabel     = "Gestion Publicacion Pliego de Especificaciones";
                            _pliegoIcono     = "pi pi-fw pi-sitemap";
                            _pliegoItemLabel = "Pliego de Especificaciones"; 
                            _pliegoItemIcono = "pi pi-fw pi-check-square"; 
                            _pliegoItemTo    = "/PliegoEspecificacion";  
                        }

                        if (data.contrato === "Activo") {
                            _contratolabel     = "Gestion de Firma de Contrato";
                            _contratoIcono     = "pi pi-fw pi-sitemap";
                            _contratoItemLabel = "Firma de contrato"; 
                            _contratoItemIcono = "pi pi-fw pi-id-card"; 
                            _contratoItemTo    = "/Contrato";  
                        }

                        if (data.orden === "Activo") {
                            _ordenlabel     = "Gestion de Orden de Cambio";
                            _ordenIcono     = "pi pi-fw pi-sitemap";
                            _ordenItemLabel = "Orden de cambio"; 
                            _ordenItemIcono = "pi pi-fw pi-id-card"; 
                            _ordenItemTo    = "/Orden";  
                        }

                        if (data.plan === "Activo") {
                            _planlabel     = "Gestion de Plan de Pagos";
                            _planIcono     = "pi pi-fw pi-sitemap";
                            _planItemLabel = "Plan de pagos"; 
                            _planItemIcono = "pi pi-fw pi-id-card"; 
                            _planItemTo    = "/Plan";  
                        }

                        if (data.parteA === "Activo") {
                            _parteAlabel     = "Gestion de Entrega Parte A";
                            _parteAIcono     = "pi pi-fw pi-sitemap";
                            _parteAItemLabel = "Parte A"; 
                            _parteAItemIcono = "pi pi-fw pi-id-card"; 
                            _parteAItemTo    = "/ParteA";  
                        }

                        if (data.parteB === "Activo") {
                            _parteBlabel     = "Gestion de Entrega Parte B";
                            _parteBIcono     = "pi pi-fw pi-sitemap";
                            _parteBItemLabel = "Parte B"; 
                            _parteBItemIcono = "pi pi-fw pi-id-card"; 
                            _parteBItemTo    = "/ParteB";  
                        }

                        if (data.listEmpresa === "Activo") {
                            _listEmpresalabel     = "Lista de empresas";
                            _listEmpresaIcono     = "pi pi-fw pi-briefcase";
                            _listEmpresaItemLabel = "Empresas"; 
                            _listEmpresaItemIcono = "pi pi-fw pi-briefcase"; 
                            _listEmpresaItemTo    = "/ListEmpresa";  
                        }
                        if (data.listConv === "Activo") {
                            _listConvlabel     = "Lista de Publicaciones Convocatorias";
                            _listConvIcono     = "pi pi-fw pi-sitemap";
                            _listConvItemLabel = "Convocatoria"; 
                            _listConvItemIcono = "pi pi-fw pi-id-card"; 
                            _listConvItemTo    = "/ListConvocatoria";  
                        }

                        if (data.listPliego === "Activo") {
                            _listPliegolabel     = "Lista de Publicaciones Pliego de Especificaciones";
                            _listPliegoIcono     = "pi pi-fw pi-sitemap";
                            _listPliegoItemLabel = "Pliego de Especificaciones"; 
                            _listPliegoItemIcono = "pi pi-fw pi-id-card"; 
                            _listPliegoItemTo    = "/ListPliego";  
                        }

                        if (data.foro === "Activo") {
                            _forolabel     = "FORO DE DISCUSION";
                            _foroIcono     = "pi pi-fw pi-sitemap ";
                            _foroItemLabel = "Foro"; 
                            _foroItemIcono = "pi pi-fw pi-users"; 
                            _foroItemTo    = "/Forum";  
                        }
                        _user.estado = "Activo"; 
                        _users.push(_user);

                        createItem(
                        {
                            id:                     `${_user.id}`,
                            homelabel:              `${_homelabel}`,
                            homeIcono:              `${_homeIcono}`,
                            homeItemLabel:          `${_homeItemLabel}`,
                            homeItemIcono:          `${_homeItemIcono}`,
                            homeItemTo:             `${_homeItemTo}`,
                    
                            rolelabel:              `${_rolelabel}`,
                            roleIcono:              `${_roleIcono}`,
                            roleItemLabel:          `${_roleItemLabel}`,
                            roleItemIcono:          `${_roleItemIcono}`,
                            roleItemTo:             `${_roleItemTo}`,
                    
                            itemlabel:              `${_itemlabel}`,
                            itemIcono:              `${_itemIcono}`,
                            itemItemLabel:          `${_itemItemLabel}`,
                            itemItemIcono:          `${_itemItemIcono}`,
                            itemItemTo:             `${_itemItemTo}`,
                    
                            userlabel:              `${_userlabel}`,
                            userIcono:              `${_userIcono}`,
                            userItemLabel:          `${_userItemLabel}`,
                            userItemIcono:          `${_userItemIcono}`,
                            userItemTo:             `${_userItemTo}`,
                    
                            empresalabel:           `${_empresalabel}`,
                            empresaIcono:           `${_empresaIcono}`,
                            empresaItemLabel:       `${_empresaItemLabel}`,
                            empresaItemIcono:       `${_empresaItemIcono}`,
                            empresaItemTo:          `${_empresaItemTo}`,
                    
                            convocatorialabel:      `${_convocatorialabel}`,
                            convocatoriaIcono:      `${_convocatoriaIcono}`,
                            convocatoriaItemLabel:  `${_convocatoriaItemLabel}`,
                            convocatoriaItemIcono:  `${_convocatoriaItemIcono}`,
                            convocatoriaItemTo:     `${_convocatoriaItemTo}`,

                            pliegolabel:            `${_pliegolabel}`,
                            pliegoIcono:            `${_pliegoIcono}`,
                            pliegoItemLabel:        `${_pliegoItemLabel}`,
                            pliegoItemIcono:        `${_pliegoItemIcono}`,
                            pliegoItemTo:           `${_pliegoItemTo}`,
                    
                            contratolabel:          `${_contratolabel}`,
                            contratoIcono:          `${_contratoIcono}`,
                            contratoItemLabel:      `${_contratoItemLabel}`,
                            contratoItemIcono:      `${_contratoItemIcono}`,
                            contratoItemTo:         `${_contratoItemTo}`,
                    
                            ordenlabel:             `${_ordenlabel}`,
                            ordenIcono:             `${_ordenIcono}`,
                            ordenItemLabel:         `${_ordenItemLabel}`,
                            ordenItemIcono:         `${_ordenItemIcono}`,
                            ordenItemTo:            `${_ordenItemTo}`,
                    
                            planlabel:              `${_planlabel}`,
                            planIcono:              `${_planIcono}`,
                            planItemLabel:          `${_planItemLabel}`,
                            planItemIcono:          `${_planItemIcono}`,
                            planItemTo:             `${_planItemTo}`,
                    
                            parteAlabel:            `${_parteAlabel}`,
                            parteAIcono:            `${_parteAIcono}`,
                            parteAItemLabel:        `${_parteAItemLabel}`,
                            parteAItemIcono:        `${_parteAItemIcono}`,
                            parteAItemTo:           `${_parteAItemTo}`,
                    
                            parteBlabel:            `${_parteBlabel}`,
                            parteBIcono:            `${_parteBIcono}`,
                            parteBItemLabel:        `${_parteBItemLabel}`,
                            parteBItemIcono:        `${_parteBItemIcono}`,
                            parteBItemTo:           `${_parteBItemTo}`,
                    
                            listEmpresalabel:       `${_listEmpresalabel}`,
                            listEmpresaIcono:       `${_listEmpresaIcono}`,
                            listEmpresaItemLabel:   `${_listEmpresaItemLabel}`,
                            listEmpresaItemIcono:   `${_listEmpresaItemIcono}`,
                            listEmpresaItemTo:      `${_listEmpresaItemTo}`,
                    
                            listConvlabel:          `${_listConvlabel}`,
                            listConvIcono:          `${_listConvIcono}`,
                            listConvItemLabel:      `${_listConvItemLabel}`,
                            listConvItemIcono:      `${_listConvItemIcono}`,
                            listConvItemTo:         `${_listConvItemTo}`,
                    
                            listPliegolabel:       `${_listPliegolabel}`,
                            listPliegoIcono:       `${_listPliegoIcono}`,
                            listPliegoItemLabel:   `${_listPliegoItemLabel}`,
                            listPliegoItemIcono:   `${_listPliegoItemIcono}`,
                            listPliegoItemTo:      `${_listPliegoItemTo}`,
                            
                            forolabel:             `${_forolabel}`,
                            foroIcono:             `${_foroIcono}`,
                            foroItemLabel:         `${_foroItemLabel}`,
                            foroItemIcono:         `${_foroItemIcono}`,
                            foroItemTo:            `${_foroItemTo}`,

                            home:                   `${_user.home}`,               
                            role:                   `${_user.role}`,             
                            item:                   `${_user.item}`,             
                            user:                   `${_user.user}`,             
                            empresa:                `${_user.empresa}`,            
                            convocatoria:           `${_user.convocatoria}`,         
                            pliego:                 `${_user.pliego}`,              
                            contrato:               `${_user.contrato}`,            
                            orden:                  `${_user.orden}`,              
                            plan:                   `${_user.plan}`,               
                            parteA:                 `${_user.parteA}`,              
                            parteB:                 `${_user.parteB}`,              
                            listEmpresa:            `${_user.listEmpresa}`,           
                            listConv:               `${_user.listConv}`,            
                            listPliego:             `${_user.listPliego}`,           
                            foro:                   `${_user.foro}`, 

                    
                            estado:                `${_user.estado}`,
                            rol:                   `${_user.rol}`
                        });
                        
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Permiso Creado', life: 3000 });
                    }
                }
                setUsers(_users);
                setUserDialog(false);
                setUser(emptyUser);
                formik.resetForm();
        }
            
        },
      });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="ml-1 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };

    const esRepetido =(value)=>{
        var _users = [...users];
        let res = _users.find(i => (i.email).toLowerCase() === (value).toLowerCase() );
         if(res === undefined){
             return true;
         }else{
             return false;
         }
    }
    const esRepetidoUpdate =(value,original)=>{
        var _users = [...users];
        let aux = _users.filter(i =>(i.email).toLowerCase() != (original).toLowerCase());
        let res = aux.find(i => (i.email).toLowerCase() === (value).toLowerCase() );
         if(res === undefined || res === original){
             return true;
         }else{
             return false;
         }
    }


    useEffect(()=>{
        fetchRoles();
    },[])

    const fetchRoles = () =>{
        getRolesActivas().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------roles insertados-----------");
                setRoles(json.data);
            }
        })
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers = () =>{
        getItems().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Users insertados-----------");
                setUsers(json.data);
                setLoading(false);
            }
        })
    }

    const openNew = () => {
        setUser(emptyUser);
        formik.resetForm();
        setSubmitted(false);
        setStateUser(false); 
        setUserDialog(true);    
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const showDialog = () => {
        setSubmitted(true);
        formik.handleSubmit();
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

    const editUser = (user) => {
        setUser({ ...user });
        setSubmitted(true);
        formik.resetForm();
        formik.setValues(
        {
            home:                   `${user.home}`,               
            role:                   `${user.role}`,             
            item:                   `${user.item}`,             
            user:                   `${user.user}`,             
            empresa:                `${user.empresa}`,            
            convocatoria:           `${user.convocatoria}`,         
            pliego:                 `${user.pliego}`,              
            contrato:               `${user.contrato}`,            
            orden:                  `${user.orden}`,              
            plan:                   `${user.plan}`,               
            parteA:                 `${user.parteA}`,              
            parteB:                 `${user.parteB}`,              
            listEmpresa:            `${user.listEmpresa}`,           
            listConv:               `${user.listConv}`,            
            listPliego:             `${user.listPliego}`,           
            foro:                   `${user.foro}`, 
    
            estado:                `${user.estado}`,
            rol:                   `${user.rol}`
        });
        setStateUser(true);
        setUserDialog(true);
    }

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const deleteUser = () => {
        let _users = [...users];
        let _user  = {...user };

        let _homelabel              = "*";
        let _homeIcono              = "*";
        let _homeItemLabel          = "*"; 
        let _homeItemIcono          = "*"; 
        let _homeItemTo             = "*";
        let _rolelabel              = "*";
        let _roleIcono              = "*";
        let _roleItemLabel          = "*"; 
        let _roleItemIcono          = "*"; 
        let _roleItemTo             = "*";
        let _itemlabel              = "*";
        let _itemIcono              = "*";
        let _itemItemLabel          = "*"; 
        let _itemItemIcono          = "*"; 
        let _itemItemTo             = "*";
        let _userlabel              = "*";
        let _userIcono              = "*";
        let _userItemLabel          = "*"; 
        let _userItemIcono          = "*"; 
        let _userItemTo             = "*"; 
        let _empresalabel           = "*";
        let _empresaIcono           = "*";
        let _empresaItemLabel       = "*"; 
        let _empresaItemIcono       = "*"; 
        let _empresaItemTo          = "*";
        let _convocatorialabel      = "*";
        let _convocatoriaIcono      = "*";
        let _convocatoriaItemLabel  = "*"; 
        let _convocatoriaItemIcono  = "*"; 
        let _convocatoriaItemTo     = "*";
        let _pliegolabel            = "*";
        let _pliegoIcono            = "*";
        let _pliegoItemLabel        = "*"; 
        let _pliegoItemIcono        = "*"; 
        let _pliegoItemTo           = "*";
        let _contratolabel          = "*";
        let _contratoIcono          = "*";
        let _contratoItemLabel      = "*"; 
        let _contratoItemIcono      = "*"; 
        let _contratoItemTo         = "*";
        let _ordenlabel             = "*";
        let _ordenIcono             = "*";
        let _ordenItemLabel         = "*"; 
        let _ordenItemIcono         = "*"; 
        let _ordenItemTo            = "*";
        let _planlabel              = "*";
        let _planIcono              = "*";
        let _planItemLabel          = "*"; 
        let _planItemIcono          = "*"; 
        let _planItemTo             = "*";
        let _parteAlabel            = "*";
        let _parteAIcono            = "*";
        let _parteAItemLabel        = "*"; 
        let _parteAItemIcono        = "*"; 
        let _parteAItemTo           = "*";
        let _parteBlabel            = "*";
        let _parteBIcono            = "*";
        let _parteBItemLabel        = "*"; 
        let _parteBItemIcono        = "*"; 
        let _parteBItemTo           = "*";
        let _listEmpresalabel       = "*";
        let _listEmpresaIcono       = "*";
        let _listEmpresaItemLabel   = "*"; 
        let _listEmpresaItemIcono   = "*"; 
        let _listEmpresaItemTo      = "*";
        let _listConvlabel          = "*";
        let _listConvIcono          = "*";
        let _listConvItemLabel      = "*"; 
        let _listConvItemIcono      = "*"; 
        let _listConvItemTo         = "*";
        let _listPliegolabel        = "*";
        let _listPliegoIcono        = "*";
        let _listPliegoItemLabel    = "*"; 
        let _listPliegoItemIcono    = "*"; 
        let _listPliegoItemTo       = "*";
        let _foroIcono              = "*";
        let _forolabel              = "*";
        let _foroItemLabel          = "*"; 
        let _foroItemIcono          = "*"; 
        let _foroItemTo             = "*";     


        if (user.rol.trim()) {
            if (user.id) {
                
                const index = findIndexById(user.id);
                _users[index] = _user;

                _user['home']          = _user.home;
                _user['role']          = _user.role;
                _user['item']          = _user.item;
                _user['user']          = _user.user;
                _user['empresa']       = _user.empresa;
                _user['convocatoria']  = _user.convocatoria;
                _user['pliego']        = _user.pliego;
                _user['contrato']      = _user.contrato;
                _user['orden']         = _user.orden;
                _user['plan']          = _user.plan;
                _user['parteA']        = _user.parteA;
                _user['parteB']        = _user.parteB;
                _user['listEmpresa']   = _user.listEmpresa;
                _user['listConv']      = _user.listConv;
                _user['listPliego']    = _user.listPliego;
                _user['userIcono']     = _user.userIcono;
                _user['foro']          = _user.foro;
                _user['estado']        = _user.estado;
                _user['rol']           = _user.rol;
        

                if (_user.home === "Activo") {
                    _homelabel     = "Home";
                    _homeIcono     = "pi pi-fw pi-home";
                    _homeItemLabel = "Tablero"; 
                    _homeItemIcono = "pi pi-fw pi-home"; 
                    _homeItemTo    = "pi pi-fw pi-home";  
                }

                if (_user.role === "Activo") {
                    _rolelabel     = "Gestion de Roles";
                    _roleIcono     = "pi pi-fw pi-sitemap";
                    _roleItemLabel = "Roles"; 
                    _roleItemIcono = "pi pi-fw pi-users"; 
                    _roleItemTo    = "/Role";  
                }

                if (_user.item === "Activo") {
                    _itemlabel     = "Gestion de Permisos";
                    _itemIcono     = "pi pi-fw pi-globe";
                    _itemItemLabel = "Permisos"; 
                    _itemItemIcono = "pi pi-fw pi-globe"; 
                    _itemItemTo    = "/Permiso";  
                }

                if (_user.user === "Activo") {
                    _userlabel     = "Gestion de Usuario";
                    _userIcono     = "pi pi-fw pi-sitemap";
                    _userItemLabel = "Usuarios"; 
                    _userItemIcono = "pi pi-fw pi-user"; 
                    _userItemTo    = "/User";  
                }

                if (_user.empresa === "Activo") {
                    _empresalabel     = "Gestion de Empresa";
                    _empresaIcono     = "pi pi-fw pi-briefcase";
                    _empresaItemLabel = "Empresas"; 
                    _empresaItemIcono = "pi pi-fw pi-briefcase"; 
                    _empresaItemTo    = "/Empresa";  
                }

                if (_user.convocatoria === "Activo") {
                    _convocatorialabel     = "Gestion Publicacion Convocatoria";
                    _convocatoriaIcono     = "pi pi-fw pi-sitemap";
                    _convocatoriaItemLabel = "Convocatoria"; 
                    _convocatoriaItemIcono = "pi pi-fw pi-id-card"; 
                    _convocatoriaItemTo    = "/Convocatoria";  
                }

                if (_user.pliego === "Activo") {
                    _pliegolabel     = "Gestion Publicacion Pliego de Especificaciones";
                    _pliegoIcono     = "pi pi-fw pi-sitemap";
                    _pliegoItemLabel = "Pliego de Especificaciones"; 
                    _pliegoItemIcono = "pi pi-fw pi-check-square"; 
                    _pliegoItemTo    = "/PliegoEspecificacion";  
                }

                if (_user.contrato === "Activo") {
                    _contratolabel     = "Gestion de Firma de Contrato";
                    _contratoIcono     = "pi pi-fw pi-sitemap";
                    _contratoItemLabel = "Firma de contrato"; 
                    _contratoItemIcono = "pi pi-fw pi-id-card"; 
                    _contratoItemTo    = "/Contrato";  
                }

                if (_user.orden === "Activo") {
                    _ordenlabel     = "Gestion de Orden de Cambio";
                    _ordenIcono     = "pi pi-fw pi-sitemap";
                    _ordenItemLabel = "Orden de cambio"; 
                    _ordenItemIcono = "pi pi-fw pi-id-card"; 
                    _ordenItemTo    = "/Orden";  
                }

                if (_user.plan === "Activo") {
                    _planlabel     = "Gestion de Plan de Pagos";
                    _planIcono     = "pi pi-fw pi-sitemap";
                    _planItemLabel = "Plan de pagos"; 
                    _planItemIcono = "pi pi-fw pi-id-card"; 
                    _planItemTo    = "/Plan";  
                }

                if (_user.parteA === "Activo") {
                    _parteAlabel     = "Gestion de Entrega Parte A";
                    _parteAIcono     = "pi pi-fw pi-sitemap";
                    _parteAItemLabel = "Parte A"; 
                    _parteAItemIcono = "pi pi-fw pi-id-card"; 
                    _parteAItemTo    = "/ParteA";  
                }

                if (_user.parteB === "Activo") {
                    _parteBlabel     = "Gestion de Entrega Parte B";
                    _parteBIcono     = "pi pi-fw pi-sitemap";
                    _parteBItemLabel = "Parte B"; 
                    _parteBItemIcono = "pi pi-fw pi-id-card"; 
                    _parteBItemTo    = "/ParteB";  
                }

                if (_user.listEmpresa === "Activo") {
                    _listEmpresalabel     = "Lista de empresas";
                    _listEmpresaIcono     = "pi pi-fw pi-briefcase";
                    _listEmpresaItemLabel = "Empresas"; 
                    _listEmpresaItemIcono = "pi pi-fw pi-briefcase"; 
                    _listEmpresaItemTo    = "/ListEmpresa";  
                }
                if (_user.listConv === "Activo") {
                    _listConvlabel     = "Lista de Publicaciones Convocatorias";
                    _listConvIcono     = "pi pi-fw pi-sitemap";
                    _listConvItemLabel = "Convocatoria"; 
                    _listConvItemIcono = "pi pi-fw pi-id-card"; 
                    _listConvItemTo    = "/ListConvocatoria";  
                }

                if (_user.listPliego === "Activo") {
                    _listPliegolabel     = "Lista de Publicaciones Pliego de Especificaciones";
                    _listPliegoIcono     = "pi pi-fw pi-sitemap";
                    _listPliegoItemLabel = "Pliego de Especificaciones"; 
                    _listPliegoItemIcono = "pi pi-fw pi-id-card"; 
                    _listPliegoItemTo    = "/ListPliego";  
                }

                if (_user.foro === "Activo") {
                    _forolabel     = "FORO DE DISCUSION";
                    _foroIcono     = "pi pi-fw pi-sitemap ";
                    _foroItemLabel = "Foro"; 
                    _foroItemIcono = "pi pi-fw pi-users"; 
                    _foroItemTo    = "/Forum";  
                }

                updateItemID(
                    {
                    homelabel:              `${_homelabel}`,
                    homeIcono:              `${_homeIcono}`,
                    homeItemLabel:          `${_homeItemLabel}`,
                    homeItemIcono:          `${_homeItemIcono}`,
                    homeItemTo:             `${_homeItemTo}`,
                
                    rolelabel:              `${_rolelabel}`,
                    roleIcono:              `${_roleIcono}`,
                    roleItemLabel:          `${_roleItemLabel}`,
                    roleItemIcono:          `${_roleItemIcono}`,
                    roleItemTo:             `${_roleItemTo}`,
                
                    itemlabel:              `${_itemlabel}`,
                    itemIcono:              `${_itemIcono}`,
                    itemItemLabel:          `${_itemItemLabel}`,
                    itemItemIcono:          `${_itemItemIcono}`,
                    itemItemTo:             `${_itemItemTo}`,
                
                    userlabel:              `${_userlabel}`,
                    userIcono:              `${_userIcono}`,
                    userItemLabel:          `${_userItemLabel}`,
                    userItemIcono:          `${_userItemIcono}`,
                    userItemTo:             `${_userItemTo}`,
                
                    empresalabel:           `${_empresalabel}`,
                    empresaIcono:           `${_empresaIcono}`,
                    empresaItemLabel:       `${_empresaItemLabel}`,
                    empresaItemIcono:       `${_empresaItemIcono}`,
                    empresaItemTo:          `${_empresaItemTo}`,
                
                    convocatorialabel:      `${_convocatorialabel}`,
                    convocatoriaIcono:      `${_convocatoriaIcono}`,
                    convocatoriaItemLabel:  `${_convocatoriaItemLabel}`,
                    convocatoriaItemIcono:  `${_convocatoriaItemIcono}`,
                    convocatoriaItemTo:     `${_convocatoriaItemTo}`,

                    pliegolabel:            `${_pliegolabel}`,
                    pliegoIcono:            `${_pliegoIcono}`,
                    pliegoItemLabel:        `${_pliegoItemLabel}`,
                    pliegoItemIcono:        `${_pliegoItemIcono}`,
                    pliegoItemTo:           `${_pliegoItemTo}`,
                
                    contratolabel:          `${_contratolabel}`,
                    contratoIcono:          `${_contratoIcono}`,
                    contratoItemLabel:      `${_contratoItemLabel}`,
                    contratoItemIcono:      `${_contratoItemIcono}`,
                    contratoItemTo:         `${_contratoItemTo}`,
                
                    ordenlabel:             `${_ordenlabel}`,
                    ordenIcono:             `${_ordenIcono}`,
                    ordenItemLabel:         `${_ordenItemLabel}`,
                    ordenItemIcono:         `${_ordenItemIcono}`,
                    ordenItemTo:            `${_ordenItemTo}`,
                
                    planlabel:              `${_planlabel}`,
                    planIcono:              `${_planIcono}`,
                    planItemLabel:          `${_planItemLabel}`,
                    planItemIcono:          `${_planItemIcono}`,
                    planItemTo:             `${_planItemTo}`,
                
                    parteAlabel:            `${_parteAlabel}`,
                    parteAIcono:            `${_parteAIcono}`,
                    parteAItemLabel:        `${_parteAItemLabel}`,
                    parteAItemIcono:        `${_parteAItemIcono}`,
                    parteAItemTo:           `${_parteAItemTo}`,
                
                    parteBlabel:            `${_parteBlabel}`,
                    parteBIcono:            `${_parteBIcono}`,
                    parteBItemLabel:        `${_parteBItemLabel}`,
                    parteBItemIcono:        `${_parteBItemIcono}`,
                    parteBItemTo:           `${_parteBItemTo}`,
                
                    listEmpresalabel:       `${_listEmpresalabel}`,
                    listEmpresaIcono:       `${_listEmpresaIcono}`,
                    listEmpresaItemLabel:   `${_listEmpresaItemLabel}`,
                    listEmpresaItemIcono:   `${_listEmpresaItemIcono}`,
                    listEmpresaItemTo:      `${_listEmpresaItemTo}`,
                
                    listConvlabel:          `${_listConvlabel}`,
                    listConvIcono:          `${_listConvIcono}`,
                    listConvItemLabel:      `${_listConvItemLabel}`,
                    listConvItemIcono:      `${_listConvItemIcono}`,
                    listConvItemTo:         `${_listConvItemTo}`,
                
                    listPliegolabel:       `${_listPliegolabel}`,
                    listPliegoIcono:       `${_listPliegoIcono}`,
                    listPliegoItemLabel:   `${_listPliegoItemLabel}`,
                    listPliegoItemIcono:   `${_listPliegoItemIcono}`,
                    listPliegoItemTo:      `${_listPliegoItemTo}`,
                        
                    forolabel:             `${_forolabel}`,
                    foroIcono:             `${_foroIcono}`,
                    foroItemLabel:         `${_foroItemLabel}`,
                    foroItemIcono:         `${_foroItemIcono}`,
                    foroItemTo:            `${_foroItemTo}`,

                    home:                   `${_user.home}`,               
                    role:                   `${_user.role}`,             
                    item:                   `${_user.item}`,             
                    user:                   `${_user.user}`,             
                    empresa:                `${_user.empresa}`,            
                    convocatoria:           `${_user.convocatoria}`,         
                    pliego:                 `${_user.pliego}`,              
                    contrato:               `${_user.contrato}`,            
                    orden:                  `${_user.orden}`,              
                    plan:                   `${_user.plan}`,               
                    parteA:                 `${_user.parteA}`,              
                    parteB:                 `${_user.parteB}`,              
                    listEmpresa:            `${_user.listEmpresa}`,           
                    listConv:               `${_user.listConv}`,            
                    listPliego:             `${_user.listPliego}`,           
                    foro:                   `${_user.foro}`,
                    estado:                "Desactivado",
                    rol:                   `${_user.rol}`

                    },user.id);
                

                _user['estado']     = "Desactivado";
                _user['rol']        = _user.rol;

                setUser({ ...user });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Permiso desactivado', life: 3000 });
            }
        }
        setUsers(_users);
        setUser(emptyUser);
        setDeleteUserDialog(false);
        
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {

                index = i;
                break;
            }
        }

        return index;
    }

  
    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">id</span>
                {rowData.id}
            </>
        );
    }

    const estadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado</span>
                {rowData.estado}
            </>
        );
    }

    const rolBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Rol</span>
                {rowData.rol}
            </>
        );
    }

    const findRol = (rolFind) => {
        
        var _roles = [...roles]

        let res = _roles.find(el => el.id === rolFind);
        console.log(res["rol"]);
        return res;
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button style={props.layoutColorMode === 'light' ? {'color':'#ffffff','background': '#13af4e'} : {'color':'#ffffff','background': '#13af4e'}} label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew}/>
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" style={{'background': '#13af4e'}} className="p-button-rounded p-button-success mr-2"   onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash"  style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"        onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    }

    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Si" icon="pi pi-check" style={props.layoutColorMode === 'light' ? {'color':'#13af4e','border-color':'#13af4e'} : {'color':'#13af4e','border-color':'#13af4e'}} className="p-button-text" onClick={deleteUser} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestion de permisos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
        )
    }

    const renderGroup = () => {
        return (
            <ColumnGroup>
                <Row>
                    <Column header={showHeader} colSpan={4}></Column>
                </Row>
                <Row>
                    <Column header="ID"                 field="id"       sortable style={{ 'background-color': '#13af4e', width:'15%'}} />
                    <Column header="ESTADO"             field="estado"   sortable style={{ 'background-color': '#13af4e', width:'10%'}}/>
                    <Column header="ROL"                field="rol"      sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="Editar/Eliminar"                              style={{ 'background-color': '#13af4e', width:'10%'}}/>
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();

    const headerDialog =()=>{
        return (stateUser?"Actualizando permiso":"Añadir permiso")
    }

    return (
        
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={users} selection={selectedUsers}  onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="id" rowHover paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm p-datatable-gridlines p-datatable-striped"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" resizableColumns columnResizeMode="fit" showGridlines
                        globalFilter={globalFilter} emptyMessage="No se encontro el rol" loading={loading} headerColumnGroup={headerGroup}
                        >
                    
                        <Column style={{width:'15%'}} field="id"         header="ID"                 sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'10%'}} field="estado"     header="ESTADO"             sortable body={estadoBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="rol"        header="ROL"                sortable body={rolBodyTemplate}></Column>
                        <Column style={{width:'10%'}} body={actionBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={userDialog} style={{ width: '450px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-field mt-2">
                                <div className="flex">
                                    <h7>TABLERO</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-home"></i>
                                        </span>
                                        <Dropdown id="home" name="home" placeholder="Seleccione un estado" value={formik.values.home} onChange={formik.handleChange} options={estados1} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('home')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE ROLES</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-users"></i>
                                        </span>
                                        <Dropdown id="role" name="role" placeholder="Seleccione un estado" value={formik.values.role} onChange={formik.handleChange} options={estados2} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('role')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE PERMISOS</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-globe"></i>
                                        </span>
                                        <Dropdown id="item" name="item" placeholder="Seleccione un estado" value={formik.values.item} onChange={formik.handleChange} options={estados3} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('item')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE USUARIOS</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-user"></i>
                                        </span>
                                        <Dropdown id="user" name="user" placeholder="Seleccione un estado" value={formik.values.user} onChange={formik.handleChange} options={estados4} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('user')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE EMPRESAS</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-briefcase"></i>
                                        </span>
                                        <Dropdown id="empresa" name="empresa" placeholder="Seleccione un estado" value={formik.values.empresa} onChange={formik.handleChange} options={estados5} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('empresa')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE CONVOCATORIAS</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-id-card"></i>
                                        </span>
                                        <Dropdown id="convocatoria" name="convocatoria" placeholder="Seleccione un estado" value={formik.values.convocatoria} onChange={formik.handleChange} options={estados6} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('convocatoria')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE PLIEGO DE ESPECIFICACIONES</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-check-square"></i>
                                        </span>
                                        <Dropdown id="pliego" name="pliego" placeholder="Seleccione un estado" value={formik.values.pliego} onChange={formik.handleChange} options={estados7} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('pliego')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE FIRMA DE CONTRATO</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-id-card"></i>
                                        </span>
                                        <Dropdown id="contrato" name="contrato" placeholder="Seleccione un estado" value={formik.values.contrato} onChange={formik.handleChange} options={estados8} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('contrato')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE ORDEN DE CAMBIO</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-id-card"></i>
                                        </span>
                                        <Dropdown id="orden" name="orden" placeholder="Seleccione un estado" value={formik.values.orden} onChange={formik.handleChange} options={estados9} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('orden')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE PLAN DE PAGOS</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-id-card"></i>
                                        </span>
                                        <Dropdown id="plan" name="plan" placeholder="Seleccione un estado" value={formik.values.plan} onChange={formik.handleChange} options={estados10} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('plan')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE ENTRAGA PARTE A</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-id-card"></i>
                                        </span>
                                        <Dropdown id="parteA" name="parteA" placeholder="Seleccione un estado" value={formik.values.parteA} onChange={formik.handleChange} options={estados11} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('parteA')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>GESTION DE ENTRAGA PARTE B</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-id-card"></i>
                                        </span>
                                        <Dropdown id="parteB" name="parteB" placeholder="Seleccione un estado" value={formik.values.parteB} onChange={formik.handleChange} options={estados12} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('parteB')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>LISTA DE EMPRESAS</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-briefcase"></i>
                                        </span>
                                        <Dropdown id="listEmpresa" name="listEmpresa" placeholder="Seleccione un estado" value={formik.values.listEmpresa} onChange={formik.handleChange} options={estados13} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('listEmpresa')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>LISTA DE CONVOCATORIAS</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-id-card"></i>
                                        </span>
                                        <Dropdown id="listConv" name="listConv" placeholder="Seleccione un estado" value={formik.values.listConv} onChange={formik.handleChange} options={estados14} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('listConv')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>LISTA DE PLIEGO DE ESPECIFICACIONES</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-check-square"></i>
                                        </span>
                                        <Dropdown id="listPliego" name="listPliego" placeholder="Seleccione un estado" value={formik.values.listPliego} onChange={formik.handleChange} options={estados15} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('listPliego')}

                            <div className="p-field mt-2">
                                <div className="flex ">
                                    <h7>FORO DE DISCUCION</h7>
                                </div>
                            </div>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-fw pi-users"></i>
                                        </span>
                                        <Dropdown id="foro" name="foro" placeholder="Seleccione un estado" value={formik.values.foro} onChange={formik.handleChange} options={estados16} optionLabel="name"  optionValue="name"/> 
                                </div>       
                            </div>
                            {getFormErrorMessage('foro')}

 
                            {(stateUser)?
                                <div className="form-group">
                                    <div className="p-field mt-2">
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/estado.png' : 'assets/layout/images/estado-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <Dropdown id="estado" name="estado" placeholder="Seleccione un estado" value={formik.values.estado} onChange={formik.handleChange} options={estados} optionLabel="name"  optionValue="name"/> 
                                        </div>       
                                    </div>
                                    {getFormErrorMessage('estado')}
                                </div>
                            :
                                null
                            }

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/rol.png' : 'assets/layout/images/rol-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>   
                                        </span>
                                        <Dropdown id="rol" name="rol" placeholder="Seleccione un rol" value={formik.values.rol} onChange={formik.handleChange} options={roles} optionLabel="rol"  optionValue="id"/>   
                                </div>       
                            </div>
                            {getFormErrorMessage('rol')}

                            <div className='mt-2'>
                                <div className="flex justify-content-center flex-wrap">
                                    <div className="flex align-items-center justify-content-center  m-2">
                                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} style={props.layoutColorMode === 'light' ? {'color':'#d13639','border-color':'#d13639'} : {'color':'#d13639','border-color':'#d13639'}}/>
                                    </div>
                                    <div className="flex align-items-center justify-content-center  m-2">
                                        <Button label="Guardar"  icon="pi pi-check" type="submit" className="p-button-text" onClick={showDialog} style={{'background': '#13af4e','color':'#ffffff'}}/>  
                                    </div>
                                </div>
                            </div>

                        </form>
                    </Dialog>


                    <Dialog className="mt-2" visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>¿Estás segura de que quieres eliminar? <b>{user.id}</b> <b>{user.rol}</b>?</span>}
                        </div>
                    </Dialog>
    
                </div>
            </div>
        </div>
    );
}
