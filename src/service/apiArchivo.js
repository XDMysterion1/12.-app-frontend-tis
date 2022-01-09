import axios from 'axios'

////plan de pagos
export const subirArchivo = (archivo) =>{
   
    const fd = new FormData();
    fd.append('file', archivo.archivo, archivo.archivoNombre);
    axios.post('http://magictsec.tis.cs.umss.edu.bo/api/upload', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const download=()=>{
    axios({
        url:"http://magictsec.tis.cs.umss.edu.bo/api/download",
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
    axios.post('http://magictsec.tis.cs.umss.edu.bo/api/uploadConvocatoria', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const downloadConvocatoria=()=>{
    axios({
        url:"http://magictsec.tis.cs.umss.edu.bo/api/downloadConvocatoria",
        method: 'GET',
        responseType:'blob',

    }).then((reponse) => {
        const url = window.URL.createObjectURL(new Blob([reponse.data]));
        const link = document.createElement('a');
        link.href=url;
        link.setAttribute('download', 'convocatoria.pdf');
        console.log("este es el link"+link);
        document.body.appendChild(link);
        link.click();
    })
}
///pliego
export const subirPliego = (archivo) =>{
   
    const fd = new FormData();
    fd.append('file', archivo.archivo, archivo.archivoNombre);
    axios.post('http://magictsec.tis.cs.umss.edu.bo/api/uploadPliego', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const downloadPliego=()=>{
    axios({
        url:"http://magictsec.tis.cs.umss.edu.bo/api/downloadPliego",
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
    axios.post('http://magictsec.tis.cs.umss.edu.bo/api/uploadParteA', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const descargarParteA=()=>{
    axios({
        url:"http://magictsec.tis.cs.umss.edu.bo/api/downloadParteA",
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
    axios.post('http://magictsec.tis.cs.umss.edu.bo/api/uploadParteB', fd,{
        onUploadProgress: progressEvent =>{
            console.log("Upload progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }
    })

}
export const descargarParteB=()=>{
    axios({
        url:"http://magictsec.tis.cs.umss.edu.bo/api/downloadParteB",
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