import React, { useState, useEffect, useRef } from 'react';
import classNames           from 'classnames';
import { DataTable }        from 'primereact/datatable';
import { Column }           from 'primereact/column';
import { Toast }            from 'primereact/toast';
import { Button }           from 'primereact/button';
import { Toolbar }          from 'primereact/toolbar';
import { Dialog }           from 'primereact/dialog';
import { InputText }        from 'primereact/inputtext';
import { ColumnGroup }      from 'primereact/columngroup';
import { Row }              from 'primereact/row';
import { Avatar }           from 'primereact/avatar';
import { Dropdown }         from 'primereact/dropdown';


import gmail                from '../icon/gmail.png';
import password             from '../icon/password.png';
import rolImg               from '../icon/rol.png';


import uniqid               from 'uniqid';

import { getUsers,getUserID,createUser,updateUserID,deleteUserID } from '../service/apiUser';
import { getRoles } from '../service/apiRole';

export const User = () => {

    let emptyUser = {
        id:       null,
        nombre:     '',
        apellido:     '',
        email:    '',
        password: '',
        rol:      ''
    };

    const [roles,setRoles]                           = useState(null);
    const [rol, setRol]                              = useState(null);
    const [users, setUsers]                          = useState(null);
    const [userDialog, setUserDialog]                = useState(false);
    const [deleteUserDialog, setDeleteUserDialog]    = useState(false);
    const [auxRol, setAuxRol]                        = useState(null);

    const [user, setUser]                            = useState(emptyUser);
    const [selectedUsers, setSelectedUsers]          = useState(null);
    const [submitted, setSubmitted]                  = useState(false);
    const toast                                      = useRef(null);
    const dt                                         = useRef(null);


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
        setSubmitted(false);
        setUserDialog(true);      
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }


    const saveUser = () => {
        setSubmitted(true);
        if (user.nombre.trim()) {
            let _users = [...users];
            let _user  = {...user };
            if (user.id) {
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
            setUsers(_users);
            setUserDialog(false);
            setUser(emptyUser);
            console.log(users);
        }
    }


    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    }

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const deleteUser = () => {
        let _users = users.filter(val => val.id !== user.id);
        setUser(_users);
        setDeleteUserDialog(false);

        if (user.nombre.trim()) {
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


    const onInputChangeNombre = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;
        setUser(_user);
    }

    const onInputChangeApellido = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;
        setUser(_user);
    }

    const onInputChangeEmail = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;
        setUser(_user);
    }

    const onInputChangePassword = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;
        setUser(_user);
    }

    const onInputChangeRol = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;
        setUser(_user);
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

        let country = _roles.find(el => el.id === rolFind);
        console.log(country["rol"]);

    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"   onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash"  className="p-button-rounded p-button-warning"          onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    }

    const userDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar"  icon="pi pi-check" className="p-button-text"  onClick={saveUser} />
        </>
    );
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
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


                    <Dialog visible={userDialog} style={{ width: '450px' }} header="Añadir Usuario" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        <div className="p-field mt-2" >
                            <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText id="nombre" value={user.nombre} placeholder="Nombre" onChange={(e) => onInputChangeNombre(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.nombre })} />
                            </div>       
                        </div>
                        {submitted && !user.nombre && <small className="p-invalid">El nombre es requerido</small>}

                        <div className="p-field mt-2">
                            <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText id="apellido" value={user.apellido} placeholder="Apellido" onChange={(e) => onInputChangeApellido(e, 'apellido')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.apellido })} />
                            </div>       
                        </div>
                        {submitted && !user.apellido && <small className="p-invalid">El apelllido es requerido</small>}

                        <div className="p-field mt-2">
                            <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <Avatar image={gmail} style={{'height': '1.2em','width':'1.2em',}}/>   
                                    </span>
                                    <InputText id="email" value={user.email} placeholder="Correo electronico" onChange={(e) => onInputChangeEmail(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                            </div>       
                        </div>
                        {submitted && !user.email && <small className="p-invalid">El correo electronico es requerido</small>}

                        <div className="p-field mt-2">
                            <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <Avatar image={password} style={{'height': '1.2em','width':'1.2em',}}/>   
                                    </span>
                                    <InputText id="password" value={user.password} placeholder="Contraseña" onChange={(e) => onInputChangePassword(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.password })} />
                            </div>       
                        </div>
                        {submitted && !user.password && <small className="p-invalid">La contrasena es requerido</small>}

                        <div className="p-field mt-2">
                            <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <Avatar image={rolImg} style={{'height': '1.2em','width':'1.2em',}}/>   
                                    </span>
                                    <Dropdown value={rol} options={roles} onChange={onRolChange} optionLabel="rol" placeholder="Rol" required autoFocus className={classNames({ 'p-invalid': submitted && !user.rol })}/>
                                    
                            </div>       
                        </div>
                        {submitted && !user.rol && <small className="p-invalid">El rol es requerido</small>}
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
