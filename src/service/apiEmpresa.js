import axios from 'axios';

 export const getEmpresas = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getEmpresas');
 }

 export const getEmpresaID =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getEmpresaId/${id}`);
 }



 export const createEmpresa=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createEmpresa', 
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
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updateEmpresa/${id}`, 
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
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deleteEmpresaId/${id}`);
}

export const getEmpresasActivas = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getEmpresasActivas');
}
