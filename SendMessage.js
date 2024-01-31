import React, { useState } from 'react';
import { useStorageUpload } from "@thirdweb-dev/react"; // Import useStorageUpload hook instead of useStorage

function SendMessage({ onSend }) {
  const [message, setMessage] = useState('');
  const { mutateAsync: upload } = useStorageUpload(); // Destructure and use mutateAsync for the upload function

  const handleUpload = async () => {
    if (!message.trim()) return; // Check if the message is not just empty spaces
    
    try {
      // Upload the message as text/plain type to IPFS
      const formData = new FormData();
      formData.append('file', new Blob([message], { type: 'text/plain' }));

      const uris = await upload(formData); // Use the upload function with FormData
      
      // Call onSend with the uploaded URI to add it to the messages list
      if (uris.length > 0) {
        onSend(uris[0]); // Send the first URI back up to be added to messages
      }

      // Clear the input field
      setMessage('');
    } catch (error) {
      console.error("Failed to upload message to IPFS:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpload(); // Trigger the upload when the form is submitted
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default SendMessage;
