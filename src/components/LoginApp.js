import React,{useEffect,useState}   from 'react';
import avatar               from '../icon/avatar.png';
import avatarDark           from '../icon/avatar-dark.png';
import gmail                from '../icon/gmail.png';
import password             from '../icon/password.png';
import gmailDark            from '../icon/gmail-dark.png';
import passwordDark         from '../icon/password-dark.png';

import { Avatar }           from 'primereact/avatar';
import { InputText }        from 'primereact/inputtext';
import { Password }         from 'primereact/password';
import { Button }           from 'primereact/button';

import { useFormik }        from "formik";
import * as Yup             from 'yup';

export const LoginApp = (props) =>{

      const formik = useFormik({
        initialValues: {
            email:     "",
            password:  ""
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = "Se requiero el correo electronico";
            } else if (data.email.length > 255) {
                errors.email = "Como maximo 255 caracteres";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Dirección de correo electrónico inválida. P.ej. ejemplo@email.com';
            }

            if (!data.password) {
                errors.password = "Se requiero el contraseña";
            } else if (data.password.length < 6) {
                errors.password = "Como minimo 6 caracteres";
            } else if (data.password.length > 255) {
                errors.password = "Como maximo 255 caracteres";
            }

            return errors;
        },
        onSubmit: (data) => {
            console.log(data);
            formik.resetForm();    
        },
      });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="ml-3 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };

    return(
        <div className="grid justify-content-evenly">
            <div className="lg:col-3"></div>
            <div className=" lg:col-3 md:col-3">
                <div className="card p-fluid" style={props.layoutColorMode === 'light' ?{ 'border': 'black 2px outset' }:{ 'border': 'white 2px outset' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  m-2">
                                <h2 className="p-text-center p-p-1">Iniciar sesión</h2>        
                            </div>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  m-2">
                                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/avatar.png' : 'assets/layout/images/avatar-dark.png'} className="p-avatar-xl"  shape="circle"  size="xlarge" style={{'height': '8em','width':'8em',}}/>               
                            </div>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center">
                                <div className="p-field mt-1 lg:col-11">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/gmail.png' : 'assets/layout/images/gmail-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <InputText id="email" name='email' placeholder="Correo electronico" value={formik.values.email} onChange={formik.handleChange} autoFocus/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        {getFormErrorMessage('email')}
                        
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center">
                                <div className="p-field mt-1 lg:col-10">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <img   src={props.layoutColorMode === 'light' ? 'assets/layout/images/password.png' : 'assets/layout/images/password-dark.png'} style={{'height': '1.2em','width':'1.2em',}}/>      
                                            </span>
                                            <Password id="password" name='password' placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        {getFormErrorMessage('password')}
                        
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  m-2">
                                <Button type="submit" id="buttonSubmit" icon="pi pi-arrow-right"  className="p-button-raised mt-4 p-button-lg"  style={{'fontSize': '1.5em', 'background-color':'#d13639', 'color':'#ffffff', 'border':'1px solid hsl(0deg 0% 100% / 12%)'}}/>
                            </div>
                        </div>          
                    </form>
                </div>
            </div>
            <div className="lg:col-3"></div>
        
        </div>
    )
}

