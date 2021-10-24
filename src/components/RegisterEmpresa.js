import React, { useState, useEffect, useRef } from 'react';
import classNames           from 'classnames';
import { DataTable }        from 'primereact/datatable';
import { Column }           from 'primereact/column';
import { Toast }            from 'primereact/toast';
import { Button }           from 'primereact/button';
import { Toolbar }          from 'primereact/toolbar';
import { Dialog }           from 'primereact/dialog';
import { InputText }        from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';

export const  RegisterEmpresa = () => {

    const [products, setProducts] = useState([]);

    const columns = [
        {field: 'id', header: 'ID'},
        {field: 'rol', header: 'ROl'}

    ];

    useEffect(() => {
        const productService = new ProductService();
        productService.getProductsSmall().then(data => setProducts(data));
    }, [])

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <DataTable value={products}>
            {dynamicColumns}
        </DataTable>
    );
}