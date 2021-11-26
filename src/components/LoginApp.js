import React,{useEffect,useState,useRef}   from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import { InputText }        from 'primereact/inputtext';
import { Password }         from 'primereact/password';
import { Button }           from 'primereact/button';
import { ProgressSpinner }  from 'primereact/progressspinner';
import { Toast }            from 'primereact/toast';

import { useFormik }        from "formik";
import { useHistory }       from 'react-router-dom';

export const LoginApp = (props) =>{

    const history            = useHistory();
    const [isPush,setIsPush] = useState(true);
    const toast              = useRef(null);

    const formik = useFormik({
        initialValues: {
            email:     "",
            password:  ""
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = "Se requiere el correo electronico";
            } else if (data.email.length > 255) {
                errors.email = "Como maximo 255 caracteres";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Dirección de correo electrónico inválida. P.ej. ejemplo@email.com';
            }

            if (!data.password) {
                errors.password = "Se requiere la contraseña";
            } else if (data.password.length > 255) {
                errors.password = "Como maximo 255 caracteres";
            }

            return errors;
        },

        onSubmit: (data) => {
            setIsPush(false);
            const timeout = setTimeout(() => {}, 10000);
            axios.post('https://magic-tech-backend.herokuapp.com/api/login', 
            {
                email:     `${data.email}`,
                password:  `${data.password}`
            }).then(function (response) {
                console.log(response.data.id);
                console.log(response.data.nombre);
                console.log(response.data.apellido);
                console.log(response.data.email);
                console.log(response.data.rol);
                if(response.status === 200){
                    clearTimeout(timeout);
                    history.push('/');
                }
                formik.resetForm();
                setIsPush(true);
            })
            .catch(function (error) {
                toast.current.show({severity:'error', summary: 'Error Message', detail:'El correo electronico o la contraseña son incorrecas', life: 3000});
                clearTimeout(timeout);
                setIsPush(true);
                formik.setValues({
                    email:`${data.email}`,
                    password:''
                }); 
            });
        },
      });





    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="ml-5 p-error" style={{'color': '#ff0000'}}>{formik.errors[name]}</small>;
    };

    return(
        <div className="grid justify-content-evenly mt-6">
            <Toast ref={toast} />
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
                                            <Password id="password" name='password' placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} toggleMask  feedback={false}/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        {getFormErrorMessage('password')}
                        {
                            (isPush)?
                            <div className='grid flex justify-content-center'>
                                <div className="flex align-items-center justify-content-center  m-2">
                                    <Button type="submit" id="buttonSubmit" icon="pi pi-arrow-right"  className="p-button-raised mt-4 p-button-lg"  style={{'fontSize': '1.5em', 'background-color':'#d13639', 'color':'#ffffff', 'border':'1px solid hsl(0deg 0% 100% / 12%)'}}/>
                                </div>
                            </div>
                            :
                            <div className='grid flex justify-content-center'>
                                <div className="flex align-items-center justify-content-center  m-4">
                                    <ProgressSpinner style={{width: '50px', height: '50px', stroke: '#d62d20'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration="10s"/>
                                </div>
                            </div>  
                        }
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  mt-3">
                                <Link to="/Register" >
                                    <Button label="Crear una cuenta" className="p-button-link" style={props.layoutColorMode === 'light' ? {'color':'#000000', 'font-weight': 'bold'} : {'color':'#ffffff', 'font-weight': 'bold'}}/>
                                </Link>
                            </div>
                        </div>
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center">
                                <Link to="/" >
                                    <Button label="Pagina principal" className="p-button-link" style={props.layoutColorMode === 'light' ? {'color':'#000000', 'font-weight': 'bold'} : {'color':'#ffffff', 'font-weight': 'bold'}}/>
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

