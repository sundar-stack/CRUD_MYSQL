import axios from 'axios'

const instance = axios.create({
    baseURL:"http://localhost:5049"
})

export default instance;