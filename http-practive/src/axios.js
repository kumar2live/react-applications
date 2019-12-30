import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

AxiosInstance.defaults.headers.common['Authorization']= 'AUTH TOKEN FROM AXIOS INSTANCE';

export default AxiosInstance;