import axios from "axios";

const privateClient = axios.create({
    baseURL: `http://127.0.0.1:8000/api`
})

privateClient.interceptors.request.use(config=>{
    // config.headers.Authorization = `Bearer 37|1SbX1b1KntMU72S058KmZr1rw0I6WeWoibsZ5Bpl`
    config.headers['Access-Control-Allow-Origin'] = `*`
    config.headers['Access-Control-Allow-Methods'] = "OPTIONS, DELETE, POST, GET, PATCH, PUT";
    return config
})

export default privateClient