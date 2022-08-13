import axios from "axios";
import { Message } from 'element-ui';
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        Message.error(error.message)
        return Promise.reject(error);
    }
)

export default axios;
