import axios from 'axios';

const OrderxAxios = axios.create({
  baseURL: 'https://mk-react-burger-app.firebaseio.com/',
})

export default OrderxAxios;

