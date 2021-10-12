import axios from 'axios';

 export const getUsers = () =>{
     return axios.get('http://127.0.0.1:8000/api/getUsers');
 }

 export const getUserID =(id) =>{
     return axios.get(`http://127.0.0.1:8000/api/getUserId/${id}`);
 }



 export const createUser=(data)=>{
    return axios.post('http://127.0.0.1:8000/api/createUser', 
      {
         codigoSIS: `${data.codigoSIS}`,
         nombre:    `${data.nombre}`,
         apellido:  `${data.apellido}`,
         email:     `${data.email}`,
         password:  `${data.password}`,
         direccion: `${data.direccion}`,
         telefono:  `${data.telefono}`,
         gestion:   `${data.gestion}`,
         sexo:      `${data.sexo}`,
         rol:       `${data.rol}`      //rol es un numero entero
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

export const updateUserID =(data,id) =>{
    return axios.post(`http://127.0.0.1:8000/api/updateUser/${id}`, 
    {
        codigoSIS: `${data.codigoSIS}`,
        nombre:    `${data.nombre}`,
        apellido:  `${data.apellido}`,
        email:     `${data.email}`,
        password:  `${data.password}`,
        direccion: `${data.direccion}`,
        telefono:  `${data.telefono}`,
        gestion:   `${data.gestion}`,
        sexo:      `${data.sexo}`,
        rol:       `${data.rol}`      //rol es un numero entero
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deleteUserID =(id) =>{
    return axios.delete(`http://127.0.0.1:8000/api/deleteUserId/${id}`);
}
