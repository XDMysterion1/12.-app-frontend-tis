import React,{useEffect,useState}   from 'react';
import { InputText } from 'primereact/inputtext';
import gmail         from '../icon/gmail.png';
import password      from '../icon/password.png';
import phone         from '../icon/phone.png';
import address       from '../icon/addres.png';
import management    from '../icon/management.png';
import maleFale      from '../icon/maleFale.png';
import code          from '../icon/code.png';
import rolImg          from '../icon/rol.png';

import { Avatar }    from 'primereact/avatar';
import { Dropdown }  from 'primereact/dropdown';

export const RegisterUser = () => {
    const [sexo, setSexo]       = useState(null);
    const [gestion, setGestion] = useState(null);
    const [rol, setRol]         = useState(null);

    const option = [
        { name: 'Masculino', code: 'M' },
        { name: 'Femenino' , code: 'F' }
    ];
    const option1 = [
        { name: 'I-2020'  },
        { name: 'II-2020' },
        { name: 'I-2021'  },
        { name: 'II-2021' },
    ];
    const option2 = [
        { name: 'Administrador'  },
        { name: 'Docente' },
        { name: 'Desarrollador'  },
        { name: 'Control de Calidad' },
    ];

    const onSexoChange = (e) => {
        setSexo(e.value);
    }

    const onGestionChange = (e) => {
        setGestion(e.value);
    }
    const onRolChange = (e) => {
        setRol(e.value);
    }

    return (
        <div className="grid">

            <div className="col-12 md:col-6">
                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <h3>Registro de nuevo usuario</h3>
                </div>
                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Avatar image={code} style={{'height': '1.2em','width':'1.2em',}}/>
                            </span>
                            <InputText placeholder="codigoSIS" />
                        </div>
                    </div>
                </div>

                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Nombre" />
                        </div>
                    </div>
                </div>

                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Apellido" />
                        </div>
                    </div>
                </div>

                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Avatar image={gmail} style={{'height': '1.2em','width':'1.2em',}}/>
                            </span>
                            <InputText placeholder="Correo Electonico" />
                        </div>
                    </div>
                </div>

                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Avatar image={password} style={{'height': '1.2em','width':'1.2em',}}/>
                            </span>
                            <InputText placeholder="Contraseña" />
                        </div>
                    </div>
                </div>   

                
                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Avatar image={address} style={{'height': '1.2em','width':'1.2em',}}/>
                            </span>
                            <InputText placeholder="Direccion" />
                        </div>
                    </div>
                </div>  

                
                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Avatar image={phone} style={{'height': '1.2em','width':'1.2em',}}/>
                            </span>
                            <InputText placeholder="Telefono" />
                        </div>
                    </div>
                </div>

                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Avatar image={management} style={{'height': '1.2em','width':'1.2em',}}/> 
                            </span>
                            <Dropdown value={gestion} options={option1} onChange={onGestionChange} optionLabel="name" placeholder="Gestion" />
                        </div>
                    </div>
                </div>

                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                        
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Avatar image={maleFale} style={{'height': '1.2em','width':'1.2em',}}/>   
                            </span>
                            <Dropdown value={sexo} options={option} onChange={onSexoChange} optionLabel="name" placeholder="Sexo" />
                        </div>
                    </div>
                </div>
                <div className="p-grid p-fluid p-fluid p-d-flex p-jc-center mb-3">
                    <div className="p-col-12 p-md-4">
                        
                         <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Avatar image={rolImg} style={{'height': '1.2em','width':'1.2em',}}/>   
                            </span>
                            <Dropdown value={rol} options={option2} onChange={onRolChange} optionLabel="name" placeholder="Rol" />
                        </div>
                    </div>
                </div>
                {
                    console.log(gestion)
                }         
            </div>
            
        </div>
        
    )
}
