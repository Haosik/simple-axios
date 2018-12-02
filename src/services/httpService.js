import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

axios.interceptors.response.use(null, error => {
  const isExpectedError = error.response && error.response.status > 399 && error.response.status < 500;

  // if 500 response or so...
  if (!isExpectedError) {
    logger.log(error);
    console.log('Logging an error', error);
    toast.error('Sorry, unexpected error occured');
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
