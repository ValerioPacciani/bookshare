import axios from "axios";

//const axios = require('axios');
//axios configuration
const axiosClient = axios.create({
    baseURL: 'http://localhost:5000',
})

//Token e protezione per axios
//l interceptor è un middleware che si usa per gestire tutte le richieste provienenti dal client, in questo caso, questo specifico controlla se esiste il token
axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}
)


export default axiosClient;