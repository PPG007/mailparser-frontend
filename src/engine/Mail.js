import axios from "axios";

export default class Mail {
    static init = (config) => {
        return axios.post('/init', config);
    };

    static fetchMail = () => {
        return axios.get('/mails')
    };
}
