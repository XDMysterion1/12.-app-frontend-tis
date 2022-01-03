import axios from 'axios';

 export const getRoles = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getRoles');
 }

 export const getRolID =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getRolId/${id}`);
 }

 export const createRol=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createRol', 
      {
         id:     `${data.id}`,
         rol:    `${data.rol}`,
         estado: `${data.estado}`
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

export const updateRolID =(data,id) =>{
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updateRol/${id}`, 
    {
       rol: `${data.rol}`,
       estado: `${data.estado}`
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deleteRolID =(id) =>{
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deleteRolId/${id}`);
}

export const getRolesActivas = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getRolesActivas');
}
