import axios from 'axios';

 export const getEmpresas = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getEmpresas');
 }

 export const getEmpresaID =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getEmpresaId/${id}`);
 }



 export const createEmpresa=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createEmpresa', 
      {
         id:          `${data.id}`,
         nombre:      `${data.nombre}`,
         nombreCorto: `${data.nombreCorto}`,
         nombreLargo: `${data.nombreLargo}`,
         tipoSociedad:`${data.tipoSociedad}`,
         direccion:   `${data.direccion}`,
         email:       `${data.email}`,
         password:    `${data.password}`,
         informacion: `${data.informacion}`,
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

export const updateEmpresaID =(data,id) =>{
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updateEmpresa/${id}`, 
    {
      nombre:      `${data.nombre}`,
      nombreCorto: `${data.nombreCorto}`,
      nombreLargo: `${data.nombreLargo}`,
      tipoSociedad:`${data.tipoSociedad}`,
      direccion:   `${data.direccion}`,
      email:       `${data.email}`,
      password:    `${data.password}`,
      informacion: `${data.informacion}`,
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

export const deleteEmpresaID =(id) =>{
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deleteEmpresaId/${id}`);
}

export const getEmpresasActivas = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getEmpresasActivas');
}
