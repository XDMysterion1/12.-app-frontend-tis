import React, { useState, useEffect } from 'react';
import { DataTable }                  from 'primereact/datatable';
import { Column }                     from 'primereact/column';
import { ColumnGroup }                from 'primereact/columngroup';
import { Row }                        from 'primereact/row';
import { InputText }                  from 'primereact/inputtext';
import { getEmpresas}                 from '../service/apiEmpresa';

export const ListEmpresa = (props) => {

    const [empresas, setEmpresas]           = useState(null);
    const [globalFilter, setGlobalFilter]   = useState('');
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

    const renderHeader = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Lista de empresas registradas en funda empresa</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
        )
    }

    const renderGroup = () => {
        return (
            <ColumnGroup>
                <Row>
                    <Column header={showHeader} colSpan={4}></Column>
                </Row>
                <Row>
                    <Column header="NOMBRE"                 field="nombre"       sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="SOCIEDAD"               field="tipoSociedad" sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="DIRECCION"              field="direccion"    sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="CORREO ELECTRONICO"     field="email"        sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                </Row>
            </ColumnGroup>
        )
    }


    const showHeader  = renderHeader();
    const headerGroup = renderGroup();

            

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <DataTable value={empresas} className="p-datatable-gridlines p-datatable-striped p-datatable-sm p-datatable-customers " dataKey="id" rowHover
                        paginator rows={10} rowsPerPageOptions={[5, 10, 25]} globalFilter={globalFilter} emptyMessage="No se encontraron empresas" loading={loading} 
                        headerColumnGroup={headerGroup} >
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
