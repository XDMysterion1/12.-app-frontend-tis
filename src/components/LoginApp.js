import React,{useEffect,useState}   from 'react';
import avatar          from '../icon/avatar.png';
import gmail                from '../icon/gmail.png';
import password             from '../icon/password.png';

import { Avatar }           from 'primereact/avatar';
import { InputText }        from 'primereact/inputtext';
import { Password }         from 'primereact/password';
import { Button }           from 'primereact/button';

import { useFormik }        from "formik";
import * as Yup             from 'yup';

export const LoginApp = () =>{

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Se requiero el correo electronico")
        .email("Correo electronico no valido")
        .max(255, "Como maximo 30 caracteres"),
        password: Yup.string().required("Se requiero el contraseña")
        .min(6, "Como minimo 6 caracteres")
        .max(255, "Como maximo 30 caracteres")
      });

      const formik = useFormik({
        initialValues: {
            email:     "",
            password:  ""
        },
        validationSchema,
        onSubmit: (data) => {

            formik.resetForm();    
        },
      });

    return(
        <div className="grid justify-content-evenly">
            <div className="col-12 lg:col-3"></div>
            <div className="col-12 lg:col-4">
                <div className="card p-fluid">
                    <form onSubmit={formik.handleSubmit}>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  m-2">
                                <h2 className="p-text-center p-p-1">Iniciar sesión</h2>        
                            </div>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  m-2">
                                <Avatar image={avatar} className="p-avatar-xl"  shape="circle"  size="xlarge" style={{'height': '4em','width':'4em',}}/>               
                            </div>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  m-2">
                                <div className="p-field mt-2 lg:col-12">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <Avatar image={gmail} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <InputText id="email" name='email' placeholder="Correo electronico" value={formik.values.email} onChange={formik.handleChange} autoFocus/>
                                    </div>       
                                </div>
                            </div>
                            <small className="p-invalid" style={{'color': '#ff0000'}}>{formik.errors.email ? formik.errors.email : null}</small>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  m-2">
                                <div className="p-field mt-2 lg:col-11">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <Avatar image={password} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <Password id="password" name='password' placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                    </div>       
                                </div>
                            </div>
                            <small className="p-invalid" style={{'color': '#ff0000'}}>{formik.errors.password ? formik.errors.password : null}</small>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  m-2">
                                <Button type="submit" id="buttonSubmit" icon="pi pi-arrow-right"  className="p-button-raised mt-4 p-button-lg"  style={{'fontSize': '1.5em', 'background-color':'#d13639', 'color':'#ffffff', 'border':'1px solid hsl(0deg 0% 100% / 12%)'}}/>
                            </div>
                        </div>          
                    </form>
                </div>
            </div>
            <div className="col-12 lg:col-3"></div>
        
        </div>
    )
}

