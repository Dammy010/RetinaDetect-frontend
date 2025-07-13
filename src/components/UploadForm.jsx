import { useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/api/predict', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(res.data.result);
      setImageURL(res.data.image);
    } catch (err) {
      console.error('Prediction failed:', err);
    } finally {
      setLoading(false);
    }
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

      {result && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">Result: {result}</p>
          {imageURL && <img src={imageURL} alt="Uploaded Retina" className="mt-4 max-w-full rounded shadow" />}
        </div>
      )}
    </form>
  );
}
