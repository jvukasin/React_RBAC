import axios from 'axios';

const backendApi = axios.create({
    baseURL: 'http://localhost:8081'
});

backendApi.interceptors.request.use(request => {
    if(localStorage.getItem('currentUser') != null || localStorage.getItem('currentUser') !== undefined){
        request.headers.authorization = 'Bearer ' + localStorage.getItem('currentUser');
    }
    return request;
})

export default backendApi;