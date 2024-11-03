import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaGhost } from 'react-icons/fa';

function App() {
  const [inputUser, setInputUser] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = 'AIzaSyCbCzeXSnEJRxx2d-sqVq-RHzGh_lQGwCM';

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  const generationConfig = {
    maxOutputTokens: 1000,
    temperature: 1,
  };

  async function handlePromptSubmit() {
    setLoading(true);
    setResponse('');
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
      const result = await chatSession.sendMessage(inputUser);
      setResponse(result.response.text);
    } catch (error) {
      console.error(error);
      setResponse('Ooops! Terjadi kesalahan. Coba lagi, kalau berani!');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setInputUser('');
    setResponse('');
  }

  return (
    <div className="container mt-5 halloween-theme">
      <h1 className="text-center mb-4 halloween-title">
        <FaGhost className="ghost-icon" /> Gemini AI Halloween Chat
      </h1>
      <div className="card shadow-lg p-5 custom-card halloween-card mb-5">
        <div className="form-group mb-4">
          <label htmlFor="userInput" className="form-label halloween-label">
            Masukkan pertanyaan seram Anda:
          </label>
          <input
            type="text"
            id="userInput"
            className="form-control custom-input halloween-input"
            placeholder="Contoh: Ceritakan kisah horor..."
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handlePromptSubmit}
            type="button"
            className="btn btn-warning w-25 me-2 halloween-submit"
            disabled={loading || !inputUser.trim()}
          >
            {loading ? 'Memanggil Hantu...' : 'Kirim'}
          </button>
          <button
            onClick={handleReset}
            type="button"
            className="btn btn-dark w-25 halloween-reset"
            disabled={!inputUser && !response}
          >
            Reset
          </button>
        </div>
        {loading && (
          <div className="loading-spinner mt-4 text-center">
            <div className="custom-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {response && (
          <div className="mt-5">
            <h5 className="response-title halloween-response-title">Respons dari Dunia Lain:</h5>
            <div className="response-text halloween-response">{response}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
