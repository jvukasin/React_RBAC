// import UserService from '../services/UserService'

export function isLoggedIn() {
    // UserService.isUserLoggedIn().then(response => {
    //     let isit = response.data
    //     return isit;
    // })
    return !!localStorage.getItem('currentUser')
}