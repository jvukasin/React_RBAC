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

    getAllProcurements() {
        return axiosRequest.get('/procurements')
    }

    completeProcurement(id) {
        return axiosRequest.put('/procurements/complete/'.concat(id), null)
    }
}

export default new Services()