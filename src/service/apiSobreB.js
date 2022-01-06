import axios from 'axios';

 export const getEntregaBs = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getEntregaBs');
 }

 export const getEntregaBID =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getEntregaBId/${id}`);
 }



 export const createEntregaB=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createEntregaB', 
      {
         id:          `${data.id}`,
         link:        `${data.link}`,
         fechaInicio: `${data.fechaInicio}`,
         fechaCierre: `${data.fechaCierre}`,
         estado:      `${data.estado}`,
         user:        `${data.user}`
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

export const updateEntregaBID =(data,id) =>{
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updateEntregaB/${id}`, 
    {
        link:        `${data.link}`,
        fechaInicio: `${data.fechaInicio}`,
        fechaCierre: `${data.fechaCierre}`,
        estado:      `${data.estado}`,
        user:        `${data.user}`
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deleteEntregaBID =(id) =>{
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deleteEntregaBId/${id}`);
}

export const getEntregaBsActivas = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getEntregaBsActivas');
}
