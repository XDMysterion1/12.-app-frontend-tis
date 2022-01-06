import axios from 'axios';

 export const getItems = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getItems');
 }

 export const getItemId =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getItemId/${id}`);
 }



 export const createItem=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createItem', 
      {
         id:          `${data.id}`,
         Iconolabel:  `${data.Iconolabel}`,
         IconoIcono:  `${data.IconoIcono}`,
         ItemLabel:   `${data.ItemLabel}`,
         ItemIcono:   `${data.ItemIcono}`,
         ItemTo:      `${data.ItemTo}`,
         estado:      `${data.estado}`,
         rol:         `${data.rol}`
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

export const updateItemID =(data,id) =>{
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updateItem/${id}`, 
    {
        Iconolabel:  `${data.Iconolabel}`,
        IconoIcono:  `${data.IconoIcono}`,
        ItemLabel:   `${data.ItemLabel}`,
        ItemIcono:   `${data.ItemIcono}`,
        ItemTo:      `${data.ItemTo}`,
        estado:      `${data.estado}`,
        rol:         `${data.rol}`
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deleteItemID =(id) =>{
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deleteItemId/${id}`);
}

export const getItemsActivas = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getItemsActivas');
}

export const getItemsRol = () =>{
    return axios.get('https://magic-tech-backend.herokuapp.com/api/getItemsRol');
  }
