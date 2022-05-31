import axios from 'axios';

import { SERVICE_API } from '../constants';

const request = axios.create({
    baseURL: SERVICE_API,
});

export default request;
