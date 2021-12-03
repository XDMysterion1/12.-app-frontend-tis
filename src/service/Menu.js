import axios from 'axios';

export class MenuService {

    getMenusAdmin() {
        return axios.get('assets/demo/data/menuAdmin.json').then(res => res.data.data);
    }
    getMenusUser() {
        return axios.get('assets/demo/data/menuUser.json').then(res => res.data.data);
    }
    getMenusDocente() {
        return axios.get('assets/demo/data/menuDocente.json').then(res => res.data.data);
    }
}