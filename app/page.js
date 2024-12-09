'use client'
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paragraph: inputText }),
      });
      const data = await response.json();
      setGeneratedText(data.generatedParagraph);
      setIsModalOpen(true);
    } catch (error) {
      setGeneratedText('Failed to generate text. Please try again.');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText).then(() => {
      alert('Text copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Enter Your Paragraph
        </h1>
        <div className="mb-4">
          <label
            htmlFor="textarea"
            className="block text-sm font-medium text-gray-700"
          >
            Your Text
          </label>
          <textarea
            id="textarea"
            rows="6"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full mt-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
            placeholder="Type your paragraph here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
        >
          Submit
        </button>
      </form>

      {/* Modal Box */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Generated Paragraph
            </h2>
            <p className="text-gray-700 mb-6">{generatedText}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}
