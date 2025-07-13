import React, { useEffect, useState } from 'react';
import { getPredictionHistory, deletePrediction } from '../utils/predictionApi';

export default function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPredictionHistory();
      if (Array.isArray(data)) {
        setHistory(data);
      } else if (Array.isArray(data?.predictions)) {
        setHistory(data.predictions);
      } else {
        throw new Error('Invalid response format: not an array');
      }
    } catch (err) {
      console.error('❌ Failed to fetch prediction history:', err);
      const serverMsg = err?.response?.data?.message;
      setError(serverMsg || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this prediction?')) return;
    try {
      await deletePrediction(id);
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('❌ Delete failed:', err);
      alert('Failed to delete prediction. Try again.');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid border-4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="bg-red-100 text-red-700 p-4 rounded shadow max-w-md text-center mb-4">
          <p className="font-semibold text-lg mb-1">Error</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={fetchHistory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Prediction History</h1>

      {history.length === 0 ? (
        <p className="text-gray-600">No predictions yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li
              key={item._id}
              className="border rounded p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p>
                    <span className="font-semibold">Prediction:</span>{' '}
                    {item?.result || 'Unknown'}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{' '}
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
