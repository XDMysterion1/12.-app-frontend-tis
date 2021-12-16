import axios from 'axios';

 export const getEntregaAs = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getEntregaAs');
 }

 export const getEntregaAID =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getEntregaAId/${id}`);
 }



 export const createEntregaA=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createEntregaA', 
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
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updateEntregaA/${id}`, 
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
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deleteEntregaAId/${id}`);
}

export const getEntregaAsActivas = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getEntregaAsActivas');
}
