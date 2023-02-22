import axios from 'axios'

const rootUrl = process.env.REACT_APP_ROOT_URL
const baseUrl = `${rootUrl}/api/persons`
console.log(`Set base url to ${baseUrl}`)

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data)
}

const services = {
    getAll,
    create,
    remove,
    update,
}

export default services
