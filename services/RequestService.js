import axios from 'axios'

export default class RequestService {
    constructor() {
        this.url = 'https://mylinkback-production.up.railway.app/api/'
    }

    config (token) {
        return { headers: { Authorization: 'Bearer ' +  token } }
    }

    login(email, password) {
        return axios.post(this.url + 'login', {
            email,
            password
        })
    }

    createAccount(email, name, password) {
        return axios.post(this.url + 'users', {
            email,
            password,
            name
        })
    }

    getMyCards(token){
        return axios.get(this.url + 'cards', this.config(token))
    }

    createCard(token, payload){
        return axios.post(this.url + 'cards', payload, this.config(token))
    }

    deleteCard(token, id){
        return axios.delete(this.url + 'cards/' + id, this.config(token))
    }

    getCard(token, id){
        return axios.get(this.url + 'cards/' + id, this.config(token))
    }

    getPlataforms(token){
        return axios.get(this.url + 'plataforms/', this.config(token))
    }

    addLink(token, payload){
        return axios.post(this.url + 'addLink', payload, this.config(token))
    }
}