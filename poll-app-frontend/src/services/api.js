import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export const fetchQuestions = () => api.get('/questions');
export const submitAnswers = (data) => api.post('/submit', data);
export const getResult = (email) => api.get(`/result/${email}`);
export const getAllResults = () => api.get('/results');

export default api;
