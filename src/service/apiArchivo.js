import axios from 'axios'

////plan de pagos
export const subirArchivo = (archivo) =>{
   
    const fd = new FormData();
    fd.append('file', archivo.archivo, archivo.archivoNombre);
    axios.post('https://magic-tech-backend.herokuapp.com/api/upload', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const download=()=>{
    axios({
        url:"https://magic-tech-backend.herokuapp.com/api/download",
        method: 'GET',
        responseType:'blob',

    }).then((reponse) => {
        const url = window.URL.createObjectURL(new Blob([reponse.data]));
        const link = document.createElement('a');
        link.href=url;
        link.setAttribute('download', 'plan.pdf');
 
        document.body.appendChild(link);
        link.click();
    })
}
///convocatoria
export const subirConvocatoria = (archivo) =>{
   
    const fd = new FormData();
    fd.append('file', archivo.archivo, archivo.archivoNombre);
    axios.post('https://magic-tech-backend.herokuapp.com/api/uploadConvocatoria', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const downloadConvocatoria=()=>{
    axios({
        url:"https://magic-tech-backend.herokuapp.com/api/downloadConvocatoria",
        method: 'GET',
        responseType:'blob',

    }).then((reponse) => {
        const url = window.URL.createObjectURL(new Blob([reponse.data]));
        const link1 = document.createElement('a');
        link1.href=url;
        link1.setAttribute('download', 'convocatoria.pdf');
        document.body.appendChild(link1);
        link1.click();
    })
}
///pliego
export const subirPliego = (archivo) =>{
   
    const fd = new FormData();
    fd.append('file', archivo.archivo, archivo.archivoNombre);
    axios.post('https://magic-tech-backend.herokuapp.com/api/uploadPliego', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const downloadPliego=()=>{
    axios({
        url:"https://magic-tech-backend.herokuapp.com/api/downloadPliego",
        method: 'GET',
        responseType:'blob',

    }).then((reponse) => {
        const url = window.URL.createObjectURL(new Blob([reponse.data]));
        const link = document.createElement('a');
        link.href=url;
        link.setAttribute('download', 'pliego.pdf');
       
        document.body.appendChild(link);
        link.click();
    })
}
///Parte A
export const subirParteA = (archivo) =>{
   
    const fd = new FormData();
    fd.append('file', archivo.archivo, archivo.archivoNombre);
    axios.post('https://magic-tech-backend.herokuapp.com/api/uploadParteA', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const descargarParteA=()=>{
    axios({
        url:"https://magic-tech-backend.herokuapp.com/api/downloadParteA",
        method: 'GET',
        responseType:'blob',

    }).then((reponse) => {
        const url = window.URL.createObjectURL(new Blob([reponse.data]));
        const link = document.createElement('a');
        link.href=url;
        link.setAttribute('download', 'parteA.pdf');
        document.body.appendChild(link);
        link.click();
    })
}
//Parte B
export const subirParteB = (archivo) =>{
   
    const fd = new FormData();
    fd.append('file', archivo.archivo, archivo.archivoNombre);
    axios.post('https://magic-tech-backend.herokuapp.com/api/uploadParteB', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const descargarParteB=()=>{
    axios({
        url:"https://magic-tech-backend.herokuapp.com/api/downloadParteB",
        method: 'GET',
        responseType:'blob',

    }).then((reponse) => {
        const url = window.URL.createObjectURL(new Blob([reponse.data]));
        const link = document.createElement('a');
        link.href=url;
        link.setAttribute('download', 'parteB.pdf');
        document.body.appendChild(link);
        link.click();
    })
}