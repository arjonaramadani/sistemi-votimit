import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [pollState, setPollState] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Po lidhet...');
  const ws = useRef(null);

  useEffect(() => {
    // ws.current = new WebSocket('ws://localhost:8080');
    ws.current = new WebSocket('wss://votimi-server.onrender.com');


    ws.current.onopen = () => {
      console.log('Lidhur me serverin WebSocket');
      setConnectionStatus('Lidhur');
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Të dhëna të marra:', data);
        setPollState(data);
      } catch (error) {
        console.error("Gabim gjatë analizimit të të dhënave:", error);
      }
    };

    ws.current.onclose = () => {
      console.log('Shkëputur nga serveri WebSocket');
      setConnectionStatus('Shkëputur. Provoni të rifreskoni faqen.');
    };

    ws.current.onerror = (error) => {
      console.error('Gabim në WebSocket:', error);
      setConnectionStatus('Gabim në lidhje');
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleVote = (option) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const voteMessage = JSON.stringify({ vote: option });
      ws.current.send(voteMessage);
    } else {
      console.log("Lidhja WebSocket nuk është e hapur.");
    }
  };

  const handleReset = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const resetMessage = JSON.stringify({ action: 'reset' });
      ws.current.send(resetMessage);
    } else {
      console.log("Lidhja WebSocket nuk është e hapur.");
    }
  };

  const getTotalVotes = () => {
    if (!pollState) return 0;
    return Object.values(pollState).reduce((sum, count) => sum + count, 0);
  };

  const totalVotes = getTotalVotes();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistem Votimi në Kohë Reale</h1>
        <p className="status">Statusi i Lidhjes: {connectionStatus}</p>
      </header>
      <main className="main-content">
        <div className="poll-container">
          <h2>Cili është opsioni juaj i preferuar?</h2>
          <div className="options">
            {pollState && Object.keys(pollState).map(option => (
              <button key={option} onClick={() => handleVote(option)}>
                Voto për {option}
              </button>
            ))}
          </div>
        </div>
        <div className="results-container">
          <h2>Rezultatet</h2>
          
          <div className="reset-container">
            <button className="reset-button" onClick={handleReset} aria-label="Reset">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
              </svg>
            </button>
            <span className="tooltip-text">Reset</span>
          </div>

          {pollState ? (
            <div className="results">
              {Object.entries(pollState).map(([option, votes]) => {
                const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
                return (
                  <div key={option} className="result-item">
                    <div className="result-info">
                      <span className="option-name">{option}</span>
                      <span className="vote-count">
                        {votes} {votes === 1 ? 'votë' : 'vota'} ({percentage}%)
                      </span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              <hr />
              <div className="total-votes">
                <strong>Total Vota: {totalVotes}</strong>
              </div>
            </div>
          ) : (
            <p>Në pritje të të dhënave nga serveri...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
