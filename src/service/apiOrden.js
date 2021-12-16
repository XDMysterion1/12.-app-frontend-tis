import axios from 'axios';

 export const getOrdens = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getOrdens');
 }

 export const getOrdenID =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getOrdenId/${id}`);
 }



 export const createOrden=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createOrden', 
      {
         id:                     `${data.id}`,
         fecha:                  `${data.fecha}`,
         caratulaA:              `${data.caratulaA}`,
         indiceA:                `${data.indiceA}`,
         cartaA:                 `${data.cartaA}`,
         boletaA:                `${data.boletaA}`,
         conformacionA:          `${data.conformacionA}`,
         solvenciaA:             `${data.solvenciaA}`,
         caratulaB:              `${data.caratulaB}`,
         indiceB:                `${data.indiceB}`,
         propuestaServicioB:     `${data.propuestaServicioB}`,
         planificacionB:         `${data.planificacionB}`,
         propuestaEconomicaB:    `${data.propuestaEconomicaB}`,
         planPagosB:             `${data.planPagosB}`,
         cumplimientoProponente: `${data.cumplimientoProponente}`,
         claridadOrganizacion:   `${data.claridadOrganizacion}`,
         cumplimientoTecnico:    `${data.cumplimientoTecnico}`,
         claridadProceso:        `${data.claridadProceso}`,
         plazosEjecucion:        `${data.plazosEjecucion}`,
         precioTotal:            `${data.precioTotal}`,
         usoHerramienta:         `${data.usoHerramienta}`,
         estado:                 `${data.estado}`,
         empresa:                `${data.empresa}`,
         user:                   `${data.user}`
       
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

export const updateOrdenID =(data,id) =>{
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updateOrden/${id}`, 
    {
        fecha:                  `${data.fecha}`,
        caratulaA:              `${data.caratulaA}`,
        indiceA:                `${data.indiceA}`,
        cartaA:                 `${data.cartaA}`,
        boletaA:                `${data.boletaA}`,
        conformacionA:          `${data.conformacionA}`,
        solvenciaA:             `${data.solvenciaA}`,
        caratulaB:              `${data.caratulaB}`,
        indiceB:                `${data.indiceB}`,
        propuestaServicioB:     `${data.propuestaServicioB}`,
        planificacionB:         `${data.planificacionB}`,
        propuestaEconomicaB:    `${data.propuestaEconomicaB}`,
        planPagosB:             `${data.planPagosB}`,
        cumplimientoProponente: `${data.cumplimientoProponente}`,
        claridadOrganizacion:   `${data.claridadOrganizacion}`,
        cumplimientoTecnico:    `${data.cumplimientoTecnico}`,
        claridadProceso:        `${data.claridadProceso}`,
        plazosEjecucion:        `${data.plazosEjecucion}`,
        precioTotal:            `${data.precioTotal}`,
        usoHerramienta:         `${data.usoHerramienta}`,
        estado:                 `${data.estado}`,
        empresa:                `${data.empresa}`,
        user:                   `${data.user}`
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deleteOrdenID =(id) =>{
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deleteOrdenId/${id}`);
}

export const getOrdensActivas = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getOrdensActivas');
}
