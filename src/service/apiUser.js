import axios from 'axios';

 export const getUsers = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getUsers');
 }

 export const getUserID =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getUserId/${id}`);
 }



 export const createUser=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createUser', 
      {
         id:        `${data.id}`,
         nombre:    `${data.nombre}`,
         apellido:  `${data.apellido}`,
         email:     `${data.email}`,
         password:  `${data.password}`,
         estado:    `${data.estado}`,
         rol:       `${data.rol}`      
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
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updateUser/${id}`, 
    {
      nombre:    `${data.nombre}`,
      apellido:  `${data.apellido}`,
      email:     `${data.email}`,
      password:  `${data.password}`,
      estado:    `${data.estado}`,
      rol:       `${data.rol}`      
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
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deleteUserId/${id}`);
}

export async function login(data){

  return await axios.post('http://magictsec.tis.cs.umss.edu.bo/api/login', 
  {
     email:     `${data.email}`,
     password:  `${data.password}`
  }).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const getUsersActivas = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getUsersActivas');
}
