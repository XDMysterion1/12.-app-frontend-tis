import axios from 'axios';

 export const getItems = () =>{
     return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getItems');
 }

 export const getItemId =(id) =>{
  
     return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getItemId/${id}`);
 }



 export const createItem=(data)=>{
    return axios.post('http://magictsec.tis.cs.umss.edu.bo/api/createItem', 
      {
         id:                 `${data.id}`,
         homelabel:          `${data.homelabel}`,
         homeIcono:          `${data.homeIcono}`,
         homeItemLabel:      `${data.homeItemLabel}`,
         homeItemIcono:      `${data.homeItemIcono}`,
         homeItemTo:         `${data.homeItemTo}`,
         
         rolelabel:          `${data.rolelabel}`,
         roleIcono:          `${data.roleIcono}`,
         roleItemLabel:      `${data.roleItemLabel}`,
         roleItemIcono:      `${data.roleItemIcono}`,
         roleItemTo:         `${data.roleItemTo}`,

         itemlabel:          `${data.itemlabel}`,
         itemIcono:          `${data.itemIcono}`,
         itemItemLabel:      `${data.itemItemLabel}`,
         itemItemIcono:      `${data.itemItemIcono}`,
         itemItemTo:         `${data.itemItemTo}`,

         userlabel:          `${data.userlabel}`,
         userIcono:          `${data.userIcono}`,
         userItemLabel:      `${data.userItemLabel}`,
         userItemIcono:      `${data.userItemIcono}`,
         userItemTo:         `${data.userItemTo}`,

         empresalabel:       `${data.empresalabel}`,
         empresaIcono:       `${data.empresaIcono}`,
         empresaItemLabel:   `${data.empresaItemLabel}`,
         empresaItemIcono:   `${data.empresaItemIcono}`,
         empresaItemTo:      `${data.empresaItemTo}`,

         convocatorialabel:       `${data.convocatorialabel}`,
         convocatoriaIcono:       `${data.convocatoriaIcono}`,
         convocatoriaItemLabel:   `${data.convocatoriaItemLabel}`,
         convocatoriaItemIcono:   `${data.convocatoriaItemIcono}`,
         convocatoriaItemTo:      `${data.convocatoriaItemTo}`,

         pliegolabel:       `${data.pliegolabel}`,
         pliegoIcono:       `${data.pliegoIcono}`,
         pliegoItemLabel:   `${data.pliegoItemLabel}`,
         pliegoItemIcono:   `${data.pliegoItemIcono}`,
         pliegoItemTo:      `${data.pliegoItemTo}`,

         contratolabel:       `${data.contratolabel}`,
         contratoIcono:       `${data.contratoIcono}`,
         contratoItemLabel:   `${data.contratoItemLabel}`,
         contratoItemIcono:   `${data.contratoItemIcono}`,
         contratoItemTo:      `${data.contratoItemTo}`,

         ordenlabel:       `${data.ordenlabel}`,
         ordenIcono:       `${data.ordenIcono}`,
         ordenItemLabel:   `${data.ordenItemLabel}`,
         ordenItemIcono:   `${data.ordenItemIcono}`,
         ordenItemTo:      `${data.ordenItemTo}`,

         planlabel:       `${data.planlabel}`,
         planIcono:       `${data.planIcono}`,
         planItemLabel:   `${data.planItemLabel}`,
         planItemIcono:   `${data.planItemIcono}`,
         planItemTo:      `${data.planItemTo}`,

         parteAlabel:       `${data.parteAlabel}`,
         parteAIcono:       `${data.parteAIcono}`,
         parteAItemLabel:   `${data.parteAItemLabel}`,
         parteAItemIcono:   `${data.parteAItemIcono}`,
         parteAItemTo:      `${data.parteAItemTo}`,

         parteBlabel:       `${data.parteBlabel}`,
         parteBIcono:       `${data.parteBIcono}`,
         parteBItemLabel:   `${data.parteBItemLabel}`,
         parteBItemIcono:   `${data.parteBItemIcono}`,
         parteBItemTo:      `${data.parteBItemTo}`,

         listEmpresalabel:       `${data.listEmpresalabel}`,
         listEmpresaIcono:       `${data.listEmpresaIcono}`,
         listEmpresaItemLabel:   `${data.listEmpresaItemLabel}`,
         listEmpresaItemIcono:   `${data.listEmpresaItemIcono}`,
         listEmpresaItemTo:      `${data.listEmpresaItemTo}`,

         listConvlabel:       `${data.listConvlabel}`,
         listConvIcono:       `${data.listConvIcono}`,
         listConvItemLabel:   `${data.listConvItemLabel}`,
         listConvItemIcono:   `${data.listConvItemIcono}`,
         listConvItemTo:      `${data.listConvItemTo}`,

         listPliegolabel:       `${data.listPliegolabel}`,
         listPliegoIcono:       `${data.listPliegoIcono}`,
         listPliegoItemLabel:   `${data.listPliegoItemLabel}`,
         listPliegoItemIcono:   `${data.listPliegoItemIcono}`,
         listPliegoItemTo:      `${data.listPliegoItemTo}`,

         forolabel:       `${data.forolabel}`,
         foroIcono:       `${data.foroIcono}`,
         foroItemLabel:   `${data.foroItemLabel}`,
         foroItemIcono:   `${data.foroItemIcono}`,
         foroItemTo:      `${data.foroItemTo}`,

         home:         `${data.home}`,               
         role:         `${data.role}`,             
         item:         `${data.item}`,             
         user:         `${data.user}`,             
         empresa:      `${data.empresa}`,            
         convocatoria: `${data.convocatoria}`,         
         pliego:       `${data.pliego}`,              
         contrato:     `${data.contrato}`,            
         orden:        `${data.orden}`,              
         plan:         `${data.plan}`,               
         parteA:       `${data.parteA}`,              
         parteB:       `${data.parteB}`,              
         listEmpresa:  `${data.listEmpresa}`,           
         listConv:     `${data.listConv}`,            
         listPliego:   `${data.listPliego}`,           
         foro:         `${data.foro}`,             

         estado:      `${data.estado}`,
         rol:         `${data.rol}`
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
      });
 }

export const updateItemID =(data,id) =>{
    return axios.put(`http://magictsec.tis.cs.umss.edu.bo/api/updateItem/${id}`, 
    {
        homelabel:       `${data.homelabel}`,
        homeIcono:       `${data.homeIcono}`,
        homeItemLabel:   `${data.homeItemLabel}`,
        homeItemIcono:   `${data.homeItemIcono}`,
        homeItemTo:      `${data.homeItemTo}`,

        rolelabel:       `${data.rolelabel}`,
        roleIcono:       `${data.roleIcono}`,
        roleItemLabel:   `${data.roleItemLabel}`,
        roleItemIcono:   `${data.roleItemIcono}`,
        roleItemTo:      `${data.roleItemTo}`,

        itemlabel:       `${data.itemlabel}`,
        itemIcono:       `${data.itemIcono}`,
        itemItemLabel:   `${data.itemItemLabel}`,
        itemItemIcono:   `${data.itemItemIcono}`,
        itemItemTo:      `${data.itemItemTo}`,

        userlabel:       `${data.userlabel}`,
        userIcono:       `${data.userIcono}`,
        userItemLabel:   `${data.userItemLabel}`,
        userItemIcono:   `${data.userItemIcono}`,
        userItemTo:      `${data.userItemTo}`,

        empresalabel:       `${data.empresalabel}`,
        empresaIcono:       `${data.empresaIcono}`,
        empresaItemLabel:   `${data.empresaItemLabel}`,
        empresaItemIcono:   `${data.empresaItemIcono}`,
        empresaItemTo:      `${data.empresaItemTo}`,

        convocatorialabel:       `${data.convocatorialabel}`,
        convocatoriaIcono:       `${data.convocatoriaIcono}`,
        convocatoriaItemLabel:   `${data.convocatoriaItemLabel}`,
        convocatoriaItemIcono:   `${data.convocatoriaItemIcono}`,
        convocatoriaItemTo:      `${data.convocatoriaItemTo}`,

        pliegolabel:       `${data.pliegolabel}`,
        pliegoIcono:       `${data.pliegoIcono}`,
        pliegoItemLabel:   `${data.pliegoItemLabel}`,
        pliegoItemIcono:   `${data.pliegoItemIcono}`,
        pliegoItemTo:      `${data.pliegoItemTo}`,

        contratolabel:       `${data.contratolabel}`,
        contratoIcono:       `${data.contratoIcono}`,
        contratoItemLabel:   `${data.contratoItemLabel}`,
        contratoItemIcono:   `${data.contratoItemIcono}`,
        contratoItemTo:      `${data.contratoItemTo}`,

        ordenlabel:       `${data.ordenlabel}`,
        ordenIcono:       `${data.ordenIcono}`,
        ordenItemLabel:   `${data.ordenItemLabel}`,
        ordenItemIcono:   `${data.ordenItemIcono}`,
        ordenItemTo:      `${data.ordenItemTo}`,

        planlabel:       `${data.planlabel}`,
        planIcono:       `${data.planIcono}`,
        planItemLabel:   `${data.planItemLabel}`,
        planItemIcono:   `${data.planItemIcono}`,
        planItemTo:      `${data.planItemTo}`,

        parteAlabel:       `${data.parteAlabel}`,
        parteAIcono:       `${data.parteAIcono}`,
        parteAItemLabel:   `${data.parteAItemLabel}`,
        parteAItemIcono:   `${data.parteAItemIcono}`,
        parteAItemTo:      `${data.parteAItemTo}`,

        parteBlabel:       `${data.parteBlabel}`,
        parteBIcono:       `${data.parteBIcono}`,
        parteBItemLabel:   `${data.parteBItemLabel}`,
        parteBItemIcono:   `${data.parteBItemIcono}`,
        parteBItemTo:      `${data.parteBItemTo}`,

        listEmpresalabel:       `${data.listEmpresalabel}`,
        listEmpresaIcono:       `${data.listEmpresaIcono}`,
        listEmpresaItemLabel:   `${data.listEmpresaItemLabel}`,
        listEmpresaItemIcono:   `${data.listEmpresaItemIcono}`,
        listEmpresaItemTo:      `${data.listEmpresaItemTo}`,

        listConvlabel:       `${data.listConvlabel}`,
        listConvIcono:       `${data.listConvIcono}`,
        listConvItemLabel:   `${data.listConvItemLabel}`,
        listConvItemIcono:   `${data.listConvItemIcono}`,
        listConvItemTo:      `${data.listConvItemTo}`,

        listPliegolabel:       `${data.listPliegolabel}`,
        listPliegoIcono:       `${data.listPliegoIcono}`,
        listPliegoItemLabel:   `${data.listPliegoItemLabel}`,
        listPliegoItemIcono:   `${data.listPliegoItemIcono}`,
        listPliegoItemTo:      `${data.listPliegoItemTo}`,

        forolabel:       `${data.forolabel}`,
        foroIcono:       `${data.foroIcono}`,
        foroItemLabel:   `${data.foroItemLabel}`,
        foroItemIcono:   `${data.foroItemIcono}`,
        foroItemTo:      `${data.foroItemTo}`,

        home:         `${data.home}`,               
        role:         `${data.role}`,             
        item:         `${data.item}`,             
        user:         `${data.user}`,             
        empresa:      `${data.empresa}`,            
        convocatoria: `${data.convocatoria}`,         
        pliego:       `${data.pliego}`,              
        contrato:     `${data.contrato}`,            
        orden:        `${data.orden}`,              
        plan:         `${data.plan}`,               
        parteA:       `${data.parteA}`,              
        parteB:       `${data.parteB}`,              
        listEmpresa:  `${data.listEmpresa}`,           
        listConv:     `${data.listConv}`,            
        listPliego:   `${data.listPliego}`,           
        foro:         `${data.foro}`,  

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
    return axios.delete(`http://magictsec.tis.cs.umss.edu.bo/api/deleteItemId/${id}`);
}

export const getItemsActivas = () =>{
  return axios.get('http://magictsec.tis.cs.umss.edu.bo/api/getItemsActivas');
}

export const getItemsRol = (id) =>{
    return axios.get(`http://magictsec.tis.cs.umss.edu.bo/api/getItemsRol/${id}`);
  }
