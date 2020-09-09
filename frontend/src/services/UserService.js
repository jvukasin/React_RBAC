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

    getUser() {
        return axiosRequest.get('/users/getUser')
    }

    getAllUsers() {
        return axiosRequest.get('/users/getAllUsers')
    }

    getRoles() {
        return axiosRequest.get('/users/getRoles')
    }

    registerNewUser(firstName, lastName, email, username, password, workerCode, roles) {
        let user = {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            workerCode: workerCode,
            roles: roles
        }
        return axiosRequest.post('/users', user)
    }

    getAppointment() {
        return axiosRequest.get('/users/getAppointment')
    }

}

export default new UserService()