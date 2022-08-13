import axios from 'axios';

export default class Mail {
    static fetch = (config) => {
        return axios.post('/mails/search', config);
    };
}
