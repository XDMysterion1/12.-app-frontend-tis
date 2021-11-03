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
import * as Yup             from 'yup';

import rolImg          from '../icon/rol.png';
import rolImgDark      from '../icon/rol-dark.png';

import { Avatar }    from 'primereact/avatar';

import uniqid               from 'uniqid';

import { getRoles,createRol,updateRolID,deleteRolID } from '../service/apiRole';

export const Role = () => {

    const validationSchema = Yup.object().shape({
        rol: Yup.string().required("Se requiero el Rol")
        .matches(/^^[a-zA-Z\s]+$/, "No se permiten numero o caracteres especiales")
        .min(2, "Como minimo 2 caracteres")
        .max(30, "Como maximo 30 caracteres")
      });
      const formik = useFormik({
        initialValues: {
          rol: ""
        },
        validationSchema,
        onSubmit: (data) => {
            setSubmitted(true);
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


    let emptyRole = {
        id: null,
        rol: ''
    };

    const [roles, setRoles]                          = useState(null);
    const [roleDialog, setRoleDialog]                = useState(false);
    const [deleteRoleDialog, setDeleteRoleDialog]    = useState(false);

    const [role, setRole]                            = useState(emptyRole);
    const [selectedRoles, setSelectedRoles]          = useState(null);
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

    const openNew = () => {
        setRole(emptyRole);
        formik.resetForm();
        setSubmitted(false);
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
        formik.setValues({rol:`${role.rol}`});
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


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _role = { ...role };
        _role[`${name}`] = val;
        setRole(_role);
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
                <Button style={{'background': '#13af4e'}} label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" style={{'background': '#13af4e'}} className="p-button-rounded p-button-success p-mr-2"   onClick={() => editRole(rowData)} />
                <Button icon="pi pi-trash"  style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"          onClick={() => confirmDeleteRole(rowData)} />
            </div>
        );
    }

    const deleteRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeleteRoleDialog} />
            <Button label="Si" icon="pi pi-check" style={{'background': '#13af4e','color':'#ffffff'}} className="p-button-text" onClick={deleteRole} />
        </>
    );


    let headerGroup = <ColumnGroup>
                        <Row>
                            <Column header="ID"                 style={{ 'background-color': '#13af4e', width:'20%'}} />
                            <Column header="ROL"                style={{ 'background-color': '#13af4e', width:'20%'}}/>
                            <Column header="Editar/Eliminar"    style={{ 'background-color': '#13af4e', width:'20%'}}/>
                        </Row>
                    </ColumnGroup>;

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                
                    <Toast ref={toast} />
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable headerColumnGroup={headerGroup} ref={dt} value={roles} selection={selectedRoles}  onSelectionChange={(e) => setSelectedRoles(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles" resizableColumns columnResizeMode="fit" showGridlines>

                        <Column style={{width:'20%'}} field="id"   header="ID"  sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="role" header="ROL" sortable body={roleBodyTemplate}></Column>
                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={roleDialog} style={{ width: '450px' }} header="Añadir Rol" modal className="p-fluid" onHide={hideDialog}>  
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <div className="p-field mt-2">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <Avatar  image={rolImg} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <InputText id="rol" type="text" name="rol" value={formik.values.rol} onChange={formik.handleChange} placeholder="Rol" autoFocus/>
                                    </div>       
                                </div>
                                <small className="p-invalid" style={{'color': '#ff0000'}}>{formik.errors.rol ? formik.errors.rol : null}</small>
                            </div>
                            <div className='mt-2'>
                                <div className="flex justify-content-center flex-wrap">
                                    <div className="flex align-items-center justify-content-center  m-2">
                                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} style={{'background': '#d13639','color':'#ffffff'}}/>
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
