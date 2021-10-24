import axios from 'axios';

 export const getRoles = () =>{
     return axios.get('https://magich-tech-backend.herokuapp.com/api/getRoles');
 }

 export const getRolID =(id) =>{
     return axios.get(`https://magich-tech-backend.herokuapp.com/api/getRolId/${id}`);
 }

 export const createRol=(data)=>{
    return axios.post('https://magich-tech-backend.herokuapp.com/api/createRol', 
      {
         id:  `${data.id}`,
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
    return axios.put(`https://magich-tech-backend.herokuapp.com/api/updateRol/${id}`, 
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
    return axios.delete(`https://magich-tech-backend.herokuapp.com/api/deleteRolId/${id}`);
}
