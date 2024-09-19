import axios from 'axios'

export default class RequestService {
    constructor() {
        this.config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        this.url = 'https://mylinkback-production.up.railway.app/api/'
    }

    login(email, password) {
        return axios.post(this.url + 'login', {
            email: email,
            password: password
        })
    }
}