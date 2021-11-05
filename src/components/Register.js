import React,{useEffect,useState,useRef}   from 'react';
import avatar          from '../icon/avatar.png';
import gmail                from '../icon/gmail.png';
import password             from '../icon/password.png';

import { Avatar }           from 'primereact/avatar';
import { InputText }        from 'primereact/inputtext';
import { Password }         from 'primereact/password';
import { Button }           from 'primereact/button';
import { Toast }            from 'primereact/toast';

import { useFormik }        from "formik";
import * as Yup             from 'yup';
import uniqid               from 'uniqid';

import { createUser,getUsers} from '../service/apiUser';

export const Register = () =>{

    const toast                           = useRef(null);

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Se requiero el nombre")
        .matches(/^^[a-zA-Z\s]+$/, "No se permiten numero o caracteres especiales")
        .min(2, "Como minimo 2 caracteres")
        .max(30, "Como maximo 30 caracteres"),
        apellido: Yup.string().required("Se requiero el apellido")
        .matches(/^^[a-zA-Z\s]+$/, "No se permiten numero o caracteres especiales")
        .min(2, "Como minimo 2 caracteres")
        .max(30, "Como maximo 30 caracteres"),
        email: Yup.string().required("Se requiero el correo electronico")
        .email("Correo electronico no valido")
        .max(255, "Como maximo 30 caracteres")
        .test('isEmail','Ya existe el correo electronico',
        function (value) {
               var _users = [...users]
               let res = _users.find(i => (i.email).toLowerCase() === (value).toLowerCase() );
                if(res === undefined){
                    return true;
                }else{
                    return false;
                }
                 
           }
           
       ),
        password: Yup.string().required("Se requiero el contraseña")
        .min(6, "Como minimo 6 caracteres")
        .max(255, "Como maximo 30 caracteres"),
        confirmPassword:Yup.string().required("Se requiero confirmar la contraseña")
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")

      });

      const formik = useFormik({
        initialValues: {
            nombre:    "",
            apellido:  "",
            email:     "",
            password:  "",
            confirmPassword : ""
        },
        validationSchema,
        onSubmit: (data) => {
            let idUser = uniqid("user-");
            let rolUser= "rol-kvjva7f6"; 
            createUser({id:`${idUser}`,nombre:`${data.nombre}`,apellido:`${data.apellido}`,email:`${data.email}`,password:`${data.password}`,rol:`${rolUser}`});
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Registrado Exitosamente', life: 3000 });
            formik.resetForm();    
        },
      });
    const [users, setUsers]  = useState(null);


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
        <div className="grid justify-content-evenly">
            <Toast ref={toast} />
            <div className="lg:col-3"></div>
            <div className=" lg:col-3 md:col-3">
                <div className="card p-fluid">
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
                        <small className="p-invalid ml-3" style={{'color': '#ff0000'}}>{formik.errors.nombre ? formik.errors.nombre : null}</small>
                        
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
                        <small className="p-invalid ml-3" style={{'color': '#ff0000'}}>{formik.errors.apellido ? formik.errors.apellido : null}</small>
                        
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-1 lg:col-12">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <Avatar image={gmail} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <InputText id="email" name='email' placeholder="Correo electronico" value={formik.values.email} onChange={formik.handleChange}/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        <small className="p-invalid ml-3" style={{'color': '#ff0000'}}>{formik.errors.email ? formik.errors.email : null}</small>

                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-1 lg:col-11">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <Avatar image={password} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <Password id="password" name='password' placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        <small className="p-invalid ml-3" style={{'color': '#ff0000'}}>{formik.errors.password ? formik.errors.password : null}</small>

                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-1 lg:col-11">
                                    <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <Avatar image={password} style={{'height': '1.2em','width':'1.2em',}}/>   
                                            </span>
                                            <Password id="confirmPassword" name='confirmPassword' placeholder="Repite la contraseña" value={formik.values.confirmPassword} onChange={formik.handleChange} toggleMask  promptLabel="Por favor ingrese una contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"/>
                                    </div>       
                                </div>
                            </div>
                        </div>
                        <small className="p-invalid ml-3" style={{'color': '#ff0000'}}>{formik.errors.confirmPassword ? formik.errors.confirmPassword : null}</small>
                       
                        <div className='grid flex justify-content-center'>
                            <div className="flex align-items-center justify-content-center  ">
                                <div className="p-field mt-3 lg:col-11">
                                    <Button label="Registrar"  icon="pi pi-check" type="submit" className="p-button-text"  style={{'background': '#13af4e','color':'#ffffff'}}/>  
                                </div>
                            </div>
                        </div>      
                    </form>
                </div>
            </div>
            <div className="lg:col-3"></div>
        
        </div>
    )
}

