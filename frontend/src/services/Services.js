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

    getUserProcurements() {
        return axiosRequest.get('/procurements/user');
    }
    
    getStats() {
        return axiosRequest.get('/system/stats');
    }

    createNewArticle(articalName, code, brand, price) {
        var art = {
            id: 0,
            name: articalName,
            code: code,
            brand: brand,
            price: price
        }
        return axiosRequest.post('/articles', art)
    }

    setQuantity(item) {
        return axiosRequest.put('/inventory/changeItem', item)
    }

    scheduleAppointment(person, date, note, time) {
        var app = {
            id: 0,
            person: person,
            date: date,
            time: time,
            note: note
        }
        return axiosRequest.post('/users/makeAppointment', app)
    }
}

export default new Services()