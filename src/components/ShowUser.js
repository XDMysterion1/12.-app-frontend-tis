import React,{useEffect,useState}   from 'react';
import { InputText } from 'primereact/inputtext';
import gmail         from '../icon/gmail.png';
import password      from '../icon/password.png';
import phone         from '../icon/phone.png';
import address       from '../icon/addres.png';
import management    from '../icon/management.png';
import maleFale      from '../icon/maleFale.png';
import code          from '../icon/code.png';

import { Avatar }    from 'primereact/avatar';
import { Dropdown }  from 'primereact/dropdown';
import { getUsers ,createUser} from '../service/apiUser';


export const ShowUser = () => {

    const [usuarios,setUsuarios]     = useState([]);


    useEffect(()=>{
        fetchUsuarios();

    },[])

    const fetchUsuarios = () =>{
        getUsers().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("usuarios insertados");
                setUsuarios(json.data);
                console.log("---------------------");
                const valor = {
                    codigoSIS: '202105412',
                    nombre: 'Aasriel',
                    apellido: 'asdParicagua',
                    email: 'aasdriel.p@gmail.com',
                    password: '123456',
                    direccion: 'asdQuillacollo',
                    telefono: '75458458',
                    gestion: 'I-2021',
                    sexo: 'Masculino',
                    rol: 2
                };

                createUser(valor);
                console.log("post");
            }
        })
    }

    return (
        <div className="grid">
            <h1>Estamos trabajando - Mostrar Usuarios</h1>
            {
                console.log(usuarios)
            }
        </div>
        
    )
}
