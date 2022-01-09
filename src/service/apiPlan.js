import axios from 'axios';

 export const getPlans = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getPlans');
 }

 export const getPlanID =(id) =>{
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getPlanId/${id}`);
 }



 export const createPlan=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createPlan', 
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
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updatePlan/${id}`, 
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
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deletePlanId/${id}`);
}

export const getPlansActivas = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getPlansActivas');
}
