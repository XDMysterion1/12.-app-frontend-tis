import React, { useState, useEffect } from 'react';
import { DataTable }                  from 'primereact/datatable';
import { Column }                     from 'primereact/column';
import { Button }                     from 'primereact/button';
import { ColumnGroup }                from 'primereact/columngroup';
import { Row }                        from 'primereact/row';
import { InputText }                  from 'primereact/inputtext';
import { getConvocatoriasPublicados}  from '../service/apiConvocatoria';

export const ListConvocatoria = (props) => {

    const [convocatorias, setConvocatorias] = useState(null);
    const [globalFilter, setGlobalFilter]   = useState('');
    const [loading, setLoading]             = useState(true);

    useEffect(()=>{
        fetchConvocatorias();
    },[])

    const fetchConvocatorias = () =>{
        getConvocatoriasPublicados().then(json =>{
            if(json.error){
                console.log("Error");
            }else{
                console.log("---------Convocatorias insertados-----------");
                setConvocatorias(json.data);
                setLoading(false);
            }
        })
    }

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


    const renderHeader = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Lista de convocatorias publicadas</h5>
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
                    <Column header="TITULO"     field="titulo"      sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="SOCIEDAD"   field="codigo"      sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="DIRECCION"  field="semestre"    sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
                    <Column header="LINK"       field="link"        sortable style={{ 'background-color': '#13af4e', width:'20%'}}/>
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
                    <DataTable value={convocatorias} className="p-datatable-gridlines p-datatable-striped p-datatable-sm p-datatable-customers" dataKey="id" rowHover
                        paginator rows={10} rowsPerPageOptions={[5, 10, 25]} globalFilter={globalFilter} emptyMessage="No se encontraron empresas" loading={loading} 
                        headerColumnGroup={headerGroup} >
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
