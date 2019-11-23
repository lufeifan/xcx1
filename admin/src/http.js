import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    // baseURL: 'http://localhost:3001/api'
    baseURL: 'http://139.155.12.117:3333/api'

})
http.interceptors.request.use(function (config) {
    if (sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + sessionStorage.token
    }
    return config;
}, function (err) {
    return Promise.reject(err)
})
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    if(err.response.status===401){
        router.push('/')
    }

    return Promise.reject(err)
})
export default http