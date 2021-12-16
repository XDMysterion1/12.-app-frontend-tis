import React, { useState, useEffect, useRef } from 'react';
import classNames           from 'classnames';
import { DataTable }        from 'primereact/datatable';
import { Column }           from 'primereact/column';
import { Toast }            from 'primereact/toast';
import { Button }           from 'primereact/button';
import { Toolbar }          from 'primereact/toolbar';
import { Dialog }           from 'primereact/dialog';
import { InputText }        from 'primereact/inputtext';
import { InputTextarea }    from 'primereact/inputtextarea';
import { Password }         from 'primereact/password';
import { ColumnGroup }      from 'primereact/columngroup';
import { Row }              from 'primereact/row';
import { Dropdown }         from 'primereact/dropdown';
import { useFormik }        from "formik";

import uniqid               from 'uniqid';

import { getUsers,getUserID,getUsersActivas }   from '../service/apiUser';
import { getEmpresas,createEmpresa,updateEmpresaID,deleteEmpresaID } from '../service/apiEmpresa';

export const Empresa = (props) => {

    let emptyEmpresa = {
        id:              null,
        nombre:          '',
        nombreCorto:     '',
        nombreLargo:     '',
        tipoSociedad:    '',
        direccion:       '',
        email:           '',
        password:        '',
        informacion:     '',
        estado:          '',
        user:            ''
    };
    
    const Sociedades = [
        {name: "Sociedad de Responsabilidad Limitada"       , tipo:"S.R.L."},
        {name: "Sociedad Anónima"                           , tipo:"S.A."},
        {name: "Sociedad Colectiva"                         , tipo:"S.C."},
        {name: "Sociedad Anónima Mixta o de Economía Mixta" , tipo:"S.A.M."},
        {name: "Sociedad en Comandita Simple"               , tipo:"S.C.S."}
    ];

    const estados = [
        { name: "Activo"      },
        { name: "Desactivado" }
    ];

    const [users, setUsers]                             = useState(null);

    const [empresas, setEmpresas]                       = useState(null);
    const [empresaDialog, setEmpresaDialog]             = useState(false);
    const [globalFilter, setGlobalFilter]               = useState('');
    const [loading, setLoading]                         = useState(true);
    const [deleteEmpresaDialog, setDeleteEmpresaDialog] = useState(false);

    const [empresa, setEmpresa]                         = useState(emptyEmpresa);
    const [selectedEmpresas, setSelectedEmpresas]       = useState(null);
    const [submitted, setSubmitted]                     = useState(false);
    const toast                                         = useRef(null);
    const dt                                            = useRef(null);
    const [stateEmpresa,setStateEmpresa]                = useState(false);
    const [emailUpdate, setEmailUpdate]                 = useState("");
    const [empresaUpdate, setEmpresaUpdate]             = useState("");

    const formik = useFormik({
        initialValues: {
            nombre:          '',
            nombreCorto:     '',
            nombreLargo:     '',
            tipoSociedad:    '',
            direccion:       '',
            email:           '',
            password:        '',
            confirmPassword :'',
            informacion:     '',
            estado:          '',
            user:            ''
            
        },
         validate: (data) => {
            let errors = {};
            if(stateEmpresa){
                if (!data.nombre) {
                    errors.nombre = "Se requiere el nombre";
                } else if (data.nombre.length < 2) {
                    errors.nombre = "Como minimo 2 caracteres";
                } else if (data.nombre.length > 30) {
                    errors.nombre = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.nombre)) {
                    errors.nombre = "No se permiten numero o caracteres especiales";
                }else if(!esRepetidoEmpresa(data.nombre) && stateEmpresa === false){
                    errors.nombre = "Ya existe el nombre de la empresa";
                } else if(!esRepetidoUpdateEmpresa(data.nombre,empresaUpdate) && stateEmpresa === true){
                    errors.nombre = "Ya existe el nombre de la empresa";  
                }


                if (!data.nombreCorto) {
                    errors.nombreCorto = "Se requiere el nombre corto";
                } else if (data.nombreCorto.length < 2) {
                    errors.nombreCorto = "Como minimo 2 caracteres";
                } else if (data.nombreCorto.length > 30) {
                    errors.nombreCorto = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.nombreCorto)) {
                    errors.nombreCorto = "No se permiten numero o caracteres especiales";
                }

                if (!data.nombreLargo) {
                    errors.nombreLargo = "Se requiere el nombre largo";
                } else if (data.nombreLargo.length < 2) {
                    errors.nombreLargo = "Como minimo 2 caracteres";
                } else if (data.nombreLargo.length > 50) {
                    errors.nombreLargo = "Como maximo 50 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.nombreLargo)) {
                    errors.nombreLargo = "No se permiten numero o caracteres especiales";
                }

                if (!data.tipoSociedad) {
                    errors.tipoSociedad = "Se requiere el tipo de sociedad";
                } else if (data.tipoSociedad.length < 2) {
                    errors.tipoSociedad = "Como minimo 2 caracteres";
                } else if (data.tipoSociedad.length > 30) {
                    errors.tipoSociedad = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z.\s]+$/i.test(data.tipoSociedad)) {
                    errors.tipoSociedad = "No se permiten numero o caracteres especiales";
                }

                if (!data.direccion) {
                    errors.direccion = "Se requiere la direccion";
                } else if (data.direccion.length < 2) {
                    errors.direccion = "Como minimo 2 caracteres";
                } else if (data.direccion.length > 50) {
                    errors.direccion = "Como maximo 50 caracteres";
                }else if (!/^^[a-zA-Z0-9.\s]+$/i.test(data.direccion)) {
                    errors.direccion = "No se permiten numero o caracteres especiales";
                }

                if (!data.email) {
                    errors.email = "Se requiere el correo electronico";
                } else if (data.email.length > 255) {
                    errors.email = "Como maximo 255 caracteres";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                    errors.email = 'Dirección de correo electrónico inválida. P.ej. ejemplo@email.com';
                }else if(!esRepetido(data.email) && stateEmpresa === false){
                    errors.email = "Ya existe el correo electronico";
                } else if(!esRepetidoUpdate(data.email,emailUpdate) && stateEmpresa === true){
                    errors.email = "Ya existe el correo electronico";  
                }

                if (!data.password) {
                    errors.password = "Se requiere la contraseña";
                } else if (data.password.length < 6) {
                    errors.password = "Como minimo 6 caracteres";
                } else if (data.password.length > 255) {
                    errors.password = "Como maximo 255 caracteres";
                }

                if (!data.confirmPassword) {
                    errors.confirmPassword = "Se requiere la confirmacion de la contraseña";
                }else if (data.confirmPassword != data.password) {
                    errors.confirmPassword = "Las contraseñas deben coincidir";
                } 

                if (!data.informacion) {
                    errors.informacion = "Se requiere la informacion de la empresa";
                } else if (data.informacion.length < 2) {
                    errors.informacion = "Como minimo 2 caracteres";
                } else if (data.informacion.length > 255) {
                    errors.informacion = "Como maximo 255 caracteres";
                } else if (!/^^[a-zA-Z0-9.\s]+$/i.test(data.informacion)) {
                    errors.informacion = "No se permiten numero o caracteres especiales";
                }

                if (!data.user) {
                    errors.user = "Se requiere el usuario";
                } else if (data.user.length < 2) {
                    errors.user = "Como minimo 2 caracteres";
                } else if (data.user.length > 30) {
                    errors.user = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.user)) {
                    errors.user = "No se permiten numero o caracteres especiales";
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

            }else{
                if (!data.nombre) {
                    errors.nombre = "Se requiere el nombre";
                } else if (data.nombre.length < 2) {
                    errors.nombre = "Como minimo 2 caracteres";
                } else if (data.nombre.length > 30) {
                    errors.nombre = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.nombre)) {
                    errors.nombre = "No se permiten numero o caracteres especiales";
                }else if(!esRepetidoEmpresa(data.nombre) && stateEmpresa === false){
                    errors.nombre = "Ya existe el nombre de la empresa";
                } else if(!esRepetidoUpdateEmpresa(data.nombre,empresaUpdate) && stateEmpresa === true){
                    errors.nombre = "Ya existe el nombre de la empresa";  
                }


                if (!data.nombreCorto) {
                    errors.nombreCorto = "Se requiere el nombre corto";
                } else if (data.nombreCorto.length < 2) {
                    errors.nombreCorto = "Como minimo 2 caracteres";
                } else if (data.nombreCorto.length > 30) {
                    errors.nombreCorto = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.nombreCorto)) {
                    errors.nombreCorto = "No se permiten numero o caracteres especiales";
                }

                if (!data.nombreLargo) {
                    errors.nombreLargo = "Se requiere el nombre largo";
                } else if (data.nombreLargo.length < 2) {
                    errors.nombreLargo = "Como minimo 2 caracteres";
                } else if (data.nombreLargo.length > 50) {
                    errors.nombreLargo = "Como maximo 50 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.nombreLargo)) {
                    errors.nombreLargo = "No se permiten numero o caracteres especiales";
                }

                if (!data.tipoSociedad) {
                    errors.tipoSociedad = "Se requiere el tipo de sociedad";
                } else if (data.tipoSociedad.length < 2) {
                    errors.tipoSociedad = "Como minimo 2 caracteres";
                } else if (data.tipoSociedad.length > 30) {
                    errors.tipoSociedad = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z.\s]+$/i.test(data.tipoSociedad)) {
                    errors.tipoSociedad = "No se permiten numero o caracteres especiales";
                }

                if (!data.direccion) {
                    errors.direccion = "Se requiere la direccion";
                } else if (data.direccion.length < 2) {
                    errors.direccion = "Como minimo 2 caracteres";
                } else if (data.direccion.length > 50) {
                    errors.direccion = "Como maximo 50 caracteres";
                }else if (!/^^[a-zA-Z0-9.\s]+$/i.test(data.direccion)) {
                    errors.direccion = "No se permiten numero o caracteres especiales";
                }

                if (!data.email) {
                    errors.email = "Se requiere el correo electronico";
                } else if (data.email.length > 255) {
                    errors.email = "Como maximo 255 caracteres";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                    errors.email = 'Dirección de correo electrónico inválida. P.ej. ejemplo@email.com';
                }else if(!esRepetido(data.email) && stateEmpresa === false){
                    errors.email = "Ya existe el correo electronico";
                } else if(!esRepetidoUpdate(data.email,emailUpdate) && stateEmpresa === true){
                    errors.email = "Ya existe el correo electronico";  
                }

                if (!data.password) {
                    errors.password = "Se requiere la contraseña";
                } else if (data.password.length < 6) {
                    errors.password = "Como minimo 6 caracteres";
                } else if (data.password.length > 255) {
                    errors.password = "Como maximo 255 caracteres";
                }

                if (!data.confirmPassword) {
                    errors.confirmPassword = "Se requiere la confirmacion de la contraseña";
                }else if (data.confirmPassword != data.password) {
                    errors.confirmPassword = "Las contraseñas deben coincidir";
                } 

                if (!data.informacion) {
                    errors.informacion = "Se requiere la informacion de la empresa";
                } else if (data.informacion.length < 2) {
                    errors.informacion = "Como minimo 2 caracteres";
                } else if (data.informacion.length > 255) {
                    errors.informacion = "Como maximo 255 caracteres";
                } else if (!/^^[a-zA-Z0-9.\s]+$/i.test(data.informacion)) {
                    errors.informacion = "No se permiten numero o caracteres especiales";
                }

                if (!data.user) {
                    errors.user = "Se requiere el usuario";
                } else if (data.user.length < 2) {
                    errors.user = "Como minimo 2 caracteres";
                } else if (data.user.length > 30) {
                    errors.user = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.user)) {
                    errors.user = "No se permiten numero o caracteres especiales";
                } 
            }


            return errors;
        },

        onSubmit: (data) => {
            if(submitted === true){
                let _empresas = [...empresas];
                let _empresa  = {...empresa };
                _empresa['nombre']            = data.nombre;
                _empresa['nombreCorto']       = data.nombreCorto;
                _empresa['nombreLargo']       = data.nombreLargo;
                _empresa['tipoSociedad']      = data.tipoSociedad;
                _empresa['direccion']         = data.direccion;
                _empresa['email']             = data.email;
                _empresa['password']          = data.password;
                _empresa['confirmPassword']   = data.confirmPassword;
                _empresa['informacion']       = data.informacion;
                _empresa['estado']            = data.estado;
                _empresa['user']              = data.user;


                if (_empresa.nombre.trim()) {
                    if (empresa.id) {

                        setEmpresa({ ...empresa });
                        console.log(empresa);
                        const index = findIndexById(empresa.id);
                        _empresas[index] = _empresa;
                        updateEmpresaID({nombre:`${_empresa.nombre}`,nombreCorto:`${_empresa.nombreCorto}`,nombreLargo:`${_empresa.nombreLargo}`,tipoSociedad:`${_empresa.tipoSociedad}`,direccion:`${_empresa.direccion}`,email:`${_empresa.email}`,password:`${_empresa.password}`,informacion:`${_empresa.informacion}`,estado:`${_empresa.estado}`,user:`${_empresa.user}`},empresa.id);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Actualizado', life: 3000 });
                    }
                    else {

                        _empresa.id     = uniqid("empresa-");
                        _empresa.estado = "Activo"; 
                        _empresas.push(_empresa);
                        createEmpresa({id:`${_empresa.id}`,nombre:`${_empresa.nombre}`,nombreCorto:`${_empresa.nombreCorto}`,nombreLargo:`${_empresa.nombreLargo}`,tipoSociedad:`${_empresa.tipoSociedad}`,direccion:`${_empresa.direccion}`,email:`${_empresa.email}`,password:`${_empresa.password}`,informacion:`${_empresa.informacion}`,estado:`${_empresa.estado}`,user:`${_empresa.user}`});
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Creado', life: 3000 });
                    }
                }
                setEmpresas(_empresas);
                setEmpresaDialog(false);
                setEmpresa(emptyEmpresa);
                formik.resetForm();
        }
            
        },
      });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="ml-1 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };

    const esRepetido =(value)=>{
        var _empresas = [...empresas];
        let res = _empresas.find(i => (i.email).toLowerCase() === (value).toLowerCase() );
         if(res === undefined){
             return true;
         }else{
             return false;
         }
    }
    const esRepetidoUpdate =(value,original)=>{
        var _empresas = [...empresas];
        let aux = _empresas.filter(i =>(i.email).toLowerCase() != (original).toLowerCase())
        let res = aux.find(i => (i.email).toLowerCase() === (value).toLowerCase() );
         if(res === undefined || res === original){
             return true;
         }else{
             return false;
         }
    }

    const esRepetidoEmpresa =(value)=>{
        var _empresas = [...empresas];
        let res = _empresas.find(i => (i.nombre).toLowerCase().trim() === (value).toLowerCase().trim() );
         if(res === undefined){
             return true;
         }else{
             return false;
         }
    }
    const esRepetidoUpdateEmpresa =(value,original)=>{
        var _empresas = [...empresas];
        let aux = _empresas.filter(i =>(i.nombre).toLowerCase().trim() != (original).toLowerCase().trim())
        let res = aux.find(i => (i.nombre).toLowerCase().trim() === (value).toLowerCase().trim() );
         if(res === undefined || res === original){
             return true;
         }else{
             return false;
         }
    }


    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers = () =>{
        getUsersActivas().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Usuarios insertados-----------");
                setUsers(json.data);
            }
        })
    }

    useEffect(()=>{
        fetchEmpresas();
    },[])

    const fetchEmpresas = () =>{
        getEmpresas().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Empresas insertados-----------");
                setEmpresas(json.data);
                setLoading(false);
            }
        })
    }

    const openNew = () => {
        setEmpresa(emptyEmpresa);
        formik.resetForm();
        setSubmitted(false);
        setStateEmpresa(false); 
        setEmpresaDialog(true);    
    }

    const hideDialog = () => {
        setSubmitted(false);
        setEmpresaDialog(false);
    }

    const showDialog = () => {
        setSubmitted(true);
        formik.handleSubmit();
    }

    const hideDeleteEmpresaDialog = () => {
        setDeleteEmpresaDialog(false);
    }

    const editEmpresa = (empresa) => {
        setEmpresa({ ...empresa });
        setSubmitted(true);
        formik.resetForm();
        formik.setValues(
        {
            nombre:         `${empresa.nombre}`,
            nombreCorto:    `${empresa.nombreCorto}`,
            nombreLargo:    `${empresa.nombreLargo}`,
            tipoSociedad:   `${empresa.tipoSociedad}`,
            direccion:      `${empresa.direccion}`,
            email:          `${empresa.email}`,
            password:       `${empresa.password}`,
            confirmPassword:`${empresa.password}`,
            informacion:    `${empresa.informacion}`,
            estado:         `${empresa.estado}`,
            user:           `${empresa.user}`
        });

        setEmailUpdate(`${empresa.email}`);
        setEmpresaUpdate(`${empresa.nombre}`);
        setStateEmpresa(true);
        setEmpresaDialog(true);
    }

    const confirmDeleteEmpresa = (empresa) => {
        setEmpresa(empresa);
        setDeleteEmpresaDialog(true);
    }

    const deleteEmpresa = () => {
        let _empresas = [...empresas];
        let _empresa  = {...empresa };

        if (empresa.email.trim()) {
            if (empresa.id) {
                
                const index = findIndexById(empresa.id);
                _empresas[index] = _empresa;

                updateEmpresaID({nombre:`${_empresa.nombre}`,nombreCorto:`${_empresa.nombreCorto}`,nombreLargo:`${_empresa.nombreLargo}`,tipoSociedad:`${_empresa.tipoSociedad}`,direccion:`${_empresa.direccion}`,email:`${_empresa.email}`,password:`${_empresa.password}`,informacion:`${_empresa.informacion}`,estado:"Desactivado",user:`${_empresa.user}`},empresa.id);
                _empresa['nombre']            = _empresa.nombre;
                _empresa['nombreCorto']       = _empresa.nombreCorto;
                _empresa['nombreLargo']       = _empresa.nombreLargo;
                _empresa['tipoSociedad']      = _empresa.tipoSociedad;
                _empresa['direccion']         = _empresa.direccion;
                _empresa['email']             = _empresa.email;
                _empresa['password']          = _empresa.password;
                _empresa['confirmPassword']   = _empresa.confirmPassword;
                _empresa['informacion']       = _empresa.informacion;
                _empresa['estado']            = "Desactivado";
                _empresa['user']              = _empresa.user;
                setEmpresa({ ...empresa });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Desactivada', life: 3000 });
            }
        }
        setEmpresas(_empresas);
        setEmpresa(emptyEmpresa);
        setDeleteEmpresaDialog(false);
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < empresas.length; i++) {
            if (empresas[i].id === id) {

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

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {rowData.nombre}
            </>
        );
    }

    const nombreCortoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre Corto</span>
                {rowData.nombreCorto}
            </>
        );
    }

    const nombreLargoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre Largo</span>
                {rowData.nombreLargo}
            </>
        );
    }

    const tipoSociedadBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipo Sociedad</span>
                {rowData.tipoSociedad}
                
            </>
        );
    }

    


    const direccionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Direccion</span>
                {rowData.direccion}
               

            </>
        );
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Correo electronico</span>
                {rowData.email}
               

            </>
        );
    }

    const passwordBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">contraseña</span>
                {rowData.password}
               

            </>
        );
    }

    const informacionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Informacion</span>
                {rowData.informacion}
               

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

    const userBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Usuario</span>
                {rowData.user}
               

            </>
        );
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button style={props.layoutColorMode === 'light' ? {'color':'#ffffff','background': '#13af4e'} : {'color':'#ffffff','background': '#13af4e'}} label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" style={{'background': '#13af4e'}} className="p-button-rounded p-button-success mr-2"   onClick={() => editEmpresa(rowData)} />
                <Button icon="pi pi-trash"  style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"        onClick={() => confirmDeleteEmpresa(rowData)} />
            </div>
        );
    }

    const deleteEmpresaDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeleteEmpresaDialog} />
            <Button label="Si" icon="pi pi-check" style={props.layoutColorMode === 'light' ? {'color':'#13af4e','border-color':'#13af4e'} : {'color':'#13af4e','border-color':'#13af4e'}} className="p-button-text" onClick={deleteEmpresa} />
        </>
    );


    const renderHeader = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestion de empresas</h5>
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
                    <Column header={showHeader} colSpan={7}></Column>
                </Row>
                <Row>
                    <Column header="ID"                 field="id"           sortable  style={{ 'background-color': '#13af4e', width:'20%'}} />
                    <Column header="NOMBRE"             field="nombre"       sortable  style={{ 'background-color': '#13af4e', width:'20%'}} />
                    <Column header="SOCIEDAD"           field="tipoSociedad" sortable  style={{ 'background-color': '#13af4e', width:'20%'}} />
                    <Column header="DIRECCION"          field="direccion"    sortable  style={{ 'background-color': '#13af4e', width:'20%'}} />
                    <Column header="CORREO ELECTRONICO" field="email"        sortable  style={{ 'background-color': '#13af4e', width:'25%'}} />
                    <Column header="ESTADO"             field="estado"       sortable  style={{ 'background-color': '#13af4e', width:'20%'}} />
                    <Column header="Editar/Eliminar"                         style={{ 'background-color': '#13af4e', width:'20%'}} />
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();


    const headerDialog =()=>{
        return (stateEmpresa)?"Actualizando Empresa":"Añadir Empresa"
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                
                    <Toast ref={toast} />
                    <Toolbar className="" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={empresas} selection={selectedEmpresas}  onSelectionChange={(e) => setSelectedEmpresas(e.value)}
                        dataKey="id" rowHover paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm p-datatable-gridlines p-datatable-striped"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" resizableColumns columnResizeMode="fit" showGridlines
                        globalFilter={globalFilter} emptyMessage="No se encontro el rol" loading={loading} headerColumnGroup={headerGroup}
                        >
                    
                        <Column style={{width:'20%'}} field="id"              header="ID"                 sortable body={idBodyTemplate}            ></Column>
                        <Column style={{width:'20%'}} field="nombre"          header="NOMBRE"             sortable body={nombreBodyTemplate}        ></Column>
                        <Column style={{width:'20%'}} field="tipoSociedad"    header="SOCIEDAD"           sortable body={tipoSociedadBodyTemplate}  ></Column>
                        <Column style={{width:'20%'}} field="direccion"       header="DIRECCION"          sortable body={direccionBodyTemplate}     ></Column>
                        <Column style={{width:'25%'}} field="email"           header="CORREO ELECTRONICO" sortable body={emailBodyTemplate}         ></Column>
                        <Column style={{width:'20%'}} field="estado"          header="ESTADO"             sortable body={estadoBodyTemplate}          ></Column>

                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={empresaDialog} style={{ width: '450px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText id="nombre" name='nombre' placeholder="Nombre" value={formik.values.nombre} onChange={formik.handleChange} autoFocus/>
                                </div>       
                            </div>
                            {getFormErrorMessage('nombre')}

                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText id="nombreCorto" name='nombreCorto' placeholder="Nombre Corto" value={formik.values.nombreCorto} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            {getFormErrorMessage('nombreCorto')}

                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText id="nombreLargo" name='nombreLargo' placeholder="Nombre Largo" value={formik.values.nombreLargo} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            {getFormErrorMessage('nombreLargo')}

                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-briefcase"></i>
                                        </span>
                                        <Dropdown id="tipoSociedad" name="tipoSociedad" placeholder="Seleccione el tipo de sociedad" value={formik.values.tipoSociedad} onChange={formik.handleChange} options={Sociedades} optionLabel="tipo"  optionValue="tipo"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('tipoSociedad')}

                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-map-marker"></i>
                                        </span>
                                        <InputText id="direccion" name='direccion' placeholder="Direccion" value={formik.values.direccion} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            {getFormErrorMessage('direccion')}


                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/gmail.png' : 'assets/layout/images/gmail-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>  
                                        </span>
                                        <InputText id="email" name='email' placeholder="Correo electronico"  value={formik.values.email} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            {getFormErrorMessage('email')}

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/password.png' : 'assets/layout/images/password-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>  
                                        </span>
                                        <Password id="password" name='password' placeholder="Contraseña"  value={formik.values.password} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('password')}

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/password.png' : 'assets/layout/images/password-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>   
                                        </span>
                                        <Password id="confirmPassword" name='confirmPassword' placeholder="Confirmar contraseña"  value={formik.values.confirmPassword} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('confirmPassword')}

                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-info"></i>
                                        </span>
                                        <InputTextarea id="informacion" name='informacion' placeholder="Informacion" value={formik.values.informacion} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            {getFormErrorMessage('informacion')}

                            {(stateEmpresa)?
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

                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <Dropdown id="user" name="user" placeholder="Seleccione un usuario" value={formik.values.user} onChange={formik.handleChange} options={users} optionLabel="nombre"  optionValue="id"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('user')}



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


                    <Dialog className="mt-2" visible={deleteEmpresaDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmpresaDialogFooter} onHide={hideDeleteEmpresaDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {empresa && <span>¿Estás segura de que quieres eliminar? <b>{empresa.nombre}</b> <b>{empresa.tipoSociedadad}</b>?</span>}
                        </div>
                    </Dialog>
    
                </div>
            </div>
        </div>
    );
}
