import axios from 'axios';

 export const getContratos = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getContratos');
 }

 export const getContratoId =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getContratoId/${id}`);
 }



 export const createContrato=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createContrato', 
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
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updateContrato/${id}`, 
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
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deleteContratoId/${id}`);
}

export const getContratosActivas = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getContratosActivas');
}
