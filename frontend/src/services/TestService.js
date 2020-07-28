import axios from 'axios'

const API_URL = 'http://localhost:8081'

class TestService {

    testRetrieve() {
        return axios.get(`${API_URL}/temp`)
    }
}

export default new TestService()