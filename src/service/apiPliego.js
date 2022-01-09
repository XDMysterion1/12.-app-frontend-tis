import axios from 'axios';

 export const getPliegos = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getPliegos');
 }

 export const getPliegoID =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getPliegoId/${id}`);
 }



 export const createPliego=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createPliego', 
      {
        id:        `${data.id}`,
        titulo:    `${data.titulo}`,
        codigo:    `${data.codigo}`,
        semestre:  `${data.semestre}`,
        link:      `${data.link}`,
        publicado: `${data.publicado}`,
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
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updatePliego/${id}`, 
    {
        titulo:    `${data.titulo}`,
        codigo:    `${data.codigo}`,
        semestre:  `${data.semestre}`,
        link:      `${data.link}`,
        publicado: `${data.publicado}`,
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
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deletePliegoId/${id}`);
}

export const getPliegosPublicados = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getPliegosPublicados');
}
