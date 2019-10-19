import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://user-products.herokuapp.com/api/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
// instance.defaults.headers['x-auth-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3ZTkxYjdmNDdkMTAwMTdmNTZiNGYiLCJuYW1lIjoiTWFqaWQgSGFzaG1pIiwiaWF0IjoxNTcwMjM2Njk5fQ.zTmB5rODixYNfpoHHZn9Io4XMBC_KAisp09dAsf802M';

export default instance;