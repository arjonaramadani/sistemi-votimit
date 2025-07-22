import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [pollState, setPollState] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Po lidhet...');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

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
          {pollState ? (
            <div className="results">
              {Object.entries(pollState).map(([option, votes]) => {
                const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
                return (
                  <div key={option} className="result-item">
                    <div className="result-info">
                      <span className="option-name">{option}</span>
                      <span className="vote-count">{votes} vota ({percentage}%)</span>
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
