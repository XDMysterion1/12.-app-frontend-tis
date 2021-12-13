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
import { useFormik }        from "formik";

import uniqid               from 'uniqid';

import { getRoles,createRol,updateRolID,deleteRolID } from '../service/apiRole';

export const Role = (props) => {

    
    let emptyRole = {
        id: null,
        rol: ''
    };

    const [roles, setRoles]                          = useState(null);
    const [roleDialog, setRoleDialog]                = useState(false);
    const [deleteRoleDialog, setDeleteRoleDialog]    = useState(false);
    const [globalFilter, setGlobalFilter]            = useState('');
    const [loading, setLoading]                      = useState(true);

    const [role, setRole]                            = useState(emptyRole);
    const [selectedRoles, setSelectedRoles]          = useState(null);
    const [submitted, setSubmitted]                  = useState(false);
    const toast                                      = useRef(null);
    const dt                                         = useRef(null);
    const [stateRole,setStateRole]                   = useState(false);
    const [showMessage, setShowMessage]              = useState(false);
    const [rolUpdate, setRolUpdate]                  = useState("");

    const formik = useFormik({
        initialValues: {
          rol: ""
        },
        validate: (data) => {
            let errors = {};

            if (!data.rol) {
                errors.rol = "Se requiere el rol";
            } else if (data.rol.length < 2) {
                errors.rol = "Como minimo 2 caracteres";
            } else if (data.rol.length > 30) {
                errors.rol = "Como maximo 30 caracteres";
            } else if (!/^^[a-zA-Z\s]+$/i.test(data.rol)) {
                errors.rol = "No se permiten numero o caracteres especiales";
            }else if(!esRepetidoUpdate(data.rol,rolUpdate)&&stateRole === true){
                errors.rol = "Ya existe el rol";  
            }else if(!esRepetido(data.rol)&&stateRole === false){
                errors.rol = "Ya existe el rol";
            }

            return errors;
        },
        onSubmit: (data) => {
            setSubmitted(true);
            setShowMessage(true);
            let _roles = [...roles];
            let _role  = {...role };
            _role['rol'] = data.rol;

            if (_role.rol.trim()) {
                if (role.id) {
                    setRole({ ...role });
                    console.log(role);
                    const index = findIndexById(role.id);
                    
                    _roles[index] = _role;
                    updateRolID({rol:`${_role.rol}`},role.id);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rol Actualizado', life: 3000 });
                }
                else {

                    _role.id = uniqid("rol-"); 
                    _roles.push(_role);
                    createRol({id:_role.id, rol:`${_role.rol}`});
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rol Creado', life: 3000 });
                }
            }
            setRoles(_roles);
            setRoleDialog(false);
            setRole(emptyRole);
            formik.resetForm();
            
        },
      });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
         return isFormFieldValid(name) && <small className="ml-1 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };

    const esRepetido =(value)=>{
        var _roles = [...roles];
        let res = _roles.find(i => (i.rol).toLowerCase().trim() === (value).toLowerCase().trim() );
         if(res === undefined){
             return true;
         }else{
             return false;
         }
    }
    const esRepetidoUpdate =(value,original)=>{
        var _roles = [...roles];
        let aux = _roles.filter(i =>(i.rol).toLowerCase() != (original).toLowerCase())
        let res = aux.find(i => (i.rol).toLowerCase().trim() === (value).toLowerCase().trim() );
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
        getRoles().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------roles insertados-----------");
                setRoles(json.data);
                setLoading(false);
            }
        })
    }

    const openNew = () => {
        setRole(emptyRole);
        setSubmitted(false);
        setStateRole(false);
        formik.resetForm();
        setRoleDialog(true);      
    }

    const hideDialog = () => {
        setSubmitted(false);
        setRoleDialog(false);
    }

    const hideDeleteRoleDialog = () => {
        setDeleteRoleDialog(false);
    }


    const editRole = (role) => {
        setRole({ ...role });
        formik.resetForm();
        formik.setValues({rol:`${role.rol}`});
        setRolUpdate(`${role.rol}`);
        setStateRole(true);
        setRoleDialog(true);
    }

    const confirmDeleteRole = (role) => {
        setRole(role);
        setDeleteRoleDialog(true);
    }

    const deleteRole = () => {
        let _roles = roles.filter(val => val.id !== role.id);
        setRoles(_roles);
        setDeleteRoleDialog(false);

        if (role.rol.trim()) {
            if (role.id) {
                deleteRolID(role.id);
            }
        }
        setRole(emptyRole);
        
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rol Eliminado', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].id === id) {

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

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Rol</span>
                {rowData.rol}
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
                <Button icon="pi pi-pencil" style={{'background': '#13af4e'}} className="p-button-rounded p-button-success mr-2"   onClick={() => editRole(rowData)} />
                <Button icon="pi pi-trash"  style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"        onClick={() => confirmDeleteRole(rowData)} />
            </div>
        );
    }

    const deleteRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeleteRoleDialog} />
            <Button label="Si" icon="pi pi-check" style={props.layoutColorMode === 'light' ? {'color':'#13af4e','border-color':'#13af4e'} : {'color':'#13af4e','border-color':'#13af4e'}} className="p-button-text" onClick={deleteRole} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestion de roles</h5>
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
                    <Column header={showHeader} colSpan={3}></Column>
                </Row>
                <Row>
                    <Column header="ID"                field="id"   sortable style={{ 'background-color': '#13af4e', width:'20%'}} />
                    <Column header="ROL"               field="rol"  sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="Editar/Eliminar"                         style={{ 'background-color': '#13af4e', width:'20%'}}/>
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();

    const headerDialog =()=>{
        return (stateRole)?"Actualizando Rol":"Añadir Rol"
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                
                    <Toast ref={toast} />
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={roles} selection={selectedRoles}  onSelectionChange={(e) => setSelectedRoles(e.value)}
                        dataKey="id" rowHover paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm p-datatable-gridlines p-datatable-striped"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles" resizableColumns columnResizeMode="fit" showGridlines
                        globalFilter={globalFilter} emptyMessage="No se encontro el rol" loading={loading} headerColumnGroup={headerGroup}
                    >

                        <Column style={{width:'20%'}} header="ID"  field="id"     sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'20%'}} header="ROL" field="rol"    sortable body={roleBodyTemplate}></Column>
                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={roleDialog} style={{ width: '450px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>  
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <div className="p-field mt-2">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/rol.png' : 'assets/layout/images/rol-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <InputText id="rol" type="text" name="rol" value={formik.values.rol} onChange={formik.handleChange} placeholder="Rol" autoFocus/>
                                    </div>       
                                </div>
                                {getFormErrorMessage('rol')}
                            </div>
                            <div className='mt-2'>
                                <div className="flex justify-content-center flex-wrap">
                                    <div className="flex align-items-center justify-content-center  m-2">
                                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} style={props.layoutColorMode === 'light' ? {'color':'#d13639','border-color':'#d13639'} : {'color':'#d13639','border-color':'#d13639'}}/>
                                    </div>
                                    <div className="flex align-items-center justify-content-center  m-2">
                                        <Button label="Guardar"  icon="pi pi-check" type="submit" className="p-button-text" style={{'background': '#13af4e','color':'#ffffff'}}/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Dialog>

                    <Dialog visible={deleteRoleDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRoleDialogFooter} onHide={hideDeleteRoleDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {role && <span>¿Estás segura de que quieres eliminar? <b>{role.rol}</b>?</span>}
                        </div>
                    </Dialog>
    
                </div>
            </div>
        </div>
    );
}
