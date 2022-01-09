import axios from 'axios';

 export const getContratos = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getContratos');
 }

 export const getContratoId =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getContratoId/${id}`);
 }



 export const createContrato=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createContrato', 
      {
         id:                 `${data.id}`,
         fecha:              `${data.fecha}`,
         codigoConvocatoria: `${data.codigoConvocatoria}`,
         codigoPliego:       `${data.codigoPliego}`,
         estado:             `${data.estado}`,
         empresa:            `${data.empresa}`,
         user:               `${data.user}`
       
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

export const updateContratoID =(data,id) =>{
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updateContrato/${id}`, 
    {
        fecha:              `${data.fecha}`,
        codigoConvocatoria: `${data.codigoConvocatoria}`,
        codigoPliego:       `${data.codigoPliego}`,
        estado:             `${data.estado}`,
        empresa:            `${data.empresa}`,
        user:               `${data.user}`
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deleteContratoID =(id) =>{
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deleteContratoId/${id}`);
}

export const getContratosActivas = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getContratosActivas');
}
