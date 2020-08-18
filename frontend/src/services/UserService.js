import axios from 'axios'
import {api_url} from '../assets/variables/Variables'

class UserService {

    getUserRoutes() {
        return axios.get(`${api_url}/users/routes`)
    }

    isUserLoggedIn() {
        return axios.get(`${api_url}/users/isUserLogged`)
    }
}

export default new UserService()