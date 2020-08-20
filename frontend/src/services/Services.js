import axiosRequest from '../util/AxiosApi'

class Services {

    getAllArticles() {
        return axiosRequest.get('/articles')
    }

    getInventory() {
        return axiosRequest.get('/inventory')
    }

    createNewProcurement(list) {
        return axiosRequest.post('/procurements', list)
    }
}

export default new Services()