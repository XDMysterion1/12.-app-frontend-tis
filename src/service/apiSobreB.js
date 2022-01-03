import axios from 'axios';

 export const getEntregaBs = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getEntregaBs');
 }

 export const getEntregaBID =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getEntregaBId/${id}`);
 }



 export const createEntregaB=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createEntregaB', 
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
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updateEntregaB/${id}`, 
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
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deleteEntregaBId/${id}`);
}

export const getEntregaBsActivas = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getEntregaBsActivas');
}
