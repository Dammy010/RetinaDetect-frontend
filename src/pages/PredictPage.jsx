import { useState } from 'react';
import axios from '../utils/axios';
import { Loader2, UploadCloud, Trash2, Download } from 'lucide-react';

export default function PredictPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setResult(null);
    setImageURL(null);
    setError('');

    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should be under 5MB');
        setFile(null);
        setPreview(null);
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post('/api/predict', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(res.data.result);
      setImageURL(res.data.image);
    } catch (err) {
      setError('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setImageURL(null);
    setError('');
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([`RetinaDetect Result:\n\n${result}`], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'retina_result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-24">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          Upload Retinal Image
        </h2>

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label htmlFor="image-upload" className="block mb-2 text-sm font-semibold text-gray-700">
              Choose an Image (Max 5MB)
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            {file && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-64 rounded-lg border border-gray-200 shadow-md"
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Analyzing...
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2" size={20} />
                  Predict
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center w-full bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 rounded-lg transition duration-200"
            >
              <Trash2 className="mr-2" size={20} />
              Clear All
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-sm text-center text-red-600">{error}</p>
        )}

        {result && (
          <div className="mt-10 text-center">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              🧠 Result: <span className="text-blue-700">{result}</span>
            </p>

            <button
              onClick={handleDownload}
              className="inline-flex items-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-4 py-2 rounded-lg transition mb-6"
            >
              <Download className="mr-2" size={18} />
              Download Result
            </button>

            {imageURL && (
              <img
                src={imageURL}
                alt="Analyzed Retina"
                className="mx-auto max-w-full rounded-lg shadow-lg border border-gray-300"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
