import axios from 'axios';

 export const getUsers = () =>{
     return axios.get('https://magich-tech-backend.herokuapp.com/api/getUsers');
 }

 export const getUserID =(id) =>{
     return axios.get(`https://magich-tech-backend.herokuapp.com/api/getUserId/${id}`);
 }



 export const createUser=(data)=>{
    return axios.post('https://magich-tech-backend.herokuapp.com/api/createUser', 
      {
         id:        `${data.id}`,
         nombre:    `${data.nombre}`,
         apellido:  `${data.apellido}`,
         email:     `${data.email}`,
         password:  `${data.password}`,
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
    return axios.put(`https://magich-tech-backend.herokuapp.com/api/updateUser/${id}`, 
    {
      nombre:    `${data.nombre}`,
      apellido:  `${data.apellido}`,
      email:     `${data.email}`,
      password:  `${data.password}`,
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
    return axios.delete(`https://magich-tech-backend.herokuapp.com/api/deleteUserId/${id}`);
}
