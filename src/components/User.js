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
import { Avatar }           from 'primereact/avatar';
import { Dropdown }         from 'primereact/dropdown';
import { useFormik }        from "formik";
import * as Yup             from 'yup';


import gmail                from '../icon/gmail.png';
import password             from '../icon/password.png';
import rolImg               from '../icon/rol.png';


import uniqid               from 'uniqid';

import { getUsers,getUserID,createUser,updateUserID,deleteUserID } from '../service/apiUser';
import { getRoles } from '../service/apiRole';

export const User = () => {

    const [roles,setRoles]                           = useState(null);
    const [rol, setRol]                              = useState(null);
    const [users, setUsers]                          = useState(null);
    const [userDialog, setUserDialog]                = useState(false);
    const [deleteUserDialog, setDeleteUserDialog]    = useState(false);

    const [user, setUser]                            = useState(emptyUser);
    const [selectedUsers, setSelectedUsers]          = useState(null);
    const [submitted, setSubmitted]                  = useState(false);
    const toast                                      = useRef(null);
    const dt                                         = useRef(null);
    const [stateUser,setStateUser]                   = useState(false);


    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Se requiero el nombre")
        .matches(/^^[a-zA-Z\s]+$/, "No se permiten numero o caracteres especiales")
        .min(2, "Como minimo 2 caracteres")
        .max(30, "Como maximo 30 caracteres"),
        apellido: Yup.string().required("Se requiero el apellido")
        .matches(/^^[a-zA-Z\s]+$/, "No se permiten numero o caracteres especiales")
        .min(2, "Como minimo 2 caracteres")
        .max(30, "Como maximo 30 caracteres"),
        email: Yup.string().required("Se requiero el correo electronico")
        .email("Correo electronico no valido")
        .max(255, "Como maximo 30 caracteres")
        .test('is-jimmy','Correo electronico ya existe',(value, context) =>{
         
                var _users = [...users]
                let res = _users.find(i => i.email === value);
                let aux = res;
                
                let state = stateUser;
            
                if(state === false){
                    if(res === undefined){
                        return true;
                    }else{
                        return false;
                    }
                }else if(state === true){
                    if(aux === res){
                        return true;
                    }else{
                        return false;
                    }
                }
                  
        }
            
        ),

        password: Yup.string().required("Se requiero el contraseña")
        .min(6, "Como minimo 6 caracteres")
        .max(255, "Como maximo 30 caracteres"),
        confirmPassword:Yup.string().required("Se requiero confirmar la contraseña")
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")

      });



      const formik = useFormik({
        initialValues: {
            nombre:    "",
            apellido:  "",
            email:     "",
            password:  "",
            confirmPassword : ""
        },
        validationSchema,
        onSubmit: (data) => {
            if(submitted === true){
                let _users = [...users];
                let _user  = {...user };
                _user['nombre']     = data.nombre;
                _user['apellido']   = data.apellido;
                _user['email']      = data.email;
                _user['password']   = data.password;

                if (_user.nombre.trim()) {
                    if (user.id) {

                        setUser({ ...user });
                        console.log(user);
                        const index = findIndexById(user.id);
                        

                        _users[index] = _user;
                        _user.rol=rol.id;
                        updateUserID({nombre:`${_user.nombre}`,apellido:`${_user.apellido}`,email:`${_user.email}`,password:`${_user.password}`,rol:`${rol.id}`},user.id);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Actualizado', life: 3000 });
                    }
                    else {

                        _user.id = uniqid("user-");
                        _user.rol=rol.id; 
                        _users.push(_user);
                        createUser({id:`${_user.id}`,nombre:`${_user.nombre}`,apellido:`${_user.apellido}`,email:`${_user.email}`,password:`${_user.password}`,rol:`${rol.id}`});
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

    let emptyUser = {
        id:       null,
        nombre:     '',
        apellido:     '',
        email:    '',
        password: '',
        rol:      ''
    };

    useEffect(()=>{
        fetchRoles();
    },[])

    const fetchRoles = () =>{
        getRoles().then(json =>{
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
            }
        })
    }

    const openNew = () => {
        setUser(emptyUser);
        formik.resetForm();
        setSubmitted(false);
        

        setUserDialog(true);
        setStateUser(false); 
        console.log(stateUser);        
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
        
        formik.setValues(
            {nombre:`${user.nombre}`,
            apellido:`${user.apellido}`,
            email:`${user.email}`,
            password:`${user.password}`,
            confirmPassword:`${user.password}`,
        });
        let r = findRol(`${user.rol}`);
        
        setRol(r);
        user.rol=`${user.rol}`;
        setStateUser(true);
        setUserDialog(true);
    }

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const deleteUser = () => {
        let _users = users.filter(val => val.id !== user.id);
        setUsers(_users);
        setDeleteUserDialog(false);

        if (user.email.trim()) {
            if (user.id) {
                deleteUserID(user.id);
            }
        }
        setUser(emptyUser);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Eliminado', life: 3000 });
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

    const onRolChange = (e) => {
        setRol(e.value);
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
                <Button style={{'background': '#13af4e'}} label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" style={{'background': '#13af4e'}} className="p-button-rounded p-button-success p-mr-2"   onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash"  style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"          onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    }

    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Si" icon="pi pi-check" style={{'background': '#13af4e','color':'#ffffff'}} className="p-button-text" onClick={deleteUser} />
        </>
    );


    let headerGroup = <ColumnGroup>
                        <Row>
                            <Column header="ID"                 style={{ 'background-color': '#13af4e', width:'20%'}} />
                            <Column header="NOMBRE"             style={{ 'background-color': '#13af4e', width:'20%'}}/>
                            <Column header="APELLIDO"           style={{ 'background-color': '#13af4e', width:'20%'}} />
                            <Column header="CORREO ELECTRONICO" style={{ 'background-color': '#13af4e', width:'40%'}}/>
                            <Column header="CONTRASENA"         style={{ 'background-color': '#13af4e', width:'20%'}} />
                            <Column header="ROL"                style={{ 'background-color': '#13af4e', width:'20%'}}/>
                            <Column header="Editar/Eliminar"    style={{ 'background-color': '#13af4e', width:'20%'}}/>
                        </Row>
                    </ColumnGroup>;


    const headerDialog =()=>{
        return (stateUser)?"Actualizando usuario":"Añadir Usuario"
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                
                    <Toast ref={toast} />
                    <Toolbar className="" left={leftToolbarTemplate}></Toolbar>

                    <DataTable headerColumnGroup={headerGroup} ref={dt} value={users} selection={selectedUsers}  onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm col-12"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" resizableColumns columnResizeMode="fit" showGridlines>
                    
                        <Column style={{width:'20%'}} field="id"         header="ID"                 sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="apellido"   header="APELLIDO"           sortable body={nombreBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="nombre"     header="NOMBRE"             sortable body={apellidoBodyTemplate}></Column>
                        <Column style={{width:'40%'}} field="email"      header="CORREO ELECTRONICO" sortable body={emailBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="password"   header="CONTRASENA"         sortable body={passwordBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="rol"        header="ROL"                sortable body={rolBodyTemplate}></Column>
                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>

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
                            <small className="p-invalid" style={{'color': '#ff0000'}}>{formik.errors.nombre ? formik.errors.nombre : null}</small>

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText id="apellido" name='apellido' placeholder="Apellido" value={formik.values.apellido} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            <small className="p-invalid" style={{'color': '#ff0000'}}>{formik.errors.apellido ? formik.errors.apellido : null}</small>

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <Avatar image={gmail} style={{'height': '1.2em','width':'1.2em',}}/>   
                                        </span>
                                        <InputText id="email" name='email' placeholder="Correo electronico"  value={formik.values.email} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            <small className="p-invalid" style={{'color': '#ff0000'}}>{formik.errors.email ? formik.errors.email : null}</small>

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <Avatar image={password} style={{'height': '1.2em','width':'1.2em',}}/>   
                                        </span>
                                        <Password id="password" name='password' placeholder="Contraseña"  value={formik.values.password} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                </div>       
                            </div>
                            <small className="p-invalid" style={{'color': '#ff0000'}}>{formik.errors.password ? formik.errors.password : null}</small>

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <Avatar image={password} style={{'height': '1.2em','width':'1.2em',}}/>   
                                        </span>
                                        <Password id="confirmPassword" name='confirmPassword' placeholder="Confirmar contraseña"  value={formik.values.confirmPassword} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                </div>       
                            </div>
                            <small className="p-invalid" style={{'color': '#ff0000'}}>{formik.errors.confirmPassword ? formik.errors.confirmPassword : null}</small>

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <Avatar image={rolImg} style={{'height': '1.2em','width':'1.2em',}}/>   
                                        </span>
                                        <Dropdown value={rol} options={roles} onChange={onRolChange} optionLabel="rol" placeholder="Rol" required/>   
                                </div>       
                            </div>
                            <div className='mt-2'>
                                <div className="flex justify-content-center flex-wrap">
                                    <div className="flex align-items-center justify-content-center  m-2">
                                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} style={{'background': '#d13639','color':'#ffffff'}}/>
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
