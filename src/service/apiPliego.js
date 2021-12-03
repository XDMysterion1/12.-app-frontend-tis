import axios from 'axios';

 export const getPliegos = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getPliegos');
 }

 export const getPliegoID =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getPliegoId/${id}`);
 }



 export const createPliego=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createPliego', 
      {
        id:        `${data.id}`,
        titulo:    `${data.titulo}`,
        codigo:    `${data.codigo}`,
        semestre:  `${data.semestre}`,
        link:      `${data.link}`,
        estado:    `${data.estado}`,
        user:      `${data.user}` 
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

export const updatePliegoID =(data,id) =>{
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updatePliego/${id}`, 
    {
        titulo:    `${data.titulo}`,
        codigo:    `${data.codigo}`,
        semestre:  `${data.semestre}`,
        link:      `${data.link}`,
        estado:    `${data.estado}`,
        user:      `${data.user}` 
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deletePliegoID =(id) =>{
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deletePliegoId/${id}`);
}

export const getPliegosPublicados = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getPliegosPublicados');
}
