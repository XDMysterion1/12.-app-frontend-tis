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
import Cookies              from 'universal-cookie';
import jsPDF                from 'jspdf';

import uniqid               from 'uniqid';

import { getOrdens,createOrden,updateOrdenID} from '../service/apiOrden';
import { getUsersActivas  }                   from '../service/apiUser';
import { getEmpresasActivas }                 from '../service/apiEmpresa';


export const Orden = (props) => {

    let emptyParte = {
        id:                     null,
        fecha:                  '',
        caratulaA:              '',
        indiceA:                '',
        cartaA:                 '',
        boletaA:                '',
        conformacionA:          '',
        solvenciaA:             '',
        caratulaB:              '',
        indiceB:                '',
        propuestaServicioB:     '',
        planificacionB:         '',
        propuestaEconomicaB:    '',
        planPagosB:             '',
        cumplimientoProponente: '',
        claridadOrganizacion:   '',
        cumplimientoTecnico:    '',
        claridadProceso:        '',
        plazosEjecucion:        '',
        precioTotal:            '',
        usoHerramienta:         '',
        estado:                 '',
        empresa:                ''
    };

    const estados = [
        { name: "Activo"      },
        { name: "Desactivado" }
    ];

    const puntuacion1 = [
        { name: '0'},
        { name: '1'},
        { name: '2' },
        { name: '3'},
        { name: '4'},
        { name: '5'},
        { name: '6'},
        { name: '7' },
        { name: '8'},
        { name: '9'},
        { name: '10'},
        { name: '11'},
        { name: '12' },
        { name: '13'},
        { name: '14'},
        { name: '15'}
    ];

    const puntuacion2 = [
        { name: '0'},
        { name: '1'},
        { name: '2' },
        { name: '3'},
        { name: '4'},
        { name: '5'},
        { name: '6'},
        { name: '7' },
        { name: '8'},
        { name: '9'},
        { name: '10'}
    ];
    const puntuacion3 = [
        { name: '0'},
        { name: '1'},
        { name: '2' },
        { name: '3'},
        { name: '4'},
        { name: '5'},
        { name: '6'},
        { name: '7' },
        { name: '8'},
        { name: '9'},
        { name: '10'},
        { name: '11'},
        { name: '12' },
        { name: '13'},
        { name: '14'},
        { name: '15'},
        { name: '16'},
        { name: '17' },
        { name: '18'},
        { name: '19'},
        { name: '20'},
        { name: '21'},
        { name: '22' },
        { name: '23'},
        { name: '24'},
        { name: '25'},
        { name: '26'},
        { name: '27' },
        { name: '28'},
        { name: '29'},
        { name: '30'}
    ];
    const puntuacion4 = [
        { name: '0'},
        { name: '1'},
        { name: '2' },
        { name: '3'},
        { name: '4'},
        { name: '5'},
        { name: '6'},
        { name: '7' },
        { name: '8'},
        { name: '9'},
        { name: '10'}
    ];
    const puntuacion5 = [
        { name: '0'},
        { name: '1'},
        { name: '2' },
        { name: '3'},
        { name: '4'},
        { name: '5'},
        { name: '6'},
        { name: '7' },
        { name: '8'},
        { name: '9'},
        { name: '10'}
    ];
    const puntuacion6 = [
        { name: '0'},
        { name: '1'},
        { name: '2' },
        { name: '3'},
        { name: '4'},
        { name: '5'},
        { name: '6'},
        { name: '7' },
        { name: '8'},
        { name: '9'},
        { name: '10'},
        { name: '11'},
        { name: '12' },
        { name: '13'},
        { name: '14'},
        { name: '15'}
    ];
    const puntuacion7 = [
        { name: '0'},
        { name: '1'},
        { name: '2' },
        { name: '3'},
        { name: '4'},
        { name: '5'},
        { name: '6'},
        { name: '7' },
        { name: '8'},
        { name: '9'},
        { name: '10'}
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
    const [empresas, setEmpresas]                      = useState(null);

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
    const cookies                                      = new Cookies();

    const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
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
            fecha:                  '',
            caratulaA:              '',
            indiceA:                '',
            cartaA:                 '',
            boletaA:                '',
            conformacionA:          '',
            solvenciaA:             '',
            caratulaB:              '',
            indiceB:                '',
            propuestaServicioB:     '',
            planificacionB:         '',
            propuestaEconomicaB:    '',
            planPagosB:             '',
            cumplimientoProponente: '',
            claridadOrganizacion:   '',
            cumplimientoTecnico:    '',
            claridadProceso:        '',
            plazosEjecucion:        '',
            precioTotal:            '',
            usoHerramienta:         '',
            estado:                 '',
            empresa:                ''

        },
         validate: (data) => {
            let errors = {};

            if(stateParte){

                if (!data.fecha) {
                    errors.fecha = "Se requiere la fecha";
                } 

                if (!data.caratulaA) {
                    errors.caratulaA = "Se requiere la caratula";
                } else if (data.caratulaA.length < 2) {
                    errors.caratulaA = "Como minimo 2 caracteres";
                } else if (data.caratulaA.length > 512) {
                    errors.caratulaA = "Como maximo 512 caracteres";
                }

                
                if (!data.indiceA) {
                    errors.indiceA = "Se requiere el indice";
                } else if (data.indiceA.length < 2) {
                    errors.indiceA = "Como minimo 2 caracteres";
                } else if (data.indiceA.length > 512) {
                    errors.indiceA = "Como maximo 512 caracteres";
                }

                if (!data.cartaA) {
                    errors.cartaA = "Se requiere la carta";
                } else if (data.cartaA.length < 2) {
                    errors.cartaA = "Como minimo 2 caracteres";
                } else if (data.cartaA.length > 512) {
                    errors.cartaA = "Como maximo 512 caracteres";
                }

                if (!data.boletaA) {
                    errors.boletaA = "Se requiere la boleta de garantia";
                } else if (data.boletaA.length < 2) {
                    errors.boletaA = "Como minimo 2 caracteres";
                } else if (data.boletaA.length > 512) {
                    errors.boletaA = "Como maximo 512 caracteres";
                }

                if (!data.conformacionA) {
                    errors.conformacionA = "Se requiere la conformacion del grupo empresa";
                } else if (data.conformacionA.length < 2) {
                    errors.conformacionA = "Como minimo 2 caracteres";
                } else if (data.conformacionA.length > 512) {
                    errors.conformacionA = "Como maximo 512 caracteres";
                }

                if (!data.solvenciaA) {
                    errors.solvenciaA = "Se requiere la solvencia tecnica";
                } else if (data.solvenciaA.length < 2) {
                    errors.solvenciaA = "Como minimo 2 caracteres";
                } else if (data.solvenciaA.length > 512) {
                    errors.solvenciaA = "Como maximo 512 caracteres";
                } 

                if (!data.caratulaB) {
                    errors.caratulaB = "Se requiere la caratula";
                } else if (data.caratulaB.length < 2) {
                    errors.caratulaB = "Como minimo 2 caracteres";
                } else if (data.caratulaB.length > 512) {
                    errors.caratulaB = "Como maximo 512 caracteres";
                }

                if (!data.indiceB) {
                    errors.indiceB = "Se requiere el indice";
                } else if (data.indiceB.length < 2) {
                    errors.indiceB = "Como minimo 2 caracteres";
                } else if (data.indiceB.length > 512) {
                    errors.indiceB = "Como maximo 512 caracteres";
                } 

                if (!data.propuestaServicioB) {
                    errors.propuestaServicioB = "Se requiere la propuesta de servicio";
                } else if (data.propuestaServicioB.length < 2) {
                    errors.propuestaServicioB = "Como minimo 2 caracteres";
                } else if (data.propuestaServicioB.length > 512) {
                    errors.propuestaServicioB = "Como maximo 512 caracteres";
                } 

                if (!data.planificacionB) {
                    errors.planificacionB = "Se requiere la planificacion";
                } else if (data.planificacionB.length < 2) {
                    errors.planificacionB = "Como minimo 2 caracteres";
                } else if (data.planificacionB.length > 512) {
                    errors.planificacionB = "Como maximo 512 caracteres";
                } 

                if (!data.propuestaEconomicaB) {
                    errors.propuestaEconomicaB = "Se requiere la propuesta economica";
                } else if (data.propuestaEconomicaB.length < 2) {
                    errors.propuestaEconomicaB = "Como minimo 2 caracteres";
                } else if (data.propuestaEconomicaB.length > 512) {
                    errors.propuestaEconomicaB = "Como maximo 512 caracteres";
                } 

                if (!data.planPagosB) {
                    errors.planPagosB = "Se requiere el plan de pagos";
                } else if (data.planPagosB.length < 2) {
                    errors.planPagosB = "Como minimo 2 caracteres";
                } else if (data.planPagosB.length > 512) {
                    errors.planPagosB = "Como maximo 512 caracteres";
                } 

                //---------------------------------------------------------
                if (!data.cumplimientoProponente) {
                    errors.cumplimientoProponente = "Se requiere el cumplimiento de espeficicaciones";
                } else if (data.cumplimientoProponente.length < 1) {
                    errors.cumplimientoProponente = "Como minimo 2 caracteres";
                } else if (data.cumplimientoProponente.length > 512) {
                    errors.cumplimientoProponente = "Como maximo 512 caracteres";
                } 

                if (!data.claridadOrganizacion) {
                    errors.claridadOrganizacion = "Se requiere el clarida de organizacion";
                } else if (data.claridadOrganizacion.length < 1) {
                    errors.claridadOrganizacion = "Como minimo 2 caracteres";
                } else if (data.claridadOrganizacion.length > 512) {
                    errors.claridadOrganizacion = "Como maximo 512 caracteres";
                } 


                if (!data.cumplimientoTecnico) {
                    errors.cumplimientoTecnico = "Se requiere el cumplimiento de especificaciones tecnicas";
                } else if (data.cumplimientoTecnico.length < 1) {
                    errors.cumplimientoTecnico = "Como minimo 2 caracteres";
                } else if (data.cumplimientoTecnico.length > 512) {
                    errors.cumplimientoTecnico = "Como maximo 512 caracteres";
                } 

                if (!data.claridadProceso) {
                    errors.claridadProceso = "Se requiere el claridad de proceso de desarrollo";
                } else if (data.claridadProceso.length < 1) {
                    errors.claridadProceso = "Como minimo 2 caracteres";
                } else if (data.claridadProceso.length > 512) {
                    errors.claridadProceso = "Como maximo 512 caracteres";
                } 

                
                if (!data.plazosEjecucion) {
                    errors.plazosEjecucion = "Se requiere los plazos de ejecucion";
                } else if (data.plazosEjecucion.length < 1) {
                    errors.plazosEjecucion = "Como minimo 2 caracteres";
                } else if (data.plazosEjecucion.length > 512) {
                    errors.plazosEjecucion = "Como maximo 512 caracteres";
                } 

                if (!data.precioTotal) {
                    errors.precioTotal = "Se requiere los precios totales";
                } else if (data.precioTotal.length < 1) {
                    errors.precioTotal = "Como minimo 2 caracteres";
                } else if (data.precioTotal.length > 512) {
                    errors.precioTotal = "Como maximo 512 caracteres";
                }

                if (!data.usoHerramienta) {
                    errors.usoHerramienta = "Se requiere el uso de herramienta";
                } else if (data.usoHerramienta.length < 1) {
                    errors.usoHerramienta = "Como minimo 2 caracteres";
                } else if (data.usoHerramienta.length > 512) {
                    errors.usoHerramienta = "Como maximo 512 caracteres";
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

            }else{

                if (!data.fecha) {
                    errors.fecha = "Se requiere la fecha";
                } 

                if (!data.caratulaA) {
                    errors.caratulaA = "Se requiere la caratula";
                } else if (data.caratulaA.length < 2) {
                    errors.caratulaA = "Como minimo 2 caracteres";
                } else if (data.caratulaA.length > 512) {
                    errors.caratulaA = "Como maximo 512 caracteres";
                } 

                
                if (!data.indiceA) {
                    errors.indiceA = "Se requiere el indice";
                } else if (data.indiceA.length < 2) {
                    errors.indiceA = "Como minimo 2 caracteres";
                } else if (data.indiceA.length > 512) {
                    errors.indiceA = "Como maximo 512 caracteres";
                } 

                if (!data.cartaA) {
                    errors.cartaA = "Se requiere la carta";
                } else if (data.cartaA.length < 2) {
                    errors.cartaA = "Como minimo 2 caracteres";
                } else if (data.cartaA.length > 512) {
                    errors.cartaA = "Como maximo 512 caracteres";
                } 

                if (!data.boletaA) {
                    errors.boletaA = "Se requiere la boleta de garantia";
                } else if (data.boletaA.length < 2) {
                    errors.boletaA = "Como minimo 2 caracteres";
                } else if (data.boletaA.length > 512) {
                    errors.boletaA = "Como maximo 512 caracteres";
                } 

                if (!data.conformacionA) {
                    errors.conformacionA = "Se requiere la conformacion del grupo empresa";
                } else if (data.conformacionA.length < 2) {
                    errors.conformacionA = "Como minimo 2 caracteres";
                } else if (data.conformacionA.length > 512) {
                    errors.conformacionA = "Como maximo 512 caracteres";
                } 

                if (!data.solvenciaA) {
                    errors.solvenciaA = "Se requiere la solvencia tecnica";
                } else if (data.solvenciaA.length < 2) {
                    errors.solvenciaA = "Como minimo 2 caracteres";
                } else if (data.solvenciaA.length > 512) {
                    errors.solvenciaA = "Como maximo 512 caracteres";
                } 

                if (!data.caratulaB) {
                    errors.caratulaB = "Se requiere la caratula";
                } else if (data.caratulaB.length < 2) {
                    errors.caratulaB = "Como minimo 2 caracteres";
                } else if (data.caratulaB.length > 512) {
                    errors.caratulaB = "Como maximo 512 caracteres";
                } 

                if (!data.indiceB) {
                    errors.indiceB = "Se requiere el indice";
                } else if (data.indiceB.length < 2) {
                    errors.indiceB = "Como minimo 2 caracteres";
                } else if (data.indiceB.length > 512) {
                    errors.indiceB = "Como maximo 512 caracteres";
                } 

                if (!data.propuestaServicioB) {
                    errors.propuestaServicioB = "Se requiere la propuesta de servicio";
                } else if (data.propuestaServicioB.length < 2) {
                    errors.propuestaServicioB = "Como minimo 2 caracteres";
                } else if (data.propuestaServicioB.length > 512) {
                    errors.propuestaServicioB = "Como maximo 512 caracteres";
                } 

                if (!data.planificacionB) {
                    errors.planificacionB = "Se requiere la planificacion";
                } else if (data.planificacionB.length < 2) {
                    errors.planificacionB = "Como minimo 2 caracteres";
                } else if (data.planificacionB.length > 512) {
                    errors.planificacionB = "Como maximo 512 caracteres";
                } 

                if (!data.propuestaEconomicaB) {
                    errors.propuestaEconomicaB = "Se requiere la propuesta economica";
                } else if (data.propuestaEconomicaB.length < 2) {
                    errors.propuestaEconomicaB = "Como minimo 2 caracteres";
                } else if (data.propuestaEconomicaB.length > 512) {
                    errors.propuestaEconomicaB = "Como maximo 512 caracteres";
                } 

                if (!data.planPagosB) {
                    errors.planPagosB = "Se requiere el plan de pagos";
                } else if (data.planPagosB.length < 2) {
                    errors.planPagosB = "Como minimo 2 caracteres";
                } else if (data.planPagosB.length > 512) {
                    errors.planPagosB = "Como maximo 512 caracteres";
                } 

                //---------------------------------------------------------
                if (!data.cumplimientoProponente) {
                    errors.cumplimientoProponente = "Se requiere el cumplimiento de espeficicaciones";
                } else if (data.cumplimientoProponente.length < 1) {
                    errors.cumplimientoProponente = "Como minimo 2 caracteres";
                } else if (data.cumplimientoProponente.length > 512) {
                    errors.cumplimientoProponente = "Como maximo 512 caracteres";
                } 

                if (!data.claridadOrganizacion) {
                    errors.claridadOrganizacion = "Se requiere el clarida de organizacion";
                } else if (data.claridadOrganizacion.length < 1) {
                    errors.claridadOrganizacion = "Como minimo 2 caracteres";
                } else if (data.claridadOrganizacion.length > 512) {
                    errors.claridadOrganizacion = "Como maximo 512 caracteres";
                } 

                if (!data.cumplimientoTecnico) {
                    errors.cumplimientoTecnico = "Se requiere el cumplimiento de especificaciones tecnicas";
                } else if (data.cumplimientoTecnico.length < 1) {
                    errors.cumplimientoTecnico = "Como minimo 2 caracteres";
                } else if (data.cumplimientoTecnico.length > 512) {
                    errors.cumplimientoTecnico = "Como maximo 512 caracteres";
                } 

                if (!data.claridadProceso) {
                    errors.claridadProceso = "Se requiere el claridad de proceso de desarrollo";
                } else if (data.claridadProceso.length < 1) {
                    errors.claridadProceso = "Como minimo 2 caracteres";
                } else if (data.claridadProceso.length > 512) {
                    errors.claridadProceso = "Como maximo 512 caracteres";
                } 

                
                if (!data.plazosEjecucion) {
                    errors.plazosEjecucion = "Se requiere los plazos de ejecucion";
                } else if (data.plazosEjecucion.length < 1) {
                    errors.plazosEjecucion = "Como minimo 2 caracteres";
                } else if (data.plazosEjecucion.length > 512) {
                    errors.plazosEjecucion = "Como maximo 512 caracteres";
                } 

                if (!data.precioTotal) {
                    errors.precioTotal = "Se requiere los precios totales";
                } else if (data.precioTotal.length < 1) {
                    errors.precioTotal = "Como minimo 2 caracteres";
                } else if (data.precioTotal.length > 512) {
                    errors.precioTotal = "Como maximo 512 caracteres";
                } 

                if (!data.usoHerramienta) {
                    errors.usoHerramienta = "Se requiere el uso de herramienta";
                } else if (data.usoHerramienta.length < 1) {
                    errors.usoHerramienta = "Como minimo 2 caracteres";
                } else if (data.usoHerramienta.length > 512) {
                    errors.usoHerramienta = "Como maximo 512 caracteres";
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

            }

            return errors;
        },

        onSubmit: (data) => {
            console.log(data);
            if(submitted === true){
                
                let _partes = [...partes];
                let _parte  = {...parte };

                let dat1        = new Date(data.fecha);
                let convertido1 = dat1.toLocaleDateString(undefined, options1);

                _parte['fecha']                     = convertido1;
                _parte['caratulaA']                 = data.caratulaA;
                _parte['indiceA']                   = data.indiceA;
                _parte['cartaA']                    = data.cartaA;
                _parte['boletaA']                   = data.boletaA;
                _parte['conformacionA']             = data.conformacionA;
                _parte['solvenciaA']                = data.solvenciaA;
                _parte['caratulaB']                 = data.caratulaB;
                _parte['indiceB']                   = data.indiceB;
                _parte['propuestaServicioB']        = data.propuestaServicioB;
                _parte['planificacionB']            = data.planificacionB;
                _parte['propuestaEconomicaB']       = data.propuestaEconomicaB;
                _parte['planPagosB']                = data.planPagosB;
                _parte['cumplimientoProponente']    = data.cumplimientoProponente;
                _parte['claridadOrganizacion']      = data.claridadOrganizacion;
                _parte['cumplimientoTecnico']       = data.cumplimientoTecnico;
                _parte['claridadProceso']           = data.claridadProceso;
                _parte['plazosEjecucion']           = data.plazosEjecucion;
                _parte['precioTotal']               = data.precioTotal;
                _parte['usoHerramienta']            = data.usoHerramienta;
                _parte['estado']                    = data.estado;
                _parte['empresa']                   = data.empresa;
                _parte['user']                      = cookies.get('id');


                if (_parte.caratulaA.trim()) {
                    if (parte.id) {

                        setParte({ ...parte });
                        const index = findIndexById(parte.id);
                        _partes[index] = _parte;

                        updateOrdenID(
                            {
                                fecha:                      `${_parte.fecha}`,
                                caratulaA:                  `${_parte.caratulaA}`,
                                indiceA:                    `${_parte.indiceA}`,
                                cartaA:                     `${_parte.cartaA}`,
                                boletaA:                    `${_parte.boletaA}`,
                                conformacionA:              `${_parte.conformacionA}`,
                                solvenciaA:                 `${_parte.solvenciaA}`,
                                caratulaB:                  `${_parte.caratulaB}`,
                                indiceB:                    `${_parte.indiceB}`,
                                propuestaServicioB:         `${_parte.propuestaServicioB}`,
                                planificacionB:             `${_parte.planificacionB}`,
                                propuestaEconomicaB:        `${_parte.propuestaEconomicaB}`,
                                planPagosB:                 `${_parte.planPagosB}`,
                                cumplimientoProponente:     `${_parte.cumplimientoProponente}`,
                                claridadOrganizacion:       `${_parte.claridadOrganizacion}`,
                                cumplimientoTecnico:        `${_parte.cumplimientoTecnico}`,
                                claridadProceso:            `${_parte.claridadProceso}`,
                                plazosEjecucion:            `${_parte.plazosEjecucion}`,
                                precioTotal:                `${_parte.precioTotal}`,
                                usoHerramienta:             `${_parte.usoHerramienta}`,
                                estado:                     `${_parte.estado}`,
                                empresa:                    `${_parte.empresa}`,
                                user:                       `${_parte.user}`
                            }
                            ,parte.id);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Orden de cambio Actualizado', life: 3000 });
                    }
                    else {

                        _parte.id        = uniqid("Orden-");
                        _parte.estado    = "Activo";
                        _parte.user      = cookies.get('id'); 
                        _partes.push(_parte);
                        createOrden(
                            {
                                id:                         `${_parte.id}`,
                                fecha:                      `${_parte.fecha}`,
                                caratulaA:                  `${_parte.caratulaA}`,
                                indiceA:                    `${_parte.indiceA}`,
                                cartaA:                     `${_parte.cartaA}`,
                                boletaA:                    `${_parte.boletaA}`,
                                conformacionA:              `${_parte.conformacionA}`,
                                solvenciaA:                 `${_parte.solvenciaA}`,
                                caratulaB:                  `${_parte.caratulaB}`,
                                indiceB:                    `${_parte.indiceB}`,
                                propuestaServicioB:         `${_parte.propuestaServicioB}`,
                                planificacionB:             `${_parte.planificacionB}`,
                                propuestaEconomicaB:        `${_parte.propuestaEconomicaB}`,
                                planPagosB:                 `${_parte.planPagosB}`,
                                cumplimientoProponente:     `${_parte.cumplimientoProponente}`,
                                claridadOrganizacion:       `${_parte.claridadOrganizacion}`,
                                cumplimientoTecnico:        `${_parte.cumplimientoTecnico}`,
                                claridadProceso:            `${_parte.claridadProceso}`,
                                plazosEjecucion:            `${_parte.plazosEjecucion}`,
                                precioTotal:                `${_parte.precioTotal}`,
                                usoHerramienta:             `${_parte.usoHerramienta}`,
                                estado:                     `${_parte.estado}`,
                                empresa:                    `${_parte.empresa}`,
                                user:                       `${_parte.user}`
                            }
                        );
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Orden de cambio Creado', life: 3000 });
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
        fetchOrdens();
    },[])

    const fetchOrdens = () =>{
        getOrdens().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Orden de cambio insertados-----------");
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
            fecha:                      `${parte.fecha}`,
            caratulaA:                  `${parte.caratulaA}`,
            indiceA:                    `${parte.indiceA}`,
            cartaA:                     `${parte.cartaA}`,
            boletaA:                    `${parte.boletaA}`,
            conformacionA:              `${parte.conformacionA}`,
            solvenciaA:                 `${parte.solvenciaA}`,
            caratulaB:                  `${parte.caratulaB}`,
            indiceB:                    `${parte.indiceB}`,
            propuestaServicioB:         `${parte.propuestaServicioB}`,
            planificacionB:             `${parte.planificacionB}`,
            propuestaEconomicaB:        `${parte.propuestaEconomicaB}`,
            planPagosB:                 `${parte.planPagosB}`,
            cumplimientoProponente:     `${parte.cumplimientoProponente}`,
            claridadOrganizacion:       `${parte.claridadOrganizacion}`,
            cumplimientoTecnico:        `${parte.cumplimientoTecnico}`,
            claridadProceso:            `${parte.claridadProceso}`,
            plazosEjecucion:            `${parte.plazosEjecucion}`,
            precioTotal:                `${parte.precioTotal}`,
            usoHerramienta:             `${parte.usoHerramienta}`,
            estado:                     `${parte.estado}`,
            empresa:                    `${parte.empresa}`
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
        
        if (parte.caratulaA.trim()) {
            if (parte.id) {

                const index = findIndexById(parte.id);
                _partes[index] = _parte;

                updateOrdenID(
                    {
                        fecha:                      `${_parte.fecha}`,
                        caratulaA:                  `${_parte.caratulaA}`,
                        indiceA:                    `${_parte.indiceA}`,
                        cartaA:                     `${_parte.cartaA}`,
                        boletaA:                    `${_parte.boletaA}`,
                        conformacionA:              `${_parte.conformacionA}`,
                        solvenciaA:                 `${_parte.solvenciaA}`,
                        caratulaB:                  `${_parte.caratulaB}`,
                        indiceB:                    `${_parte.indiceB}`,
                        propuestaServicioB:         `${_parte.propuestaServicioB}`,
                        planificacionB:             `${_parte.planificacionB}`,
                        propuestaEconomicaB:        `${_parte.propuestaEconomicaB}`,
                        planPagosB:                 `${_parte.planPagosB}`,
                        cumplimientoProponente:     `${_parte.cumplimientoProponente}`,
                        claridadOrganizacion:       `${_parte.claridadOrganizacion}`,
                        cumplimientoTecnico:        `${_parte.cumplimientoTecnico}`,
                        claridadProceso:            `${_parte.claridadProceso}`,
                        plazosEjecucion:            `${_parte.plazosEjecucion}`,
                        precioTotal:                `${_parte.precioTotal}`,
                        usoHerramienta:             `${_parte.usoHerramienta}`,
                        estado:                     "Desactivado",
                        empresa:                    `${_parte.empresa}`,
                        user:                       `${_parte.user}`
                    }
                    ,parte.id);
                
                _parte['fecha']                     = _parte.fecha;
                _parte['caratulaA']                 = _parte.caratulaA;
                _parte['indiceA']                   = _parte.indiceA;
                _parte['cartaA']                    = _parte.cartaA;
                _parte['boletaA']                   = _parte.boletaA;
                _parte['conformacionA']             = _parte.conformacionA;
                _parte['solvenciaA']                = _parte.solvenciaA;
                _parte['caratulaB']                 = _parte.caratulaB;
                _parte['indiceB']                   = _parte.indiceB;
                _parte['propuestaServicioB']        = _parte.propuestaServicioB;
                _parte['planificacionB']            = _parte.planificacionB;
                _parte['propuestaEconomicaB']       = _parte.propuestaEconomicaB;
                _parte['planPagosB']                = _parte.planPagosB;
                _parte['cumplimientoProponente']    = _parte.cumplimientoProponente;
                _parte['claridadOrganizacion']      = _parte.claridadOrganizacion;
                _parte['cumplimientoTecnico']       = _parte.cumplimientoTecnico;
                _parte['claridadProceso']           = _parte.claridadProceso;
                _parte['plazosEjecucion']           = _parte.plazosEjecucion;
                _parte['precioTotal']               = _parte.precioTotal;
                _parte['usoHerramienta']            = _parte.usoHerramienta;
                _parte['estado']                    = "Desactivado";
                _parte['empresa']                   = _parte.empresa;
                _parte['user']                      = _parte.user;
                setParte({ ...parte });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Orden de cambio desactivado', life: 3000 });
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

    const fechaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Fecha</span>
                {rowData.fecha}
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
                <Button icon="pi pi-pencil"    style={{'background': '#13af4e'}} className="p-button-rounded p-button-success mr-2"   onClick={() => editParte(rowData)} />
                <Button icon="pi pi-trash"     style={{'background': '#eee500'}} className="p-button-rounded p-button-warning"        onClick={() => confirmDeleteParte(rowData)} />
            </div>
        );
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

    const generatePDF = (orden) => {

        let index = findIndexByIdEmpresa(orden.empresa);
        let _user = findIndexByIdUser(index.user);

        var doc = new jsPDF();
        doc.setFont("Arial Bold");
        doc.text(75, 20,'ORDEN DE CAMBIO');
        doc.setFontSize(17);
        doc.text(70, 30,'');
 
        doc.autoTable({ html: '#my-table' })

        doc.autoTable({
            head: [['', '']],
            body: [
                ['De: Corina Flores, consultora de TIS', `${orden.fecha}`],
                ['Para el representante de la GrupoEmpresa '+ `${index.nombre.toLocaleUpperCase()}`+ ' '+ `${index.tipoSociedad.toLocaleUpperCase()}`+','+'representada por su representante legal '+`${_user.nombre}`+' '+`${_user.apellido}`, ''],
            ],
            })

        doc.autoTable({
        head: [['PARTE A', '']],
        body: [
            ['Carátula'                         , `${orden.caratulaA}`],
            ['Indice'                           , `${orden.indiceA}`],
            ['Carta de presentación'            , `${orden.cartaA}`],
            ['Boleta de garantía'               , `${orden.boletaA}`],
            ['Conformación de la grupo-empresa' , `${orden.conformacionA}`],
            ['Solvencia técnica'                , `${orden.solvenciaA}`],
        ],
        })

        doc.autoTable({
            head: [['PARTE B', '']],
            body: [
                ['Carátula'             , `${orden.caratulaB}`],
                ['Indice'               , `${orden.indiceB}`],
                ['Propuesta de servicio', `${orden.propuestaServicioB}`],
                ['Planificacion'        , `${orden.planificacionB}`],
                ['Propuesta economica'  , `${orden.propuestaEconomicaB}`],
                ['Plan de pagos'        , `${orden.planPagosB}`],
            ],
            })

        doc.autoTable({
            head: [['', '']],
            body: [
                ['En consecuencia una vez revisadas las propuestas por su grupo-empresa,TIS resuelve:', ''],
            ],
            })
        
        doc.autoTable({
            head: [['CRITERIOS', 'PUNTAJE']],
            body: [
                ['Cumplimiento de especificaciones del proponente (15 puntos)'      , `${orden.cumplimientoProponente}`],
                ['Claridad en la organización de la empresa proponente (10 puntos)' , `${orden.claridadOrganizacion}`],
                ['Cumplimiento de especificaciones técnicas (30 puntos)'            , `${orden.cumplimientoTecnico}`],
                ['Claridad en el proceso de desarrollo (10 puntos)'                 , `${orden.claridadProceso}`],
                ['Plazo de ejecución (10 puntos)'                                   , `${orden.plazosEjecucion}`],
                ['Precio total (15 puntos)'                                         , `${orden.precioTotal}`],
                ['Uso de herramientas en el proceso de desarrollo (10 puntos)'      , `${orden.usoHerramienta}`],
                ['TOTAL PUNTAJE',  (parseInt(`${orden.cumplimientoProponente}`)+parseInt(`${orden.claridadOrganizacion}`)+parseInt(`${orden.cumplimientoTecnico}`)+parseInt(`${orden.claridadProceso}`)+parseInt(`${orden.plazosEjecucion}`)+parseInt(`${orden.precioTotal}`)+parseInt(`${orden.usoHerramienta}`))],
            ],
            })



        doc.save('OC_'+`${index.nombre.toLocaleUpperCase()}`+'.pdf')
    } 

    const pdfBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-file-pdf"  style={{'background': '#ed4651'}} className="p-button-rounded p-button-success mr-2"    onClick={() =>(generatePDF(rowData))}      />
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
            <h5 className="m-0">Gestion de Orden de Cambio</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
        )
    }

    const renderHeaderEditor = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    }

    const renderGroup = () => {
        return (
            <ColumnGroup>
                <Row>
                    <Column header={showHeader} colSpan={7}></Column>
                </Row>
                <Row>
                    <Column header="ID"               field="id"       sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="FECHA"            field="fecha"    sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="ESTADO"           field="estado"   sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="EMPRESA"          field="empresa"  sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="USUARIO"          field="user"     sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="Editar/Eliminar"                            style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="Generar PDF"                                style={{ 'background-color': '#13af4e', width:'20%'}}/>
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();



    const headerDialog =()=>{
        return (stateParte)?"Actualizando Orden de cambio":"Añadir Orden de cambio"
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
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} parte A" resizableColumns columnResizeMode="fit" showGridlines
                        globalFilter={globalFilter} emptyMessage="No se encontro los documentos de la Parte A" loading={loading} headerColumnGroup={headerGroup}
                        >
                    
                        <Column style={{width:'20%'}} field="id"                 header="ID"        sortable body={idBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="fecha"              header="FECHA"     sortable body={fechaBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="estado"             header="ESTADO"    sortable body={estadoBodyTemplate}></Column>
                        <Column style={{width:'20%'}} field="empresa"            header="EMPRESA"   sortable body={empresaBodyTemplate}></Column>                   
                        <Column style={{width:'20%'}} field="user"               header="USUARIO"   sortable body={userBodyTemplate}></Column>
                        <Column style={{width:'20%'}} body={actionBodyTemplate}></Column>
                        <Column header="Generar PDF"  body={pdfBodyTemplate}></Column>

                    </DataTable>


                    <Dialog visible={parteDialog} style={{ width: '750px' }} header={headerDialog} modal className="p-fluid" onHide={hideDialog}>
                        <form onSubmit={formik.handleSubmit}>

                            <div className="p-field mt-2">
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-calendar"></i>
                                        </span>
                                        <Calendar id="fecha" name="fecha" placeholder="Seleccione una fecha" value={formik.values.fecha} onChange={formik.handleChange} locale="es" dateFormat ="mm/dd/yy"  minDate={minDate} maxDate={maxDate} readOnlyInput/>
                                </div>       
                            </div>
                            {getFormErrorMessage('fecha')}
                            
                            <div className="p-field mt-2">
                                <div className="flex justify-content-center flex-wrap">
                                    <h5>PARTE A</h5>
                                </div>
                            </div>
                            <div className="p-field mt-2">
                                <h6>Caratula</h6>
                                <InputTextarea style={{ height: '100px' }} id="caratulaA" name='caratulaA' placeholder="Ingrese la correccion de la caratula" value={formik.values.caratulaA} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('caratulaA')}

                            <div className="p-field mt-2">
                                <h6>Indice</h6>
                                <InputTextarea style={{ height: '100px' }} id="indiceA" name='indiceA' placeholder="Ingrese la correccion de la indice" value={formik.values.indiceA} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('indiceA')}

                            <div className="p-field mt-2">
                                <h6>Carta</h6>
                                <InputTextarea style={{ height: '100px' }} id="cartaA" name='cartaA' placeholder="Ingrese la correccion del carta" value={formik.values.cartaA} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('cartaA')}

                            <div className="p-field mt-2">
                                <h6>Boleta de garantia</h6>
                                <InputTextarea style={{ height: '100px' }} id="boletaA" name='boletaA' placeholder="Ingrese la correccion de la boleta de garantia" value={formik.values.boletaA} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('boletaA')}

                            
                            <div className="p-field mt-2">
                                <h6>Conformacion del grupo empresa</h6>
                                <InputTextarea style={{ height: '100px' }} id="conformacionA" name='conformacionA' placeholder="Ingrese la correccion de la conformacion del grupo empresa" value={formik.values.conformacionA} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('conformacionA')}

                            <div className="p-field mt-2">
                                <h6>Solvencia tecnica</h6>
                                <InputTextarea style={{ height: '100px' }} id="solvenciaA" name='solvenciaA' placeholder="Ingrese la correccion de la solvencia tecnica" value={formik.values.solvenciaA} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('solvenciaA')}

                            <div className="p-field mt-2">
                                <div className="flex justify-content-center flex-wrap">
                                    <h5>PARTE B</h5>
                                </div>
                            </div>

                            <div className="p-field mt-2">
                                <h6>Caratula</h6>
                                <InputTextarea style={{ height: '100px' }} id="caratulaB" name='caratulaB' placeholder="Ingrese la correccion de la caratula" value={formik.values.caratulaB} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('caratulaB')}

                            <div className="p-field mt-2">
                                <h6>Indice</h6>
                                <InputTextarea style={{ height: '100px' }} id="indiceB" name='indiceB' placeholder="Ingrese la correccion del indice" value={formik.values.indiceB} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('indiceB')}

                            <div className="p-field mt-2">
                                <h6>Propuesta de servicio</h6>
                                <InputTextarea style={{ height: '100px' }} id="propuestaServicioB" name='propuestaServicioB' placeholder="Ingrese la correccion de la propuesta de servicio" value={formik.values.propuestaServicioB} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('propuestaServicioB')}

                            <div className="p-field mt-2">
                                <h6>Planificacion</h6>
                                <InputTextarea style={{ height: '100px' }} id="planificacionB" name='planificacionB' placeholder="Ingrese la correccion de la planificacion" value={formik.values.planificacionB} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('planificacionB')}

                            <div className="p-field mt-2">
                                <h6>Propuesta economica</h6>
                                <InputTextarea style={{ height: '100px' }} id="propuestaEconomicaB" name='propuestaEconomicaB' placeholder="Ingrese la correccion de la propuesta economica" value={formik.values.propuestaEconomicaB} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('propuestaEconomicaB')}

                            <div className="p-field mt-2">
                                <h6>Plan de pagos</h6>
                                <InputTextarea style={{ height: '100px' }} id="planPagosB" name='planPagosB' placeholder="Ingrese la correccion del plan de pagos" value={formik.values.planPagosB} onChange={formik.handleChange} autoResize/> 
                            </div>
                            {getFormErrorMessage('planPagosB')}

                            <div className="p-field mt-2">
                                <div className="flex justify-content-center flex-wrap">
                                    <h5>PUNTAJE</h5>
                                </div>
                            </div>

                            <div className="p-field mt-2">
                                <h6>Cumplimiento de especificaciones del proponente (15 puntos) </h6>
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-pencil"></i>
                                        </span>
                                        <Dropdown id="cumplimientoProponente" name="cumplimientoProponente" placeholder="Puntuacion para el cumplimiento de espeficicaciones" value={formik.values.cumplimientoProponente} onChange={formik.handleChange} options={puntuacion1} optionLabel="name"  optionValue="name"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('cumplimientoProponente')}

                            <div className="p-field mt-2">
                                <h6>Claridad en la organización de la empresa proponente (10 puntos)</h6>
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-pencil"></i>
                                        </span>
                                        <Dropdown id="claridadOrganizacion" name="claridadOrganizacion" placeholder="Puntuacion para la clarida de organizacion" value={formik.values.claridadOrganizacion} onChange={formik.handleChange} options={puntuacion2} optionLabel="name"  optionValue="name"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('claridadOrganizacion')}

                            <div className="p-field mt-2">
                                <h6>Cumplimiento de especificaciones técnicas (30 puntos)  </h6>
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-pencil"></i>
                                        </span>
                                        <Dropdown id="cumplimientoTecnico" name="cumplimientoTecnico" placeholder="Puntuacion para el cumplimiento de especificaciones tecnicas" value={formik.values.cumplimientoTecnico} onChange={formik.handleChange} options={puntuacion3} optionLabel="name"  optionValue="name"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('cumplimientoTecnico')}

                            <div className="p-field mt-2">
                                <h6>Claridad en el proceso de desarrollo (10 puntos) </h6>
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-pencil"></i>
                                        </span>
                                        <Dropdown id="claridadProceso" name="claridadProceso" placeholder="Puntuacion para la claridad de proceso de desarrollo" value={formik.values.claridadProceso} onChange={formik.handleChange} options={puntuacion4} optionLabel="name"  optionValue="name"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('claridadProceso')}

                            <div className="p-field mt-2">
                                <h6>Plazo de ejecución (10 puntos) </h6>
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-pencil"></i>
                                        </span>
                                        <Dropdown id="plazosEjecucion" name="plazosEjecucion" placeholder="Puntuacion para los plazos de ejecucion" value={formik.values.plazosEjecucion} onChange={formik.handleChange} options={puntuacion5} optionLabel="name"  optionValue="name"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('plazosEjecucion')}

                            <div className="p-field mt-2">
                                <h6>Precio total (15 puntos)</h6>
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-pencil"></i>
                                        </span>
                                        <Dropdown id="precioTotal" name="precioTotal" placeholder="Puntuacion para los precios totales" value={formik.values.precioTotal} onChange={formik.handleChange} options={puntuacion6} optionLabel="name"  optionValue="name"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('precioTotal')}

                            <div className="p-field mt-2">
                                <h6>Uso de herramientas en el proceso de desarrollo (10 puntos) </h6>
                                <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-pencil"></i>
                                        </span>
                                        <Dropdown id="usoHerramienta" name="usoHerramienta" placeholder="Puntuacion para el uso de herramientas" value={formik.values.usoHerramienta} onChange={formik.handleChange} options={puntuacion7} optionLabel="name"  optionValue="name"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('usoHerramienta')}


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
                                            <i className="pi pi-briefcase"></i>
                                        </span>
                                        <Dropdown id="empresa" name="empresa" placeholder="Seleccione una empresa" value={formik.values.empresa} onChange={formik.handleChange} options={empresas} optionLabel="nombre"  optionValue="id"/>
                                </div>       
                            </div>
                            {getFormErrorMessage('empresa')}


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
