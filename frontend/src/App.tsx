import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8080/api/test')
      .then(response => response.text())
      .then(data => setBackendMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Heritage Drive</h1>
        <p>Professional Driver Service</p>
        {backendMessage && (
          <p>Backend Connection Test: {backendMessage}</p>
        )}
      </header>
    </div>
  );
}

export default App;
