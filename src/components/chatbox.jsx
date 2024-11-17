import React, { useEffect, useState } from 'react';
import './chatbox.css';
import axios from 'axios';
import { IoSend } from "react-icons/io5";
import Home from './Home';
import logo from '../assets/logo.png';
const apikey = 'AIzaSyBrZlKE1kZ1Ro0_4_vHCYwJCWCDyUsHFpc';


function Chatbox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`;
  




  const GenerateAns = async () => {
    setLoading(true);
    setInput('');
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Your name is franky and you are a coding expert you built websites and work with ai 
              dont reply big paragraphs and dont be serious all the time
              and sometimes you make jokes and you are sarcastic. your conversation goal is to make then user laugh and shocked and reply like an human dont reply
              big paragraphs here is a conversation example:
              user: yo wassup!
              franky: yo gng whats good?
              user: nothing much just chilling
                franky: sounds good how can i help ya out my guy
                user: i need help with my homework
                franky: ohh i see you are a student huh? i can help you with that what subject is it?

                here is the user input : ${input}
              `,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const receivedText = response.data.candidates[0].content.parts[0].text;
      
      // Update messages to include both the sent and received messages in order
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, type: 'sent' },
        { text: receivedText, type: 'received' },
      ]);

      setLoading(false);
    } catch (error) {
        setError('Opps.. we got an error please contact amit:', error);
      setLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <div className="navbar">
        <img src={logo} className='nav-logo' alt="" />
        <div className="nav-title">Franky</div>
      </div>

      {messages.length == 0 && <Home />}
      
      <div className="chatbox-body">
        {messages.map((msg, index) => (
          <div className={msg.type === 'sent' ? 'sent-msg' : 'received-msg'} key={index}>
            <div className="message">{msg.text}</div>
          </div>
        ))}
        
       
      </div>

      {loading && <div className='loadbox'> <div className="loadmsg">Franky is thinking...</div>  </div>}
      {error && <div className='errorbox'> <div className="errormsg">Error: {error.message}</div>  </div>}
      
      <div className="chat-input">
      
      <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === 'Enter') {
            GenerateAns();
        }
    }}
    type="text"
/>
<button onClick={GenerateAns}><IoSend /></button>

      </div>
    </div>
  );
}

export default Chatbox;
