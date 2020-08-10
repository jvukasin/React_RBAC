import axios from 'axios'

const API_URL = 'http://localhost:8081'

class Services {

    login(email, password) {
        return axios.porst(
            `${API_URL}/user/login`,
            {
                user: {
                    email: email,
                    password: password
                }
            })
    }

    // login() {
    //     return axios.get(`${API_URL}/user/login`)
    // }
}

export default new Services()