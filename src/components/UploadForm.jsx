import { useState } from 'react';
import axios from '../utils/axios'; // Make sure this points to your axios config

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result; // includes the data URI

      try {
        const res = await axios.post(
          '/api/predict',
          { image: base64Image },
          { withCredentials: true }
        );

        setResult(res.data.result);
        setImageURL(res.data.image); // should be same as base64 string
      } catch (err) {
        console.error('Prediction failed:', err);
        const serverMsg = err?.response?.data?.message;
        setError(serverMsg || 'Prediction failed. Try again.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        required
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={!file || loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Predict'}
      </button>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">Result: {result}</p>
          {imageURL && (
            <img
              src={imageURL}
              alt="Retina"
              className="mt-4 max-w-full rounded shadow"
            />
          )}
        </div>
      )}
    </form>
  );
}
