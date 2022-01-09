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
import { Link }             from 'react-router-dom';

import uniqid               from 'uniqid';

import { getPliegos,createPliego,updatePliegoID,deletePliegoID} from '../service/apiPliego';
import { getUsers,getUsersActivas } from '../service/apiUser';
import { subirPliego,downloadPliego } from '../service/apiArchivo';

const initialValues = {
    archivo : null,
    archivoNombre : '',
    archivoURL: ''
}

export const PliegoEspecificacion = (props) => {

    const [archivo, setArchivo]= useState(initialValues);


    const fileSelectHandler = (e)=>{
        setArchivo({
            archivo: e.target.files[0],
            archivoNombre: e.target.files[0].name
        })
    }

    let emptyPliego = {
        id:        null,
        titulo:    '',
        codigo:    '',
        semestre:  '',
        link:      'https://umss',
        publicado: '',
        estado:    '',
        user:      ''
    };

    const semestres = [
        { name: "I-2020" },
        { name: "II-2020"},
        { name: "I-2021"},
        { name: "II-2021"},
        { name: "I-2022"},
        { name: "II-2022"}
    ];

    const publicacion = [
        { name: "Publicar"     },
        { name: "No publicar" }
    ];

    const estados = [
        { name: "Activo"      },
        { name: "Desactivado" }
    ];

    const [pliegos, setPliegos]                          = useState(null);
    const [users, setUsers]                              = useState(null);
    const [globalFilter, setGlobalFilter]                = useState('');
    const [loading, setLoading]                          = useState(true);
    const [pliegoDialog, setPliegoDialog]                = useState(false);
    const [deletePliegoDialog, setDeletePliegoDialog]    = useState(false);

    const [pliego, setPliego]                            = useState(emptyPliego);
    const [selectedPliegos, setSelectedPliegos]          = useState(null);
    const [submitted, setSubmitted]                      = useState(false);
    const toast                                          = useRef(null);
    const dt                                             = useRef(null);
    const [statePliego,setStatePliego]                   = useState(false);
    const [pliegoUpdate, setPliegoUpdate]                = useState("");

    const formik = useFormik({
        initialValues: {
            titulo:    '',
            codigo:    '',
            semestre:  '',
            link:      'https://umss',
            publicado: '',
            estado:    '',
            user:      ''
        },
         validate: (data) => {
            let errors = {};
            if(statePliego){

                if (!data.titulo) {
                    errors.titulo = "Se requiere el titulo";
                } else if (data.titulo.length < 2) {
                    errors.titulo = "Como minimo 2 caracteres";
                } else if (data.titulo.length > 50) {
                    errors.titulo = "Como maximo 50 caracteres";
                } else if (!/^^[a-zA-Z0-9\s]+$/i.test(data.titulo)) {
                    errors.titulo = "No se permiten numero o caracteres especiales";
                }

                if (!data.codigo) {
                    errors.codigo = "Se requiere el codigo";
                } else if (data.codigo.length < 2) {
                    errors.codigo = "Como minimo 2 caracteres";
                } else if (data.codigo.length > 30) {
                    errors.codigo = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.codigo)) {
                    errors.codigo = "No se permiten numero o caracteres especiales";
                }else if(!esRepetido(data.codigo) && statePliego === false){
                    errors.codigo = "Ya existe el codigo";
                } else if(!esRepetidoUpdate(data.codigo,pliegoUpdate) && statePliego === true){
                    errors.codigo = "Ya existe el codigo";  
                }

                
                if (!data.semestre) {
                    errors.semestre = "Se requiere el semestre";
                } else if (data.semestre.length < 2) {
                    errors.semestre = "Como minimo 2 caracteres";
                } else if (data.semestre.length > 30) {
                    errors.semestre = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.semestre)) {
                    errors.semestre = "No se permiten numero o caracteres especiales";
                }

             

                if (!data.publicado) {
                    errors.publicado = "Se requiere publicarlo";
                } else if (data.publicado.length < 2) {
                    errors.publicado = "Como minimo 2 caracteres";
                } else if (data.publicado.length > 30) {
                    errors.publicado = "Como maximo 30 caracteres";
                } else if (!/^^[a-zA-Z\s]+$/i.test(data.publicado)) {
                    errors.publicado = "No se permiten numero o caracteres especiales";
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

                if (!data.titulo) {
                    errors.titulo = "Se requiere el titulo";
                } else if (data.titulo.length < 2) {
                    errors.titulo = "Como minimo 2 caracteres";
                } else if (data.titulo.length > 50) {
                    errors.titulo = "Como maximo 50 caracteres";
                } else if (!/^^[a-zA-Z0-9\s]+$/i.test(data.titulo)) {
                    errors.titulo = "No se permiten numero o caracteres especiales";
                }

                if (!data.codigo) {
                    errors.codigo = "Se requiere el codigo";
                } else if (data.codigo.length < 2) {
                    errors.codigo = "Como minimo 2 caracteres";
                } else if (data.codigo.length > 30) {
                    errors.codigo = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.codigo)) {
                    errors.codigo = "No se permiten numero o caracteres especiales";
                }else if(!esRepetido(data.codigo) && statePliego === false){
                    errors.codigo = "Ya existe el codigo";
                } else if(!esRepetidoUpdate(data.codigo,pliegoUpdate) && statePliego === true){
                    errors.codigo = "Ya existe el codigo";  
                }

                
                if (!data.semestre) {
                    errors.semestre = "Se requiere el semestre";
                } else if (data.semestre.length < 2) {
                    errors.semestre = "Como minimo 2 caracteres";
                } else if (data.semestre.length > 30) {
                    errors.semestre = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.semestre)) {
                    errors.semestre = "No se permiten numero o caracteres especiales";
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
                let _pliegos = [...pliegos];
                let _pliego  = {...pliego };
                _pliego['titulo']     = data.titulo;
                _pliego['codigo']     = data.codigo;
                _pliego['semestre']   = data.semestre;
                _pliego['link']       = data.link;
                _pliego['publicado']  = data.publicado;
                _pliego['estado']     = data.estado;
                _pliego['user']       = data.user;

                if (_pliego.titulo.trim()) {
                    if (pliego.id) {

                        setPliego({ ...pliego });
                        const index = findIndexById(pliego.id);
                        _pliegos[index] = _pliego;
                        subirPliego(archivo);
                        updatePliegoID({titulo:`${_pliego.titulo}`,codigo:`${_pliego.codigo}`,semestre:`${_pliego.semestre}`,link:`${_pliego.link}`,publicado:`${_pliego.publicado}`,estado:`${_pliego.estado}`,user:`${_pliego.user}`},pliego.id);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Pliego de especificaciones Actualizada', life: 3000 });
                    }
                    else {

                        _pliego.id        = uniqid("plieg-");
                        _pliego.publicado = "No publicar";
                        _pliego.estado    = "Activo";
                        _pliegos.push(_pliego);
                        subirPliego(archivo);
                        createPliego({id:`${_pliego.id}`,titulo:`${_pliego.titulo}`,codigo:`${_pliego.codigo}`,semestre:`${_pliego.semestre}`,link:`${_pliego.link}`,publicado:`${_pliego.publicado}`,estado:`${_pliego.estado}`,user:`${_pliego.user}`});
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Pliego de especificaciones Creada', life: 3000 });
                    }
                }
                setPliegos(_pliegos);
                setPliegoDialog(false);
                setPliego(emptyPliego);
                formik.resetForm();
        }
            
        },
      });

    const esRepetido =(value)=>{
        var _pliegos = [...pliegos];
        let res = _pliegos.find(i => (i.codigo).toLowerCase().trim() === (value).toLowerCase().trim() );
         if(res === undefined){
             return true;
         }else{
             return false;
         }
    }
    const esRepetidoUpdate =(value,original)=>{
        var _pliegos = [...pliegos];
        let aux = _pliegos.filter(i =>(i.codigo).toLowerCase().trim() != (original).toLowerCase().trim())
        let res = aux.find(i => (i.codigo).toLowerCase().trim() === (value).toLowerCase().trim() );
         if(res === undefined || res === original){
             return true;
         }else{
             return false;
         }
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="ml-1 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };

    useEffect(()=>{
        fetchPliegos();
    },[])

    const fetchPliegos = () =>{
        getPliegos().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Pliego de espeficiaciones insertados-----------");
                setPliegos(json.data);
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
        setPliego(emptyPliego);
        formik.resetForm();
        setSubmitted(false);
        setStatePliego(false); 
        setPliegoDialog(true);    
    }

    const hideDialog = () => {
        setSubmitted(false);
        setPliegoDialog(false);
    }

    const showDialog = () => {
        setSubmitted(true);
        formik.handleSubmit();
    }

    const hideDeletePliegoDialog = () => {
        setDeletePliegoDialog(false);
    }

    const editPliego = (pliego) => {
        setPliego({ ...pliego });
        setSubmitted(true);
        formik.resetForm();
        formik.setValues(
        {
            titulo:    `${pliego.titulo}`,
            codigo:    `${pliego.codigo}`,
            semestre:  `${pliego.semestre}`,
            link:      `${pliego.link}`,
            publicado: `${pliego.publicado}`,
            estado:    `${pliego.estado}`,
            user:      `${pliego.user}`
        });
        setPliegoUpdate(`${pliego.codigo}`);
        setStatePliego(true);
        setPliegoDialog(true);
    }

    const confirmDeletePliego = (pliego) => {
        setPliego(pliego);
        setDeletePliegoDialog(true);
    }

    const deletePliego = () => {
        let _pliegos = [...pliegos];
        let _pliego  = {...pliego };
        

        if (pliego.titulo.trim()) {
            if (pliego.id) {

                
                const index = findIndexById(pliego.id);
                _pliegos[index] = _pliego;

                updatePliegoID({titulo:`${_pliego.titulo}`,codigo:`${_pliego.codigo}`,semestre:`${_pliego.semestre}`,link:`${_pliego.link}`,publicado:"No publicar",estado:"Desactivado",user:`${_pliego.user}`},pliego.id);
                _pliego['titulo']     = _pliego.titulo;
                _pliego['codigo']     = _pliego.codigo;
                _pliego['semestre']   = _pliego.semestre;
                _pliego['link']       = _pliego.link;
                _pliego['publicado']  = "No publicar";
                _pliego['estado']     = "Desactivado";
                _pliego['user']       = _pliego.user;
                setPliego({ ...pliego });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Pliego de espeficiacion Eliminada', life: 3000 });
            }
        }
        setPliegos(_pliegos);
        setPliego(emptyPliego);
        setDeletePliegoDialog(false);
        
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < pliegos.length; i++) {
            if (pliegos[i].id === id) {

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

    const tituloBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Titulo</span>
                {rowData.titulo}
            </>
        );
    }

    const codigoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Codigo</span>
                {rowData.codigo}
            </>
        );
    }

    const semestreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Semestre</span>
                {rowData.semestre}
            </>
        );
    }

    const linkBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Link</span>
                <Button label="Descargar" className="p-button-link" onClick={downloadPliego} style={props.layoutColorMode === 'light' ? {'color':'#495057', 'font-weight': 'bold' , 'text-align': 'justify'} : {'color':'#ffffff', 'font-weight': 'bold' , 'text-align': 'justify'}}/>      
            </>
        );
    }

    const publicadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Publicado</span>
                {rowData.publicado}
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
                <span className="p-column-title">User</span>
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
                <Button icon="pi pi-pencil" style={{'background': '#13af4e'}} className="p-button-rounded p-button-success mr-2"   onClick={() => editPliego(rowData)} />
                <Button icon="pi pi-trash"  style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"        onClick={() => confirmDeletePliego(rowData)} />
            </div>
        );
    }

    const deletePliegoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeletePliegoDialog} />
            <Button label="Si" icon="pi pi-check" style={props.layoutColorMode === 'light' ? {'color':'#13af4e','border-color':'#13af4e'} : {'color':'#13af4e','border-color':'#13af4e'}} className="p-button-text" onClick={deletePliego} />
        </>
    );

    const renderHeader = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestion de pliego de especificaciones</h5>
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
                    <Column header={showHeader} colSpan={8}></Column>
                </Row>
                <Row>
                    <Column header="ID"                 field="id"       sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="TITULO"             field="titulo"   sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="CODIGO"             field="codigo"   sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="SEMESTRE"           field="semestre" sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="ARCHIVO"               field="link"     sortable style={{ 'background-color': '#13af4e', width:'40%'}}/>
                    <Column header="PUBLICADO"          field="publicado" sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="ESTADO"             field="estado"    sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="Editar/Eliminar"                              style={{ 'background-color': '#13af4e', width:'20%'}}/>
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();


    const headerDialog =()=>{
        return (statePliego)?"Actualizando pliego de espeficiciones":"Añadir pliego de espeficiciones"
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                
                    <Toast ref={toast} />
                    <Toolbar className="" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={pliegos} selection={selectedPliegos}  onSelectionChange={(e) => setSelectedPliegos(e.value)}
                        dataKey="id" rowHover paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm p-datatable-gridlines p-datatable-striped"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" resizableColumns columnResizeMode="fit" showGridlines
                        globalFilter={globalFilter} emptyMessage="No se encontro el rol" loading={loading} headerColumnGroup={headerGroup}
                        >
                    
                        <Column style={{width:'20%'}} field="id"        header="ID"        sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="titulo"    header="TITULO"    sortable body={tituloBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="codigo"    header="CODIGO"    sortable body={codigoBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="semestre"  header="SEMESTRE"  sortable body={semestreBodyTemplate}></Column>
                        <Column style={{width:'40%'}} field="link"      header="LINK"      sortable body={linkBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="publicado" header="PUBLICADO" sortable body={publicadoBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="estado"    header="ESTADO"    sortable body={estadoBodyTemplate}></Column>
                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={pliegoDialog} style={{ width: '450px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-field mt-2" >
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/title.png' : 'assets/layout/images/title-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>  
                                        </span>
                                        <InputText id="titulo" name='titulo' placeholder="Titulo" value={formik.values.titulo} onChange={formik.handleChange} autoFocus/>
                                </div>       
                            </div>
                            {getFormErrorMessage('titulo')}

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/code.png' : 'assets/layout/images/code-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>  
                                        </span>
                                        <InputText id="codigo" name='codigo' placeholder="Codigo" value={formik.values.codigo} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            {getFormErrorMessage('codigo')}

                            
                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-calendar"></i>
                                        </span>
                                        <Dropdown id="semestre" name="semestre" placeholder="Seleccione el semestre" value={formik.values.semestre} onChange={formik.handleChange} options={semestres} optionLabel="name"  optionValue="name"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('semestre')}

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
                            {getFormErrorMessage('link')}

                            {(statePliego)?(
                                <div className="form-group">
                                    <div className="p-field mt-2">
                                            <div className="p-inputgroup">
                                                    <span className="p-inputgroup-addon">
                                                        <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/post.png' : 'assets/layout/images/post-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>  
                                                    </span>
                                                    <Dropdown id="publicado" name="publicado" placeholder="Seleccione si se publica" value={formik.values.publicado} onChange={formik.handleChange} options={publicacion} optionLabel="name"  optionValue="name"/>
                                            </div>       
                                    </div>
                                    {getFormErrorMessage('publicado')}

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


                    <Dialog className="mt-2" visible={deletePliegoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePliegoDialogFooter} onHide={hideDeletePliegoDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {pliego && <span>¿Estás segura de que quieres eliminar? <b>{pliego.titulo}</b> <b>{pliego.semestre}</b>?</span>}
                        </div>
                    </Dialog>
    
                </div>
            </div>
        </div>
    );
}
