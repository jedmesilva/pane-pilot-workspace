
import React, { useState } from 'react';

export default function ChatView() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Como posso ajudar você hoje?', sender: 'ai' },
    { id: 2, text: 'Preciso de ajuda com meu projeto React', sender: 'user' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, 
      { id: Date.now(), text: newMessage, sender: 'user' },
      { id: Date.now() + 1, text: 'Entendi! Vou ajudar você com o React. Qual é a dúvida específica?', sender: 'ai' }
    ]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold text-purple-400 mb-4">Chat com IA</h3>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`p-3 rounded-lg ${
            msg.sender === 'ai' ? 'bg-blue-900/50 text-blue-100' : 'bg-gray-800 text-gray-100'
          }`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
