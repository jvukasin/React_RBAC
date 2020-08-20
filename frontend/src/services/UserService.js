import axiosRequest from '../util/AxiosApi'

class UserService {

    getUserRoutes() {
        return axiosRequest.get('/users/routes')
    }

    isUserLoggedIn() {
        return axiosRequest.get('/users/isUserLogged')
    }

    getCurrentUser() {
        return axiosRequest.get('/users/currentUser')
    }

}

export default new UserService()