import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/weather')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const parsed = JSON.parse(data.body);
        setMessage(parsed.message);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setMessage('Error: ' + err.message);
      });
  }, []);

  return (
    <div className="text-xl font-semibold">
      {message}
    </div>
  );
}

export default App;

