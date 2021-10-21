import React, { useState, useEffect, useRef } from 'react';
import classNames           from 'classnames';
import { DataTable }        from 'primereact/datatable';
import { Column }           from 'primereact/column';
import { Toast }            from 'primereact/toast';
import { Button }           from 'primereact/button';
import { FileUpload }       from 'primereact/fileupload';
import { Rating }           from 'primereact/rating';
import { Toolbar }          from 'primereact/toolbar';
import { InputTextarea }    from 'primereact/inputtextarea';
import { RadioButton }      from 'primereact/radiobutton';
import { InputNumber }      from 'primereact/inputnumber';
import { Dialog }           from 'primereact/dialog';
import { InputText }        from 'primereact/inputtext';
import { ProductService }   from '../service/ProductService';

export const ShowRole = () => {

    let emptyRole = {
        id: null,
        name: ''
    };

    const [roles, setRoles]                          = useState(null);
    const [roleDialog, setRoleDialog]                = useState(false);
    const [deleteRoleDialog, setDeleteRoleDialog]    = useState(false);
    const [deleteRolesDialog, setDeleteRolesDialog]  = useState(false);

    const [role, setRole]                            = useState(emptyRole);
    const [selectedRoles, setSelectedRoles]          = useState(null);
    const [submitted, setSubmitted]                  = useState(false);
    const [globalFilter, setGlobalFilter]            = useState(null);
    const toast                                      = useRef(null);
    const dt                                         = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getRoles().then(data => setRoles(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setRole(emptyRole);
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

    const hideDeleteRolesDialog = () => {
        setDeleteRolesDialog(false);
    }

    const saveRole = () => {
        setSubmitted(true);

        if (role.name.trim()) {
            let _roles = [...roles];
            let _role  = { ...role };
            if (role.id) {
                const index = findIndexById(role.id);

                _roles[index] = _role;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rol Actualizado', life: 3000 });
            }
            else {
                _role.id = createId();
                _roles.push(_role);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rol Actualizado', life: 3000 });
            }

            setRoles(_roles);
            setRoleDialog(false);
            setRole(emptyRole);
        }
    }

    const editRole = (role) => {
        setRole({ ...role });
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
        setRole(emptyRole);
        toast.current.show({ severity: 'Exito', summary: 'Exitoso', detail: 'Rol Eliminado', life: 3000 });
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

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteRolesDialog(true);
    }

    const deleteSelectedRoles = () => {
        let _roles = roles.filter(val => !selectedRoles.includes(val));
        setRoles(_roles);
        setDeleteRolesDialog(false);
        setSelectedRoles(null);
        toast.current.show({ severity: 'exito', summary: 'Exitoso', detail: 'Roles Eliminados', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _role = { ...role };
        _role['role'] = e.value;
        setRole(_role);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _role = { ...role };
        _role[`${name}`] = val;

        setRole(_role);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _role = { ...role };
        _role[`${name}`] = val;

        setRole(_role);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedRoles || !selectedRoles.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
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
                {rowData.name}
            </>
        );
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editRole(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteRole(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Gestion de roles</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const roleDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveRole} />
        </>
    );
    const deleteRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRoleDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteRole} />
        </>
    );
    const deleteRolesDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRolesDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedRoles} />
        </>
    );

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    //Para mostrar los campos de la tabla
                    <DataTable ref={dt} value={roles} selection={selectedRoles} onSelectionChange={(e) => setSelectedRoles(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header}>
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                        <Column field="id"  header="id"    sortable body={idBodyTemplate}></Column>
                        <Column field="role" header="role" sortable body={roleBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>

                    </DataTable>


                    //Diagolo ingresar roles
                    <Dialog visible={roleDialog} style={{ width: '450px' }} header="añadir Rol" modal className="p-fluid" footer={roleDialogFooter} onHide={hideDialog}>
                        <div className="p-field">
                            <label htmlFor="role">Rol</label>
                            <InputText id="role" value={role.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !role.name })} />
                            {submitted && !role.name && <small className="p-invalid">El Rol es requerido</small>}
                        </div>
                    </Dialog>

                    //---------------------------------------------------------------------------------------------------------------------------

                    <Dialog visible={deleteRoleDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRoleDialogFooter} onHide={hideDeleteRoleDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {role && <span>¿Estás segura de que quieres eliminar? <b>{role.name}</b>?</span>}
                        </div>
                    </Dialog>
                     //---------------------------------------------------------------------------------------------------------------------------
                    <Dialog visible={deleteRolesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRolesDialogFooter} onHide={hideDeleteRolesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {role && <span>¿Está seguro de que desea eliminar los roles seleccionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
