import React, { useState } from 'react';
import './App.css';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import MessageBoard from './components/MessageBoard';
import SendMessage from './components/SendMessage';
import logo from './appLogo.png';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (msg) => {
    try {
      const response = await fetch("https://api.thirdweb.com/ipfs/QmaUPHDnyZbZ991Vq5SoWDTV72kp511ighGQpTabX579sL", { // This URL needs verification
        method: 'POST', // Confirm the method with ThirdWeb documentation
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_THIRDWEB_API_KEY}`, // Ensure this variable is correctly set in your .env
        },
        body: JSON.stringify({ message: msg }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const newMessage = await response.json();
      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThirdwebProvider clientId="REACT_APP_THIRDWEB_CLIENT_ID" activeChain="pulsechain">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="message-container">
            <MessageBoard messages={messages} />
            <SendMessage onSend={handleSend} />
          </div>
        </header>
      </div>
    </ThirdwebProvider>
  );
}

export default App;
