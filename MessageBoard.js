import React, { useEffect, useRef } from 'react';
import { MediaRenderer } from "@thirdweb-dev/react"; // Import MediaRenderer from Thirdweb

function MessageBoard({ messages }) {
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the message board
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom every time messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper function to determine if a message is an IPFS link
  const isIpfsLink = (message) => {
    return typeof message === 'string' && message.startsWith('ipfs://');
  };

  return (
    <div className="message-board">
      {messages.map((message, index) => (
        <div key={index} className="message">
          {/* Use MediaRenderer for IPFS links, otherwise display message text */}
          {isIpfsLink(message) ? (
            <MediaRenderer src={message} /> // Render IPFS content using MediaRenderer
          ) : (
            // Check if message is an object with a 'text' property or just a string
            typeof message === 'object' && message.text ? message.text : message
          )}
        </div>
      ))}
      {/* Invisible element at the bottom for auto-scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageBoard;
