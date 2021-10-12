import axios from 'axios';

 export const getRoles = () =>{
     return axios.get('http://127.0.0.1:8000/api/getRoles');
 }

 export const getRolID =(id) =>{
     return axios.get(`http://127.0.0.1:8000/api/getRolId/${id}`);
 }

 export const createRol=(data)=>{
    return axios.post('http://127.0.0.1:8000/api/createRol', 
      {
         rol: `${data.rol}`,
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
    return axios.post(`http://127.0.0.1:8000/api/updateRol/${id}`, 
    {
       rol: `${data.rol}`
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
    return axios.delete(`http://127.0.0.1:8000/api/deleteRolId/${id}`);
}
