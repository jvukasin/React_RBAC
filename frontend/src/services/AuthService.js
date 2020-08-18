import axios from 'axios'
import {api_url} from '../assets/variables/Variables'

class AuthService {

    login(username, password) {
        let user = {
            username: username,
            password: password
        }
        return axios.post(`${api_url}/auth/login`, user)
    }

    logout(){
        return axios.post(`${api_url}/auth/logout`, null)
    }
}

export default new AuthService()