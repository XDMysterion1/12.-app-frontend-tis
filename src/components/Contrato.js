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
import { renderToString }   from 'react-dom/server';
import jsPDF                from 'jspdf';
import 'jspdf-autotable';

import uniqid               from 'uniqid';

import { getContratos,createContrato,updateContratoID} from '../service/apiContrato';
import { getUsersActivas    } from '../service/apiUser';
import { getEmpresasActivas,getEmpresaID } from '../service/apiEmpresa';
import { getConvocatoriasPublicados    } from '../service/apiConvocatoria';
import { getPliegosPublicados }          from '../service/apiPliego';

export const Contrato = (props) => {

    let emptyContrato = {
        id:                 null,
        fecha:              '',
        codigoConvocatoria: '',
        codigoPliego:       '',
        estado:             '',
        empresa:            '',
        user:               ''
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

    const [contratos, setContratos]                          = useState(null);
    const [users, setUsers]                                  = useState(null);
    const [empresas, setEmpresas]                            = useState(null);

    const [convocatorias, setConvocatorias]                  = useState(null);
    const [pliegos, setPliegos]                              = useState(null);
    const [globalFilter, setGlobalFilter]                    = useState('');
    const [loading, setLoading]                              = useState(true);
    const [contratoDialog, setContratoDialog]                = useState(false);
    const [deleteContratoDialog, setDeleteContratoDialog]    = useState(false);

    const [contrato, setContrato]                            = useState(emptyContrato);
    const [selectedContratos, setSelectedContratos]          = useState(null);
    const [submitted, setSubmitted]                          = useState(false);
    const toast                                              = useRef(null);
    const dt                                                 = useRef(null);
    const [stateContrato,setStateContrato]                   = useState(false);
    const [contratoUpdate, setContratoUpdate]                = useState("");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 0;
    let prevYear = (prevMonth === 11) ? year - 0 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);

    const formik = useFormik({
        initialValues: {
            fecha:              '',
            codigoConvocatoria: '',
            codigoPliego:       '',
            estado:             '',
            empresa:            '',
            user:               ''
        },
         validate: (data) => {
            let errors = {};

            if(stateContrato){
                if (!data.fecha) {
                    errors.fecha = "Se requiere la fecha";
                } 

                if (!data.codigoConvocatoria) {
                    errors.codigoConvocatoria = "Se requiere el codigo de la convocatoria";
                } else if (data.codigoConvocatoria.length < 2) {
                    errors.codigoConvocatoria = "Como minimo 2 caracteres";
                } else if (data.codigoConvocatoria.length > 30) {
                    errors.codigoConvocatoria = "Como maximo 30 caracteres";
                }

                if (!data.codigoPliego) {
                    errors.codigoPliego = "Se requiere el codigo del pliego de espeficicaciones";
                } else if (data.codigoPliego.length < 2) {
                    errors.codigoPliego = "Como minimo 2 caracteres";
                } else if (data.codigoPliego.length > 30) {
                    errors.codigoPliego = "Como maximo 30 caracteres";
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
                
                if (!data.empresa) {
                    errors.empresa = "Se requiere la empresa";
                } else if (data.empresa.length < 2) {
                    errors.empresa = "Como minimo 2 caracteres";
                } else if (data.empresa.length > 30) {
                    errors.empresa = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.empresa)) {
                    errors.empresa = "No se permiten numero o caracteres especiales";
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
                if (!data.fecha) {
                    errors.fecha = "Se requiere la fecha";
                }

                if (!data.codigoConvocatoria) {
                    errors.codigoConvocatoria = "Se requiere el codigo de la convocatoria";
                } else if (data.codigoConvocatoria.length < 2) {
                    errors.codigoConvocatoria = "Como minimo 2 caracteres";
                } else if (data.codigoConvocatoria.length > 30) {
                    errors.codigoConvocatoria = "Como maximo 30 caracteres";
                }

                if (!data.codigoPliego) {
                    errors.codigoPliego = "Se requiere el codigo del pliego de espeficicaciones";
                } else if (data.codigoPliego.length < 2) {
                    errors.codigoPliego = "Como minimo 2 caracteres";
                } else if (data.codigoPliego.length > 30) {
                    errors.codigoPliego = "Como maximo 30 caracteres";
                }
                
                if (!data.empresa) {
                    errors.empresa = "Se requiere la empresa";
                } else if (data.empresa.length < 2) {
                    errors.empresa = "Como minimo 2 caracteres";
                } else if (data.empresa.length > 30) {
                    errors.empresa = "Como maximo 30 caracteres";
                }else if (!/^^[a-zA-Z0-9\s-]+$/i.test(data.empresa)) {
                    errors.empresa = "No se permiten numero o caracteres especiales";
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
                let _contratos = [...contratos];
                let _contrato  = {...contrato };
                console.log(data.fecha);
                let dat = new Date(data.fecha);
                let convertido = dat.toLocaleDateString(undefined, options);
                _contrato['fecha']              = convertido;
                _contrato['codigoConvocatoria'] = data.codigoConvocatoria;
                _contrato['codigoPliego']       = data.codigoPliego;
                _contrato['estado']             = data.estado;
                _contrato['empresa']            = data.empresa;
                _contrato['user']               = data.user;

                if (_contrato.codigoConvocatoria.trim()) {
                    if (contrato.id) {

                        setContrato({ ...contrato });
                        const index = findIndexById(contrato.id);
                        _contratos[index] = _contrato;

                        updateContratoID({fecha:`${_contrato.fecha}`,codigoConvocatoria:`${_contrato.codigoConvocatoria}`,codigoPliego:`${_contrato.codigoPliego}`,estado:`${_contrato.estado}`,empresa:`${_contrato.empresa}`,user:`${_contrato.user}`},contrato.id);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Contrato Actualizado', life: 3000 });
                    }
                    else {

                        _contrato.id        = uniqid("cont-");
                        _contrato.estado    = "Activo"; 
                        _contratos.push(_contrato);
                
                        createContrato({id:`${_contrato.id}`,fecha:`${_contrato.fecha}`,codigoConvocatoria:`${_contrato.codigoConvocatoria}`,codigoPliego:`${_contrato.codigoPliego}`,estado:`${_contrato.estado}`,empresa:`${_contrato.empresa}`,user:`${_contrato.user}`});
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Contrato Creado', life: 3000 });
                    }
                }
                setContratos(_contratos);
                setContratoDialog(false);
                setContrato(emptyContrato);
                formik.resetForm();
        }
            
        },
      });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="ml-1 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };

    useEffect(()=>{
        fetchContratos();
    },[])

    const fetchContratos = () =>{
        getContratos().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Contratos insertados-----------");
                setContratos(json.data);
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

    useEffect(()=>{
        fetchEmpresas();
    },[])

    const fetchEmpresas = () =>{
        getEmpresasActivas().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Empresas insertadas-----------");
                setEmpresas(json.data);
            }
        })
    }

    useEffect(()=>{
        fetchConvocatorias();
    },[])

    const fetchConvocatorias = () =>{
        getConvocatoriasPublicados().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Convocatorias insertadas-----------");
                setConvocatorias(json.data);
            }
        })
    }

    useEffect(()=>{
        fetchPliegos();
    },[])

    const fetchPliegos = () =>{
        getPliegosPublicados().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Pliegos insertados-----------");
                setPliegos(json.data);
            }
        })
    }

    

    const openNew = () => {
        setContrato(emptyContrato);
        formik.resetForm();
        setSubmitted(false);
        setStateContrato(false); 
        setContratoDialog(true);    
    }

    const hideDialog = () => {
        setSubmitted(false);
        setContratoDialog(false);
    }

    const showDialog = () => {
        setSubmitted(true);
        formik.handleSubmit();
    }

    const hideDeleteContratoDialog = () => {
        setDeleteContratoDialog(false);
    }

    const editContratto = (contrato) => {
        setContrato({ ...contrato });
        setSubmitted(true);

        formik.resetForm();
        formik.setValues(
        {
            fecha:              `${contrato.fecha}`,
            codigoConvocatoria: `${contrato.codigoConvocatoria}`,
            codigoPliego:       `${contrato.codigoPliego}`,
            estado:             `${contrato.estado}`,
            empresa:            `${contrato.empresa}`,
            user:               `${contrato.user}`
        });
        setContratoUpdate(`${contrato.codigoConvocatoria}`);
        setStateContrato(true);
        setContratoDialog(true);
    }

    const confirmDeleteContrato = (contrato) => {
        setContrato(contrato);
        setDeleteContratoDialog(true);
    }

    const deleteContrato = () => {
        let _contratos = [...contratos];
        let _contrato  = {...contrato };
        

        if (contrato.codigoConvocatoria.trim()) {
            if (contrato.id) {

                
                const index = findIndexById(contrato.id);
                _contratos[index] = _contrato;
                updateContratoID({fecha:`${_contrato.fecha}`,codigoConvocatoria:`${_contrato.codigoConvocatoria}`,codigoPliego:`${_contrato.codigoPliego}`,estado:"Desactivado",empresa:`${_contrato.empresa}`,user:`${_contrato.user}`},contrato.id);
                _contrato['fecha']              = _contrato.fecha;
                _contrato['codigoConvocatoria'] = _contrato.codigoConvocatoria;
                _contrato['codigoPliego']       = _contrato.codigoPliego;
                _contrato['estado']             = "Desactivado";
                _contrato['empresa']            = _contrato.empresa;
                _contrato['user']               = _contrato.user;
                setContrato({ ...contrato });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Contrato desactivado', life: 3000 });
            }
        }
        setContratos(_contratos);
        setContrato(emptyContrato);
        setDeleteContratoDialog(false);
        
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < contratos.length; i++) {
            if (contratos[i].id === id) {

                index = i;
                break;
            }
        }

        return index;
    }

    const findIndexByIdEmpresa = (id) => {
        let data;
        for (let i = 0; i < empresas.length; i++) {
            if (empresas[i].id === id) {
                data = {
                    id:              empresas[i].id,
                    nombre:          empresas[i].nombre,
                    nombreCorto:     empresas[i].nombreCorto,
                    nombreLargo:     empresas[i].nombreLargo,
                    tipoSociedad:    empresas[i].tipoSociedad,
                    direccion:       empresas[i].direccion,
                    email:           empresas[i].direccion,
                    password:        empresas[i].password,
                    informacion:     empresas[i].informacion,
                    estado:          empresas[i].estado,
                    user:            empresas[i].user
                }

                break;
            }
        }
        return data;
    }

    const findIndexByIdUser = (id) => {
        let data;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                data = {
                    id:       users[i].id,
                    nombre:   users[i].nombre,
                    apellido: users[i].apellido,
                    email:    users[i].email,
                    password: users[i].password,
                    estado:   users[i].estado,
                    rol:      users[i].rol
                }

                break;
            }
        }
        return data;
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">id</span>
                {rowData.id}
            </>
        );
    }

    const fechaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Fecha</span>
                {rowData.fecha}
            </>
        );
    }

    const codigoConvocatoriaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Codigo convocatoria</span>
                {rowData.codigoConvocatoria}
            </>
        );
    }

    const codigoPliegoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Codigo de Pliego</span>
                {rowData.codigoPliego}
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

    const empresaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Empresa</span>
                {rowData.empresa}
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
                <Button icon="pi pi-pencil"    style={{'background': '#13af4e'}} className="p-button-rounded p-button-success mr-2"   onClick={() => editContratto(rowData)} />
                <Button icon="pi pi-trash"     style={{'background': '#eee500'}} className="p-button-rounded p-button-warning "       onClick={() => confirmDeleteContrato(rowData)} />
            </div>
        );
    }


    const generatePDF = (contrato) => {
        console.log(contrato.empresa)
        let index = findIndexByIdEmpresa(contrato.empresa);
        let _user = findIndexByIdUser(index.user);
        var doc = new jsPDF();
        doc.setFont("Arial Bold");
        doc.text(60, 20,'CONTRATO DE PRESTACIÓN DE');
        doc.text(65, 25,'SERVICIOS - CONSULTORÍA');
        doc.setFontSize(15);
        doc.setFont("normal");
        doc.setFontSize(12); 
        doc.text(70, 30,`${contrato.fecha}`);

        doc.text(20, 40, 'Que suscriben la empresa Taller de Ingeniería de Software - TIS, que en lo sucesivo se');
        doc.text(20, 45, 'denominará TIS, por una parte, y la consultora '+ `${index.nombre.toLocaleUpperCase()}`+ ' '+ `${index.tipoSociedad.toLocaleUpperCase()}`+' registrada debidamente en el ');
        doc.text(20, 50, 'Departamento de Procesamiento de Datos y Registro e Inscripciones, domiciliada en la ciudad de');
        doc.text(20, 55, 'Cochabamba, que en lo sucesivo se denominará '+ `${index.nombre.toLocaleUpperCase()}`+ ' '+ `${index.tipoSociedad.toLocaleUpperCase()}`+', por otra parte, de');
        doc.text(20, 60, 'conformidad a las cláusulas que se detallan a continuación:');

        doc.text(20, 70, 'PRIMERA.- TIS contratará los servicios del Contratista para la provisión de un Sistema de Apoyo a');
        doc.text(20, 75, 'la Empresa TIS que se realizará, conforme a la modalidad y presupuesto entregado por la');
        doc.text(20, 80, 'Consultora, en su documento de propuesta técnica, y normas estipuladas por TIS.');

        doc.text(20, 90, 'SEGUNDO.- El objeto de este contrato es la provisión de un producto software.');

        doc.text(20, 100,'TERCERO.- La consultora ' + `${index.nombre.toLocaleUpperCase()}`+ ' '+ `${index.tipoSociedad.toLocaleUpperCase()}`+', se hace responsable por la buena ejecución de las');
        doc.text(20, 105,'distintas fases, que involucren su ingeniería del proyecto, especificadas en la propuesta técnica');
        doc.text(20, 110,'corregida de acuerdo al pliego de especificaciones.');

        doc.text(20, 120,'CUARTO.- Para cualquier otro punto no estipulado en el presente contrato, debe hacerse referencia');
        doc.text(20, 125,'a la Convocatoria Pública '+ `${contrato.codigoConvocatoria.toLocaleUpperCase()}`+', al Pliego de Especificaciones '+ `${contrato.codigoPliego.toLocaleUpperCase()}`+' y/o a');
        doc.text(20, 130,'PG-TIS (Plan Global - TIS)');

        doc.text(20, 140,'QUINTO.- Se pone en evidencia que cualquier incumplimiento de las cláusulas estipuladas en el ');
        doc.text(20, 145,'presente contrato, es pasible a la disolución del mismo.');
        
        doc.text(20, 155,'SEXTO.- La consultora '+ `${index.nombre.toLocaleUpperCase()}`+ ' '+ `${index.tipoSociedad.toLocaleUpperCase()}`+', declara su absoluta conformidad con los términos del ');
        doc.text(20, 160,'presente contrato. Se deja constancia de que los datos y antecedentes personales jurídicos ');
        doc.text(20, 165,'proporcionados por el adjudicatario son verídicos.');

        doc.text(20, 175,'SEPTIMO.- El presente contrato se disuelve también, por cualquier motivo de incumplimiento a');
        doc.text(20, 180,'normas establecidas en PG-TIS (Plan Global - TIS).');

        doc.text(20, 190,'OCTAVO.- Por la disolución del contrato, TIS tiene todo el derecho de ejecutar la boleta de garantía, ');
        doc.text(20, 195,'que es entregada por el contratado como documento de seriedad de la empresa.');

        doc.text(20, 205,'NOVENO.- La información que TIS brinde al contratado debe ser de rigurosa confidencialidad, y no');
        doc.text(20, 210,'utilizarse para otros fines que no sea el desarrollo del proyecto.');

        doc.text(20, 220,'DECIMO.- TIS representada por su directorio Lic. Corina Flores V., Lic. M. Leticia Blanco C., Lic.');
        doc.text(20, 225,'David Escalera F., y Lic. Patricia Rodriguez, y por otra; la consultora '+ `${index.nombre.toLocaleUpperCase()}`+ ' '+ `${index.tipoSociedad.toLocaleUpperCase()}`+', ');
        doc.text(20, 230,'representada por su representante legal '+`${_user.nombre}`+' '+`${_user.apellido}` +', dan su plena');
        doc.text(20, 235,'conformidad a los términos y condiciones establecidos en el presente Contrato de Prestación de');
        doc.text(20, 240,'Servicios y Consultoría, firmando en constancia al pie de presente documento.');

        doc.text(70, 250,'Cochabamba, '+`${contrato.fecha}`);

        doc.text(20, 270,'REPRESENTANTE');
        doc.text(20, 275,'GRUPOEMPRESA');

        doc.text(150, 270,'REPRESENTANTE');
        doc.text(150, 275,'CONSULTORA TIS');

        doc.save('contrato.pdf')
    } 

    const pdfBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-file-pdf"  style={{'background': '#ed4651'}} className="p-button-rounded p-button-success mr-2"  onClick={() =>(generatePDF(rowData))}     />
            </div>
        );
    }
    

    const deleteContratoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" style={{'background': '#d13639','color':'#ffffff'}} className="p-button-text" onClick={hideDeleteContratoDialog} />
            <Button label="Si" icon="pi pi-check" style={props.layoutColorMode === 'light' ? {'color':'#13af4e','border-color':'#13af4e'} : {'color':'#13af4e','border-color':'#13af4e'}} className="p-button-text" onClick={deleteContrato} />
        </>
    );



    const renderHeader = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gestion de firma de contrato</h5>
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
                    <Column header="ID"                     field="id"                  sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="FECHA"                  field="fecha"               sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="COD. CONVOCATORIA"      field="codigoConvocatoria"  sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="COD. PLIEGO"            field="codigoPliego"        sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="ESTADO"                 field="estado"              sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="Editar/Eliminar"                                             style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="Generar PDF"                                                 style={{ 'background-color': '#13af4e', width:'20%'}}/>
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();



    const headerDialog =()=>{
        return (stateContrato)?"Actualizando contrato":"Añadir contrato"
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                
                    <Toast ref={toast} />
                    <Toolbar className="" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={contratos} selection={selectedContratos}  onSelectionChange={(e) => setSelectedContratos(e.value)}
                        dataKey="id" rowHover paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-sm p-datatable-gridlines p-datatable-striped"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} contratos" resizableColumns columnResizeMode="fit" showGridlines
                        globalFilter={globalFilter} emptyMessage="No se encontro los contratos" loading={loading} headerColumnGroup={headerGroup}
                        >
                    
                        <Column style={{width:'20%'}} field="id"                    header="ID"                     sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="fecha"                 header="FECHA"                  sortable body={fechaBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="codigoConvocatoria"    header="COD. CONVOCATORIA"      sortable body={codigoConvocatoriaBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="codigoPliego"          header="COD. PLIEGO"            sortable body={codigoPliegoBodyTemplate}></Column>                   
                        <Column style={{width:'20%'}} field="estado"                header="ESTADO"                 sortable body={estadoBodyTemplate}></Column>
                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>
                        <Column header="Generar PDF"  body={pdfBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={contratoDialog} style={{ width: '450px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-calendar"></i>
                                        </span>
                                        <Calendar id="fecha" name="fecha" placeholder="Seleccione una fecha" value={formik.values.fecha} onChange={formik.handleChange} locale="es" dateFormat ="mm/dd/yy" minDate={minDate} maxDate={maxDate} readOnlyInput/>
                                </div>       
                            </div>
                            {getFormErrorMessage('fecha')}

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                        <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/code.png' : 'assets/layout/images/code-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>  
                                        </span>
                                        <Dropdown id="codigoConvocatoria" name="codigoConvocatoria" placeholder="Seleccione el codigo de convocatoria" value={formik.values.codigoConvocatoria} onChange={formik.handleChange} options={convocatorias} optionLabel="codigo"  optionValue="codigo"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('codigoConvocatoria')}

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                        <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/code.png' : 'assets/layout/images/code-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>  
                                        </span>
                                        <Dropdown id="codigoPliego" name="codigoPliego" placeholder="Seleccione el codigo de pliego" value={formik.values.codigoPliego} onChange={formik.handleChange} options={pliegos} optionLabel="codigo"  optionValue="codigo"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('codigoPliego')}

                            {(stateContrato)?(
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
                                            <i className="pi pi-briefcase"></i>
                                        </span>
                                        <Dropdown id="empresa" name="empresa" placeholder="Seleccione una empresa" value={formik.values.empresa} onChange={formik.handleChange} options={empresas} optionLabel="nombre"  optionValue="id"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('empresa')}

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


                    <Dialog className="mt-2" visible={deleteContratoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteContratoDialogFooter} onHide={hideDeleteContratoDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {contrato && <span>¿Estás segura de que quieres eliminar? <b>{contrato.id}</b>?</span>}
                        </div>
                    </Dialog>
    
                </div>
            </div>
        </div>
    );
}
