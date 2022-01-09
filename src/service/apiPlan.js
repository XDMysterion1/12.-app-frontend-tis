import axios from 'axios';

 export const getPlans = () =>{
     return axios.get('https://magic-tech-backend.herokuapp.com/api/getPlans');
 }

 export const getPlanID =(id) =>{
     return axios.get(`https://magic-tech-backend.herokuapp.com/api/getPlanId/${id}`);
 }



 export const createPlan=(data)=>{
    return axios.post('https://magic-tech-backend.herokuapp.com/api/createPlan', 
      {
         id:     `${data.id}`,
         link:   `${data.link}`,
         estado: `${data.estado}`,
         user:   `${data.user}`
       
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 }

export const updatePlanID =(data,id) =>{
    return axios.put(`https://magic-tech-backend.herokuapp.com/api/updatePlan/${id}`, 
    {
        link:   `${data.link}`,
        estado: `${data.estado}`,
        user:   `${data.user}`
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deletePlanID =(id) =>{
    return axios.delete(`https://magic-tech-backend.herokuapp.com/api/deletePlanId/${id}`);
}

export const getPlansActivas = () =>{
  return axios.get('https://magic-tech-backend.herokuapp.com/api/getPlansActivas');
}
