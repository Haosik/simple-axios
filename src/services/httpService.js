import axios from 'axios';

axios.interceptors.response.use(null, error => {
  const isExpectedError = error.response && error.response.status > 399 && error.response.status < 500;

  // if 500 response or so...
  if (!isExpectedError) {
    console.log('Logging an error', error);
    alert('Sorry, error occured');
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
