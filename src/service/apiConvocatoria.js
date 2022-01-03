import axios from 'axios';

 export const getConvocatorias = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getConvocatorias');
 }

 export const getConvocatoriaID =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getConvocatoriaId/${id}`);
 }



 export const createConvocatoria=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createConvocatoria', 
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

export const updateConvocatoriaID =(data,id) =>{
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updateConvocatoria/${id}`, 
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

export const deleteConvocatoriaID =(id) =>{
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deleteConvocatoriaId/${id}`);
}

export const getConvocatoriasPublicados = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getConvocatoriasPublicados');
}
