import axios from 'axios';

 export const getEntregaAs = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getEntregaAs');
 }

 export const getEntregaAID =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getEntregaAId/${id}`);
 }



 export const createEntregaA=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createEntregaA', 
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

export const updateEntregaAID =(data,id) =>{
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updateEntregaA/${id}`, 
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

export const deleteEntregaAID =(id) =>{
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deleteEntregaAId/${id}`);
}

export const getEntregaAsActivas = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getEntregaAsActivas');
}
