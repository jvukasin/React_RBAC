import axiosRequest from '../util/AxiosApi'

class AuthService {

    login(username, password) {
        let user = {
            username: username,
            password: password
        }
        return axiosRequest.post('/auth/login', user)
    }

    logout(){
        return axiosRequest.post('/auth/logout', null)
    }
}

export default new AuthService()