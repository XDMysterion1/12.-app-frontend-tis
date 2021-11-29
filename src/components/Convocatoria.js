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

import { getConvocatorias,getConvocatoriaID,createConvocatoria,updateConvocatoriaID,deleteConvocatoriaID} from '../service/apiConvocatoria';
import { getUsers } from '../service/apiUser';

export const Convocatoria = (props) => {

    let emptyConvocatoria = {
        id:        null,
        titulo:    '',
        codigo:    '',
        semestre:  '',
        link:      '',
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

    const [convocatorias, setConvocatorias]                          = useState(null);
    const [users, setUsers]                                          = useState(null);
    const [convocatoriaDialog, setConvocatoriaDialog]                = useState(false);
    const [deleteConvocatoriaDialog, setDeleteConvocatoriaDialog]    = useState(false);

    const [convocatoria, setConvocatoria]                            = useState(emptyConvocatoria);
    const [selectedConvocatorias, setSelectedConvocatorias]          = useState(null);
    const [submitted, setSubmitted]                                  = useState(false);
    const toast                                                      = useRef(null);
    const dt                                                         = useRef(null);
    const [stateConvocatoria,setStateConvocatoria]                   = useState(false);
    const [convocatoriaUpdate, setConvocatoriaUpdate]                = useState("");

    const formik = useFormik({
        initialValues: {
            titulo:    '',
            codigo:    '',
            semestre:  '',
            link:      '',
            user:      ''
        },
         validate: (data) => {
            let errors = {};

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
            }else if(!esRepetido(data.codigo) && stateConvocatoria === false){
                errors.codigo = "Ya existe el codigo";
            } else if(!esRepetidoUpdate(data.codigo,convocatoriaUpdate) && stateConvocatoria === true){
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

            if (!data.link) {
                errors.link = "Se requiere el link";
            }else if (data.link.length > 500) {
                errors.link = "Como maximo 500 caracteres";
            }else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(data.link)) {
               errors.link = "El link no es valido";
            }
            //else if (!/^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/.test(data.link)) {
            //    errors.link = "El link no es valido";
            //}

            if (!data.user) {
                errors.user = "Se requiere el usuario";
            } else if (data.user.length < 2) {
                errors.user = "Como minimo 2 caracteres";
            } else if (data.user.length > 30) {
                errors.user = "Como maximo 30 caracteres";
            }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.user)) {
                errors.user = "No se permiten numero o caracteres especiales";
            }

            return errors;
        },

        onSubmit: (data) => {
            if(submitted === true){
                let _convocatorias = [...convocatorias];
                let _convocatoria  = {...convocatoria };
                _convocatoria['titulo']     = data.titulo;
                _convocatoria['codigo']     = data.codigo;
                _convocatoria['semestre']   = data.semestre;
                _convocatoria['link']       = data.link;
                _convocatoria['user']       = data.user;

                if (_convocatoria.titulo.trim()) {
                    if (convocatoria.id) {

                        setConvocatoria({ ...convocatoria });
                        const index = findIndexById(convocatoria.id);
                        _convocatorias[index] = _convocatoria;
                        updateConvocatoriaID({titulo:`${_convocatoria.titulo}`,codigo:`${_convocatoria.codigo}`,semestre:`${_convocatoria.semestre}`,link:`${_convocatoria.link}`,user:`${_convocatoria.user}`},convocatoria.id);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Convocatoria Actualizada', life: 3000 });
                    }
                    else {

                        _convocatoria.id = uniqid("conv-");
                        _convocatorias.push(_convocatoria);
                        console.log({id:`${_convocatoria.id}`,titulo:`${_convocatoria.titulo}`,codigo:`${_convocatoria.codigo}`,semestre:`${_convocatoria.semestre}`,link:`${_convocatoria.link}`,user:`${_convocatoria.user}`});
                        createConvocatoria({id:`${_convocatoria.id}`,titulo:`${_convocatoria.titulo}`,codigo:`${_convocatoria.codigo}`,semestre:`${_convocatoria.semestre}`,link:`${_convocatoria.link}`,user:`${_convocatoria.user}`});
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Convocatoria Creada', life: 3000 });
                    }
                }
                setConvocatorias(_convocatorias);
                setConvocatoriaDialog(false);
                setConvocatoria(emptyConvocatoria);
                formik.resetForm();
        }
            
        },
      });

      const esRepetido =(value)=>{
        var _convocatorias = [...convocatorias];
        let res = _convocatorias.find(i => (i.codigo).toLowerCase().trim() === (value).toLowerCase().trim() );
         if(res === undefined){
             return true;
         }else{
             return false;
         }
    }
    const esRepetidoUpdate =(value,original)=>{
        var _convocatorias = [...convocatorias];
        let aux = _convocatorias.filter(i =>(i.codigo).toLowerCase().trim() != (original).toLowerCase().trim())
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
        fetchConvocatorias();
    },[])

    const fetchConvocatorias = () =>{
        getConvocatorias().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Convocatorias insertados-----------");
                setConvocatorias(json.data);
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

    useEffect(() => {
        console.log(stateConvocatoria); //esta línea se ejecuta la primera vez que se renderiza y en todos los cambios que location tenga, aqui siempre tendrás el ultimo valor de location
     }, [stateConvocatoria])

    const openNew = () => {
        setConvocatoria(emptyConvocatoria);
        formik.resetForm();
        setSubmitted(false);
        setStateConvocatoria(false); 
        setConvocatoriaDialog(true);    
    }

    const hideDialog = () => {
        setSubmitted(false);
        setConvocatoriaDialog(false);
    }

    const showDialog = () => {
        setSubmitted(true);
        formik.handleSubmit();
    }

    const hideDeleteConvocatoriaDialog = () => {
        setDeleteConvocatoriaDialog(false);
    }

    const editConvocatoria = (convocatoria) => {
        setConvocatoria({ ...convocatoria });
        setSubmitted(true);
        
        formik.setValues(
        {
            titulo:    `${convocatoria.titulo}`,
            codigo:    `${convocatoria.codigo}`,
            semestre:  `${convocatoria.semestre}`,
            link:      `${convocatoria.link}`,
            user:      `${convocatoria.user}`
        });
        setConvocatoriaUpdate(`${convocatoria.codigo}`);
        setStateConvocatoria(true);
        setConvocatoriaDialog(true);
    }

    const confirmDeleteConvocatoria = (convocatoria) => {
        setConvocatoria(convocatoria);
        setDeleteConvocatoriaDialog(true);
    }

    const deleteConvocatoria = () => {
        let _convocatorias = convocatorias.filter(val => val.id !== convocatoria.id);
        setConvocatorias(_convocatorias);
        setDeleteConvocatoriaDialog(false);

        if (convocatoria.titulo.trim()) {
            if (convocatoria.id) {
                deleteConvocatoriaID(convocatoria.id);
            }
        }
        setConvocatoria(emptyConvocatoria);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Convocatoria Eliminada', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < convocatorias.length; i++) {
            if (convocatorias[i].id === id) {

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
                <Button label={`${rowData.link}`} className="p-button-link" onClick={() => window.open(`${rowData.link}`)} style={props.layoutColorMode === 'light' ? {'color':'#495057', 'font-weight': 'bold' , 'text-align': 'justify'} : {'color':'#ffffff', 'font-weight': 'bold' , 'text-align': 'justify'}}/>      
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
                <Button icon="pi pi-pencil" style={{'background': '#13af4e'}} className="p-button-rounded p-button-success p-mr-2"   onClick={() => editConvocatoria(rowData)} />
                <Button icon="pi pi-trash"  style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"          onClick={() => confirmDeleteConvocatoria(rowData)} />
            </div>
        );
    }

    const deleteConvocatoriaDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeleteConvocatoriaDialog} />
            <Button label="Si" icon="pi pi-check" style={props.layoutColorMode === 'light' ? {'color':'#13af4e','border-color':'#13af4e'} : {'color':'#13af4e','border-color':'#13af4e'}} className="p-button-text" onClick={deleteConvocatoria} />
        </>
    );


    let headerGroup = <ColumnGroup>
                        <Row>
                            <Column header="ID"                 style={{ 'background-color': '#13af4e', width:'20%'}} />
                            <Column header="TITULO"             style={{ 'background-color': '#13af4e', width:'20%'}}/>
                            <Column header="CODIGO"             style={{ 'background-color': '#13af4e', width:'20%'}} />
                            <Column header="SEMESTRE"           style={{ 'background-color': '#13af4e', width:'20%'}}/>
                            <Column header="LINK"               style={{ 'background-color': '#13af4e', width:'40%'}} />
                            <Column header="USER"               style={{ 'background-color': '#13af4e', width:'20%'}}/>
                            <Column header="Editar/Eliminar"    style={{ 'background-color': '#13af4e', width:'20%'}}/>
                        </Row>
                    </ColumnGroup>;


    const headerDialog =()=>{
        return (stateConvocatoria)?"Actualizando convocatoria":"Añadir convocatoria"
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                
                    <Toast ref={toast} />
                    <Toolbar className="" left={leftToolbarTemplate}></Toolbar>

                    <DataTable headerColumnGroup={headerGroup} ref={dt} value={convocatorias} selection={selectedConvocatorias}  onSelectionChange={(e) => setSelectedConvocatorias(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm col-12"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" resizableColumns columnResizeMode="fit" showGridlines>
                    
                        <Column style={{width:'20%'}} field="id"       header="ID"       sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="titulo"   header="TITULO"   sortable body={tituloBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="codigo"   header="CODIGO"   sortable body={codigoBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="semestre" header="SEMESTRE" sortable body={semestreBodyTemplate}></Column>
                        <Column style={{width:'40%'}} field="link"     header="LINK"     sortable body={linkBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="user"     header="USER"     sortable body={userBodyTemplate}></Column>
                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={convocatoriaDialog} style={{ width: '450px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>
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

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-link"></i>
                                        </span>
                                        <InputTextarea id="link" name='link' placeholder="Link"  value={formik.values.link} onChange={formik.handleChange}/>
                                </div>       
                            </div>
                            {getFormErrorMessage('link')}

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


                    <Dialog className="mt-2" visible={deleteConvocatoriaDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteConvocatoriaDialogFooter} onHide={hideDeleteConvocatoriaDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {convocatoria && <span>¿Estás segura de que quieres eliminar? <b>{convocatoria.titulo}</b> <b>{convocatoria.semestre}</b>?</span>}
                        </div>
                    </Dialog>
    
                </div>
            </div>
        </div>
    );
}
