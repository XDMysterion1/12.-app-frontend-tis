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
import { Calendar }         from 'primereact/calendar';
import { Row }              from 'primereact/row';
import { Dropdown }         from 'primereact/dropdown';
import { addLocale }        from 'primereact/api';
import { useFormik }        from "formik";
import { Link }             from 'react-router-dom';

import uniqid               from 'uniqid';

import { getPlans,createPlan,updatePlanID} from '../service/apiPlan';
import { getUsersActivas  } from '../service/apiUser';
import { subirArchivo, download } from '../service/apiArchivo';
/**archivos */
const initialValues = {
    archivo : null,
    archivoNombre : '',
    archivoURL: ''
}
/** */
export const Plan = (props) => {
/**archivo */
const [archivo, setArchivo]= useState(initialValues);
    const fileSelectHandler = (e)=>{
        setArchivo({
            archivo: e.target.files[0],
            archivoNombre: e.target.files[0].name
        })
    }
/**archivo */
    let emptyParte = {
        id:            null,
        link:         '',
        estado:       '',
        user:         ''
    };

    const estados = [
        { name: "Activo"      },
        { name: "Desactivado" }
    ];

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });

    const [partes, setPartes]                          = useState(null);
    const [users, setUsers]                            = useState(null);

    const [globalFilter, setGlobalFilter]              = useState('');
    const [loading, setLoading]                        = useState(true);
    const [parteDialog, setParteDialog]                = useState(false);
    const [deleteParteDialog, setDeleteParteDialog]    = useState(false);

    const [parte, setParte]                            = useState(emptyParte);
    const [selectedPartes, setSelectedPartes]          = useState(null);
    const [submitted, setSubmitted]                    = useState(false);
    const toast                                        = useRef(null);
    const dt                                           = useRef(null);
    const [stateParte,setStateParte]                   = useState(false);
    const [parteUpdate, setParteUpdate]                = useState("");
    const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formik = useFormik({
        initialValues: {
            link:         '',
            estado:       '',
            user:         ''
        },
         validate: (data) => {
            let errors = {};

            if(stateParte){

       

                if (!data.estado) {
                    errors.estado = "Se requiere el estado";
                } else if (data.estado.length < 2) {
                    errors.estado = "Como minimo 2 caracteres";
                } else if (data.estado.length > 30) {
                    errors.estado = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.estado)) {
                    errors.estado = "No se permiten numero o caracteres especiales";
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

            }else{

               

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
            console.log(data);
            if(submitted === true){
                
                let _partes = [...partes];
                let _parte  = {...parte };

                _parte['link']        = data.link;
                _parte['estado']      = data.estado;
                _parte['user']        = data.user;
                console.log(_parte);

                if (_parte.link.trim()) {
                    if (parte.id) {

                        setParte({ ...parte });
                        const index = findIndexById(parte.id);
                        _partes[index] = _parte;

                        updatePlanID({link:`${_parte.link}`,estado:`${_parte.estado}`,user:`${_parte.user}`},parte.id);
                        subirArchivo(archivo);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan de pago Actualizado', life: 3000 });
                    }
                    else {

                        _parte.id        = uniqid("plan-");
                        _parte.estado    = "Activo"; 
                        _partes.push(_parte);
                        createPlan({id:`${_parte.id}`,link:`${_parte.link}`,estado:`${_parte.estado}`,user:`${_parte.user}`});
                        subirArchivo(archivo);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan de pago Creado', life: 3000 });
                    }
                }
                setPartes(_partes);
                setParteDialog(false);
                setParte(emptyParte);
                formik.resetForm();
        }
            
        },
      });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="ml-1 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };

    useEffect(()=>{
        fetchPartes();
    },[])

    const fetchPartes = () =>{
        getPlans().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Plan de pagos insertados-----------");
                setPartes(json.data);
                setLoading(false);
            }
        })
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers = () =>{
        getUsersActivas().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Users insertados-----------");
                setUsers(json.data);
            }
        })
    }


    const openNew = () => {
        setParte(emptyParte);
        formik.resetForm();
        setSubmitted(false);
        setStateParte(false); 
        setParteDialog(true);    
    }

    const hideDialog = () => {
        setSubmitted(false);
        setParteDialog(false);
    }

    const showDialog = () => {
        setSubmitted(true);
        formik.handleSubmit();
    }

    const hideDeleteParteDialog = () => {
        setDeleteParteDialog(false);
    }

    const editParte = (parte) => {
        setParte({ ...parte });
        setSubmitted(true);

        formik.resetForm();
        formik.setValues(
        {
            link:        `${parte.link}`,
            estado:      `${parte.estado}`,
            user:        `${parte.user}`
        });
        setParteUpdate(`${parte.estado}`);
        setStateParte(true);
        setParteDialog(true);
    }

    const confirmDeleteParte = (parte) => {
        setParte(parte);
        setDeleteParteDialog(true);
    }

    const deleteParte = () => {
        let _partes = [...partes];
        let _parte  = {...parte };
        
        if (parte.link.trim()) {
            if (parte.id) {

                const index = findIndexById(parte.id);
                _partes[index] = _parte;
                updatePlanID({link:`${_parte.link}`,estado:"Desactivado",user:`${_parte.user}`},parte.id);
                _parte['link']        = _parte.link;
                _parte['estado']      = "Desactivado";
                _parte['user']        = _parte.user;
                setParte({ ...parte });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Plan de pago desactivado', life: 3000 });
            }
        }
        setPartes(_partes);
        setParte(emptyParte);
        setDeleteParteDialog(false);
        
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < partes.length; i++) {
            if (partes[i].id === id) {

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

    const linkBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Link</span>
                <Button label="Descargar" className="p-button-link" onClick={download} style={props.layoutColorMode === 'light' ? {'color':'#495057', 'font-weight': 'bold' , 'text-align': 'justify'} : {'color':'#ffffff', 'font-weight': 'bold' , 'text-align': 'justify'}}/>      
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
                <Button icon="pi pi-pencil" style={{'background': '#13af4e'}} className="p-button-rounded p-button-success mr-2"   onClick={() => editParte(rowData)} />
                <Button icon="pi pi-trash"  style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"        onClick={() => confirmDeleteParte(rowData)} />
            </div>
        );
    }

    const deleteParteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeleteParteDialog} />
            <Button label="Si" icon="pi pi-check" style={props.layoutColorMode === 'light' ? {'color':'#13af4e','border-color':'#13af4e'} : {'color':'#13af4e','border-color':'#13af4e'}} className="p-button-text" onClick={deleteParte} />
        </>
    );



    const renderHeader = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestion de plan de pagos</h5>
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
                    <Column header={showHeader} colSpan={5}></Column>
                </Row>
                <Row>
                    <Column header="ID"                   field="id"            sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="ARCHIVO"                 field="link"          sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="ESTADO"               field="estado"        sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="USUARIO"              field="user"          sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="Editar/Eliminar"                                     style={{ 'background-color': '#13af4e', width:'20%'}}/>
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();



    const headerDialog =()=>{
        return (stateParte)?"Actualizando Plan de pagos":"Añadir Plan de pagos"
    }


    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                
                    <Toast ref={toast} />
                    <Toolbar className="" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={partes} selection={selectedPartes}  onSelectionChange={(e) => setSelectedPartes(e.value)}
                        dataKey="id" rowHover paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm p-datatable-gridlines p-datatable-striped"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} plan de pagos" resizableColumns columnResizeMode="fit" showGridlines
                        globalFilter={globalFilter} emptyMessage="No se encontro los documentos de la Parte A" loading={loading} headerColumnGroup={headerGroup}
                        >
                    
                        <Column style={{width:'20%'}} field="id"                    header="ID"                 sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="link"                  header="LINK"               sortable body={linkBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="estado"                header="ESTADO"             sortable body={estadoBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="user"                  header="USUARIO"            sortable body={userBodyTemplate}></Column> 
                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={parteDialog} style={{ width: '450px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit}>

           <div style={{ 'marginBottom': '10px' }} className="p-field mt-2" >
                                <div className="p-inputgroup">

                                    <input
                                        id="subir"
                                        type="file"
                                        onChange={fileSelectHandler}
                                        hidden
                                    />

                                    <label for="subir"
                                        style={{
                                            display: 'inline - block',
                                            background: 'rgb(19, 175, 78)',
                                            color: 'white',
                                            padding: '0.6rem',
                                            fontFamily: 'sans-serif',

                                            cursor: 'pointer',
                                            marginTop: '0',
                                            borderRadius: '7px'


                                        }}
                                    >Seleccionar Archivo PDF</label>
                                </div>
                            </div>
                      

                            
                            {(stateParte)?(
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
                            ):
                                null
                            }

                            <div className="p-field mt-2">
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


                    <Dialog className="mt-2" visible={deleteParteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteParteDialogFooter} onHide={hideDeleteParteDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {parte && <span>¿Estás segura de que quieres eliminar? <b>{parte.id}</b>?</span>}
                        </div>
                    </Dialog>
    
                </div>
            </div>
        </div>
    );
}
