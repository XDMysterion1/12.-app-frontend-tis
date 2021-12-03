import axios from 'axios';

 export const getConvocatorias = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getConvocatorias');
 }

 export const getConvocatoriaID =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getConvocatoriaId/${id}`);
 }



 export const createConvocatoria=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createConvocatoria', 
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

export const updateConvocatoriaID =(data,id) =>{
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updateConvocatoria/${id}`, 
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

export const deleteConvocatoriaID =(id) =>{
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deleteConvocatoriaId/${id}`);
}

export const getConvocatoriasPublicados = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getConvocatoriasPublicados');
}
