import React,{useEffect,useState,useRef}   from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import { InputText }        from 'primereact/inputtext';
import { Password }         from 'primereact/password';
import { Button }           from 'primereact/button';
import { Toast }            from 'primereact/toast';
import { ProgressSpinner }  from 'primereact/progressspinner';
import { useHistory }       from 'react-router-dom';

import { useFormik }        from "formik";
import uniqid               from 'uniqid';
import Cookies              from 'universal-cookie';

import { createUser,getUsers} from '../service/apiUser';

export const Register = (props) =>{

    const toast                           = useRef(null);
    const [users, setUsers]               = useState(null);
    const history                         = useHistory();
    const [emailUpdate, setEmailUpdate]   = useState("");
    const [isPush,setIsPush]              = useState(true);
    const cookies                         = new Cookies();

    const formik = useFormik({
        initialValues: {
            nombre:    "",
            apellido:  "",
            email:     "",
            password:  "",
            confirmPassword : ""
        },
        validate: (data) => {
            let errors = {};

            if (!data.nombre) {
                errors.nombre = "Se requiere el nombre";
            } else if (data.nombre.length < 2) {
                errors.nombre = "Como minimo 2 caracteres";
            } else if (data.nombre.length > 30) {
                errors.nombre = "Como maximo 30 caracteres";
            } else if (!/^^[a-zA-Z\s]+$/i.test(data.nombre)) {
                errors.nombre = "No se permiten numero o caracteres especiales";
            }

            if (!data.apellido) {
                errors.apellido = "Se requiere el apellido";
            } else if (data.apellido.length < 2) {
                errors.apellido = "Como minimo 2 caracteres";
            } else if (data.apellido.length > 30) {
                errors.apellido = "Como maximo 30 caracteres";
            }else if (!/^^[a-zA-Z\s]+$/i.test(data.apellido)) {
                errors.apellido = "No se permiten numero o caracteres especiales";
            }

            if (!data.email) {
                errors.email = "Se requiere el correo electronico";
            } else if (data.email.length > 255) {
                errors.email = "Como maximo 255 caracteres";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Dirección de correo electrónico inválida. P.ej. ejemplo@email.com';
            }else if(!esRepetido(data.email)){
                errors.email = "Ya existe el correo electronico";
            }

            if (!data.password) {
                errors.password = "Se requiere la contraseña";
            } else if (data.password.length < 6) {
                errors.password = "Como minimo 6 caracteres";
            } else if (data.password.length > 255) {
                errors.password = "Como maximo 255 caracteres";
            }

            if (!data.confirmPassword) {
                errors.confirmPassword = "Se requiere la confirmacion de la contraseña";
            }else if (data.confirmPassword != data.password) {
                errors.confirmPassword = "Las contraseñas deben coincidir";
            } 

            return errors;
        },

        onSubmit: (data) => {
            let idUser = uniqid("user-");
            let rolUser= "rol-kvjva7f6";
            setIsPush(false); 
            const timeout = setTimeout(() => {}, 10000);

            axios.post('https://magic-tech-backend.herokuapp.com/api/createUser', 
            {
                id:         `${idUser}`,
                nombre:     `${data.nombre}`,
                apellido:   `${data.apellido}`,
                email:      `${data.email}`,
                password:   `${data.password}`,
                rol:        `${rolUser}` 
            }
            )
            .then(function (response) {
                if(response.status === 200){
                    clearTimeout(timeout);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Registrado Exitosamente', life: 3000 });
                    
                }
                formik.resetForm();
                setIsPush(true);
            })
            .catch(function (error) {
                clearTimeout(timeout);
                setIsPush(true);
                formik.resetForm();
            });

        },
      });


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="ml-2 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };


    const esRepetido =(value)=>{
        var _users = [...users];
        let res = _users.find(i => (i.email).toLowerCase() === (value).toLowerCase() );
         if(res === undefined){
             return true;
         }else{
             return false;
         }
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

    return(
        <div className="grid justify-content-evenly mt-6">
            <Toast ref={toast} />
            <div className="lg:col-3"></div>
            <div className=" lg:col-3 md:col-3">
                <div className="card p-fluid" style={cookies.get('theme') === 'light' ?{ 'border': 'black 2px outset' }:{ 'border': 'white 2px outset' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <h2 className="p-text-center p-p-1">Registrarse</h2>        
                            </div>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-2 lg:col-12">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-user"></i>
                                            </span>
                                            <InputText id="nombre" name='nombre' placeholder="Nombre" value={formik.values.nombre} onChange={formik.handleChange} autoFocus/>
                                    </div>       
                                </div>
                            </div>   
                        </div>
                        {getFormErrorMessage('nombre')}
                        
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-1 lg:col-12">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-user"></i>
                                            </span>
                                            <InputText id="apellido" name='apellido' placeholder="Apellido" value={formik.values.apellido} onChange={formik.handleChange}/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        {getFormErrorMessage('apellido')}
                        
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-1 lg:col-12">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <img   src={cookies.get('theme') === 'light' ? 'assets/layout/images/gmail.png' : 'assets/layout/images/gmail-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <InputText id="email" name='email' placeholder="Correo electronico" value={formik.values.email} onChange={formik.handleChange}/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        {getFormErrorMessage('email')}

                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-1 lg:col-11">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <img   src={cookies.get('theme') === 'light' ? 'assets/layout/images/password.png' : 'assets/layout/images/password-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <Password id="password" name='password' placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        {getFormErrorMessage('password')}

                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-1 lg:col-11">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <img   src={cookies.get('theme') === 'light' ? 'assets/layout/images/password.png' : 'assets/layout/images/password-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <Password id="confirmPassword" name='confirmPassword' placeholder="Repite la contraseña" value={formik.values.confirmPassword} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        {getFormErrorMessage('confirmPassword')}

                        {
                            (isPush)?
                            <div className='grid flex justify-content-center'>
                                <div className="flex align-items-center justify-content-center  ">
                                    <div className="p-field mt-3 lg:col-11">
                                        <Button label="Registrar"  icon="pi pi-check" type="submit" className="p-button-text"  style={{'background': '#13af4e','color':'#ffffff'}}/>  
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='grid flex justify-content-center'>
                                <div className="flex align-items-center justify-content-center  m-4">
                                    <ProgressSpinner style={{width: '50px', height: '50px', stroke: '#d62d20'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration="10s"/>
                                </div>
                            </div>  
                        }

                        <div className='grid flex justify-content-center mt-3'>
                            <div className="flex align-items-center justify-content-center">
                                <Link to="/Login" >
                                    <Button label="Iniciar sesion" className="p-button-link" style={cookies.get('theme') === 'light' ? {'color':'#000000', 'font-weight': 'bold'} : {'color':'#ffffff', 'font-weight': 'bold'}}/>
                                </Link>
                            </div>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center">
                                <Link to="/" >
                                    <Button label="Pagina principal" className="p-button-link" style={cookies.get('theme') === 'light' ? {'color':'#000000', 'font-weight': 'bold'} : {'color':'#ffffff', 'font-weight': 'bold'}}/>
                                </Link>
                            </div>
                        </div>        
                    </form>
                </div>
            </div>
            <div className="lg:col-3"></div>
        
        </div>
    )
}

