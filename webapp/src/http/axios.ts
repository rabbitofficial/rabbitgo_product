import instance from "./index"
const axios = async ({
    method,
    url,
    data,
    config
}: any): Promise<any> => {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data, { ...config })
    } else if (method == 'get') {
        return instance.get(url, {
            params: data,
            ...config
        })
    } else if (method == 'delete') {
        return instance.delete(url, {
            params: data,
            ...config
        })
    } else if (method == 'put') {
        return instance.put(url, data, { ...config })
    } else {
        console.error('no' + method)
        return false
    }
}
export {
    axios
}