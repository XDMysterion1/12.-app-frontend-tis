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


import uniqid               from 'uniqid';

import { getUsers,getUserID,createUser,updateUserID,deleteUserID } from '../service/apiUser';
import { getRoles,getRolesActivas }         from '../service/apiRole';

export const Permiso = (props) => {

    let emptyUser = {
        id:       null,
        nombre:   '',
        apellido: '',
        email:    '',
        password: '',
        estado:   '',
        rol:      ''
    };

    const estados = [
        { name: "Activo"      },
        { name: "Desactivado" }
    ];
    
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
            nombre:           "",
            apellido:         "",
            email:            "",
            password:         "",
            confirmPassword : "",
            estado:           "",
            rol:              ""
        },
        
         validate: (data) => {
            
            let errors = {};
            if(stateUser){
                if (!data.nombre) {
                    errors.nombre = "Se requiere el nombre";
                } else if (data.nombre.length < 2) {
                    errors.nombre = "Como minimo 2 caracteres";
                } else if (data.nombre.length > 30) {
                    errors.nombre = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.nombre)) {
                    errors.nombre = "No se permiten numero o caracteres especiales";
                }

                if (!data.apellido) {
                    errors.apellido = "Se requiere el apellido";
                } else if (data.apellido.length < 2) {
                    errors.apellido = "Como minimo 2 caracteres";
                } else if (data.apellido.length > 30) {
                    errors.apellido = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z\s]+$/i.test(data.apellido)) {
                    errors.apellido = "No se permiten numero o caracteres especiales";
                }

                if (!data.email) {
                    errors.email = "Se requiere el correo electronico";
                } else if (data.email.length > 255) {
                    errors.email = "Como maximo 255 caracteres";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                    errors.email = 'Dirección de correo electrónico inválida. P.ej. ejemplo@email.com';
                }else if(!esRepetido(data.email) && stateUser === false){
                    errors.email = "Ya existe el correo electronico";
                } else if(!esRepetidoUpdate(data.email,emailUpdate) && stateUser === true){
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

                if (!data.rol) {
                    errors.rol = "Se requiere el rol";
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
                }

                if (!data.apellido) {
                    errors.apellido = "Se requiere el apellido";
                } else if (data.apellido.length < 2) {
                    errors.apellido = "Como minimo 2 caracteres";
                } else if (data.apellido.length > 30) {
                    errors.apellido = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z\s]+$/i.test(data.apellido)) {
                    errors.apellido = "No se permiten numero o caracteres especiales";
                }

                if (!data.email) {
                    errors.email = "Se requiere el correo electronico";
                } else if (data.email.length > 255) {
                    errors.email = "Como maximo 255 caracteres";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                    errors.email = 'Dirección de correo electrónico inválida. P.ej. ejemplo@email.com';
                }else if(!esRepetido(data.email) && stateUser === false){
                    errors.email = "Ya existe el correo electronico";
                } else if(!esRepetidoUpdate(data.email,emailUpdate) && stateUser === true){
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
                _user['nombre']     = data.nombre;
                _user['apellido']   = data.apellido;
                _user['email']      = data.email;
                _user['password']   = data.password;
                _user['estado']     = data.estado;
                _user['rol']        = data.rol;

                if (_user.nombre.trim()) {
                    if (user.id) {
                        setUser({ ...user });
                        const index = findIndexById(user.id);
                        _users[index] = _user;
                        
                        updateUserID({nombre:`${_user.nombre}`,apellido:`${_user.apellido}`,email:`${_user.email}`,password:`${_user.password}`,estado:`${_user.estado}`,rol:`${_user.rol}`},user.id);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Actualizado', life: 3000 });
                    }
                    else {

                        _user.id = uniqid("user-");
                        _user.estado = "Activo"; 
                        _users.push(_user);
                        
                        createUser({id:`${_user.id}`,nombre:`${_user.nombre}`,apellido:`${_user.apellido}`,email:`${_user.email}`,password:`${_user.password}`,estado:`${_user.estado}`,rol:`${_user.rol}`});
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'usuario Creado', life: 3000 });
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
        getUsers().then(json =>{
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
            {nombre:        `${user.nombre}`,
            apellido:       `${user.apellido}`,
            email:          `${user.email}`,
            password:       `${user.password}`,
            confirmPassword:`${user.password}`,
            estado:         `${user.estado}`,
            rol:            `${user.rol}`
        });
        setEmailUpdate(`${user.email}`);
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

        if (user.email.trim()) {
            if (user.id) {
                
                const index = findIndexById(user.id);
                _users[index] = _user;

                updateUserID({nombre:`${_user.nombre}`,apellido:`${_user.apellido}`,email:`${_user.email}`,password:`${_user.password}`,estado:"Desactivado" ,rol:`${_user.rol}`},user.id);
                _user['nombre']     = _user.nombre;
                _user['apellido']   = _user.apellido;
                _user['email']      = _user.email;
                _user['password']   = _user.password;
                _user['estado']     = "Desactivado";
                _user['rol']        = _user.rol;
                setUser({ ...user });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario desactivado', life: 3000 });
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

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {rowData.nombre}
            </>
        );
    }

    const apellidoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Apellido</span>
                {rowData.apellido}
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
                <span className="p-column-title">Contrasena</span>
                {rowData.password}
                
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
            <h5 className="m-0">Gestion de usuarios</h5>
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
                    <Column header={showHeader} colSpan={6}></Column>
                </Row>
                <Row>
                    <Column header="ID"                 field="id"       sortable style={{ 'background-color': '#13af4e', width:'15%'}} />
                    <Column header="NOMBRE"             field="nombre"   sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="APELLIDO"           field="apellido" sortable style={{ 'background-color': '#13af4e', width:'20%'}} />
                    <Column header="CORREO ELECTRONICO" field="email"    sortable style={{ 'background-color': '#13af4e', width:'60%'}}/>
                    <Column header="ESTADO"             field="estado"   sortable style={{ 'background-color': '#13af4e', width:'10%'}}/>
                    <Column header="Editar/Eliminar"                              style={{ 'background-color': '#13af4e', width:'10%'}}/>
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();

    const headerDialog =()=>{
        return (stateUser?"Actualizando usuario":"Añadir Usuario")
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
                        <Column style={{width:'20%'}} field="nombre"     header="APELLIDO"           sortable body={nombreBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="apellido"   header="NOMBRE"             sortable body={apellidoBodyTemplate}></Column>
                        <Column style={{width:'60%'}} field="email"      header="CORREO ELECTRONICO" sortable body={emailBodyTemplate}></Column>
                        <Column style={{width:'10%'}} field="estado"     header="ESTADO"             sortable body={estadoBodyTemplate}></Column>
                        <Column style={{width:'10%'}} body={actionBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={userDialog} style={{ width: '450px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>
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

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText id="apellido" name='apellido' placeholder="Apellido" value={formik.values.apellido} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            {getFormErrorMessage('apellido')}

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
                                        <Password id="rol" name='confirmPassword' placeholder="Confirmar contraseña"  value={formik.values.confirmPassword} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('confirmPassword')}

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
                            {user && <span>¿Estás segura de que quieres eliminar? <b>{user.nombre}</b> <b>{user.apellido}</b>?</span>}
                        </div>
                    </Dialog>
    
                </div>
            </div>
        </div>
    );
}
