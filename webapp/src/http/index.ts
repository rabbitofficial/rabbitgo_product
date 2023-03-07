
// http/index.ts
    import axios from 'axios'

    var instance = axios.create({
  
        timeout: 20000, 
        
        //withCredentials:true
        /* headers: {
            'Content-Type': 'application/json;charset=UTF-8;',
        } */
    })

    instance.interceptors.request.use((config: any) => {
       
        const token = localStorage.getItem('token');
        token && (config.headers.Authorization = token)
       
        if (config.method === 'POST') {
            config.data = JSON.stringify(config.data);
        }
        return config;
    }, (error) =>
        
        Promise.reject(error));


    instance.interceptors.response.use((response) => {
       
        //console.log('response successfully');
        return response.data;
    }, (error) => {
        console.log(error)
        
        if (error.response && error.response.status) {
            const status = error.response.status
            console.log(status);
            return Promise.reject(error);
        }
        return Promise.reject(error);
    });
    export default instance;