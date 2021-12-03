import React, { useState, useEffect } from 'react';
import { DataTable }                  from 'primereact/datatable';
import { Column }                     from 'primereact/column';
import { ColumnGroup }                from 'primereact/columngroup';
import { Row }                        from 'primereact/row';
import { InputText }                  from 'primereact/inputtext';
import { getEmpresas}                 from '../service/apiEmpresa';

export const ListEmpresa = () => {

    const [empresas, setEmpresas]           = useState(null);
    const [globalFilter, setGlobalFilter]  = useState('');
    const [loading, setLoading]             = useState(true);

    useEffect(()=>{
        fetchEmpresas();
    },[])

    const fetchEmpresas = () =>{
        getEmpresas().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Empresas insertados-----------");
                setEmpresas(json.data);
                setLoading(false);
            }
        })
    }

  
    const TableHeader = (
        <div className="table-header">
            Lista de empresas registradas en funda empresa
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Busqueda de empresa" />
            </span>
        </div>
    );

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {rowData.nombre}
            </>
        );
    }

    const tipoSociedadBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipo Sociedad</span>
                {rowData.tipoSociedad}
                
            </>
        );
    }

    


    const direccionBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Direccion</span>
                {rowData.direccion}
            </>
        );
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Correo electronico</span>
                {rowData.email}
            </>
        );
    }

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <DataTable value={empresas} className="p-datatable-gridlines p-datatable-striped p-datatable-sm p-datatable-customers" dataKey="id" rowHover
                        paginator rows={10} rowsPerPageOptions={[5, 10, 25]} globalFilter={globalFilter} emptyMessage="No se encontraron empresas" loading={loading} header={TableHeader}>
                        <Column style={{width:'20%'}} field="nombre"          header="NOMBRE"             sortable body={nombreBodyTemplate}        ></Column>
                        <Column style={{width:'20%'}} field="tipoSociedad"    header="SOCIEDAD"           sortable body={tipoSociedadBodyTemplate}  ></Column>
                        <Column style={{width:'20%'}} field="direccion"       header="DIRECCION"          sortable body={direccionBodyTemplate}     ></Column>
                        <Column style={{width:'25%'}} field="email"           header="CORREO ELECTRONICO" sortable body={emailBodyTemplate}         ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
