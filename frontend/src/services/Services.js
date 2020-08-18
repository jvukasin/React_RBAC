import axios from 'axios'
import {api_url} from '../assets/variables/Variables'

class Services {

    getAllArticles() {
        return axios.get(`${api_url}/articles`)
    }
}

export default new Services()