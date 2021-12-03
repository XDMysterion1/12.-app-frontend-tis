import React, { useState, useEffect } from 'react';
import { DataTable }                  from 'primereact/datatable';
import { Column }                     from 'primereact/column';
import { Button }                     from 'primereact/button';
import { ColumnGroup }                from 'primereact/columngroup';
import { Row }                        from 'primereact/row';
import { InputText }                  from 'primereact/inputtext';
import { getPliegosPublicados}        from '../service/apiPliego';

export const ListPliego = (props) => {

    const [pliegos, setPliegos]             = useState(null);
    const [globalFilter, setGlobalFilter]   = useState('');
    const [loading, setLoading]             = useState(true);

    useEffect(()=>{
        fetchPliegos();
    },[])

    const fetchPliegos = () =>{
        getPliegosPublicados().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Pliegos insertados-----------");
                setPliegos(json.data);
                setLoading(false);
            }
        })
    }

  
    const TableHeader = (
        <div className="table-header">
            Lista de Pliego de espeficicaciones publicados
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Busqueda de convocatorias" />
            </span>
        </div>
    );
    const tituloBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Titulo</span>
                {rowData.titulo}
            </>
        );
    }

    const codigoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Codigo</span>
                {rowData.codigo}
            </>
        );
    }

    const semestreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Semestre</span>
                {rowData.semestre}
            </>
        );
    }

    const linkBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Link</span>
                <Button label="Ver documento" className="p-button-link" onClick={() => window.open(`${rowData.link}`)} style={props.layoutColorMode === 'light' ? {'color':'#495057', 'font-weight': 'bold' , 'text-align': 'justify'} : {'color':'#ffffff', 'font-weight': 'bold' , 'text-align': 'justify'}}/>      
            </>
        );
    }

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <DataTable value={pliegos} className="p-datatable-gridlines p-datatable-striped p-datatable-sm p-datatable-customers" dataKey="id" rowHover
                        paginator rows={10} rowsPerPageOptions={[5, 10, 25]} globalFilter={globalFilter} emptyMessage="No se encontraron empresas" loading={loading} header={TableHeader}>
                        <Column style={{width:'20%'}} field="titulo"    header="TITULO"     sortable body={tituloBodyTemplate}    ></Column>
                        <Column style={{width:'20%'}} field="codigo"    header="CODIGO"     sortable body={codigoBodyTemplate}    ></Column>
                        <Column style={{width:'20%'}} field="semestre"  header="SEMESTRE"   sortable body={semestreBodyTemplate}  ></Column>
                        <Column style={{width:'25%'}} field="link"      header="LINK"       sortable body={linkBodyTemplate}      ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
