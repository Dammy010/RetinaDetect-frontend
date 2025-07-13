import axios from './axios';

export const getPredictionHistory = async () => {
  const res = await axios.get('/api/predict/history');
  return res.data;
};

export const deletePrediction = async (id) => {
  const res = await axios.delete(`/api/predict/${id}`);
  return res.data;
};
