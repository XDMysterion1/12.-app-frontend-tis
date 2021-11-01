import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProductService } from '../service/ProductService';

export const ShowEmpresa = () => {

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        console.log("Submit");
    };
    return(
    <div>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label for="nombre">Nombre</label>
                <input type="email"minlength="8" maxlength="40" required pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}" 
                                    title=" Soporta letras mayusculas, minusculas números y los caracteres especiales . _@ , tamaño mínimo: 8 a un tamaño máximo: 40" required/>
            </div>
            <div>
                <label for="pass">Contraseña</label>
                <input type="password" required/>
            </div>
            <div>

                <button type="submit" value="Submit">Submit</button>
            </div>
        </form>
    </div>

    );
}
