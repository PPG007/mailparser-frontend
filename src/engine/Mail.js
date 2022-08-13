import axios from '@/utils/axios.js';

export default class Mail {
    static fetch = (config) => {
        return axios.post('/mails/search', config);
    };
}
