import axios from 'axios'

export default class RequestService {
    constructor() {
        this.token = localStorage.getItem('token')
        this.config = { headers: { Authorization: 'Bearer ' +  this.token } }
        this.url = 'https://mylinkback-production.up.railway.app/api/'
    }

    login(email, password) {
        return axios.post(this.url + 'login', {
            email: email,
            password: password
        })
    }
}