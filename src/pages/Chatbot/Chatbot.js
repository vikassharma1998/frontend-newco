import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Upload } from 'antd';
import { SendOutlined, UploadOutlined } from '@ant-design/icons';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [botReplyLoading, setBotReplyLoading] = useState(false);
  
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll up the old messages whenever a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage || uploading) {
      const userMessage = { text: inputMessage, sender: 'user' };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInputMessage('');
      setBotReplyLoading(true);

      setTimeout(() => {
        const botReply = { text: 'Hello! I am a chatbot.', sender: 'bot' };
        setMessages([...newMessages, botReply]);
        setBotReplyLoading(false);
      }, 1000); // Delay bot reply for 1 second
    }
  };

  const handleFileUpload = (info) => {
    const { file } = info;
    setUploading(true);

    // Simulate file upload
    setTimeout(() => {
      setUploading(false);
      const userFileMessage = { text: file.name, sender: 'user' };
      const newMessages = [...messages, userFileMessage];
      setMessages(newMessages);

      setTimeout(() => {
        const botReply = { text: 'Hello! I am a chatbot.', sender: 'bot' };
        setMessages([...newMessages, botReply]);
      }, 1000); // Delay bot reply for 1 second after file upload
    }, 2000); // Simulate 2 seconds of uploading time
  };

  return (
    <div className='chat-setup'>
      <h3>Doc-Ai Chatbot</h3>
      <div className='input-box-setup' ref={chatContainerRef}>
        <List
          dataSource={messages}
          renderItem={(message) => {
            const messageStyle = {
              textAlign: message.sender === 'user' ? 'right' : 'left',
              backgroundColor: message.sender === 'user' ? '#e6f7ff' : '#f0f0f0',
              padding: '8px',
              borderRadius: '8px',
              margin: '8px 0',
            };
            return <div style={messageStyle}>{message.text}</div>;
          }}
        />
      </div>
      <div className='field-set'>
        <Input
          className='user-input-field'
          value={inputMessage}
          onChange={handleInputChange}
          placeholder='Type your message...'
        />
        <Upload
          className='user-upload-field'
          customRequest={handleFileUpload}
          showUploadList={false}
          accept='.doc,.docx,.pdf,.txt'
        >
          <Button icon={<UploadOutlined style={{ fontSize: '30px' }} />} loading={uploading} />
        </Upload>
        <div className='user-send-button'>
          <Button
            icon={<SendOutlined style={{ fontSize: '30px', border: 'none' }} />}
            loading={botReplyLoading}
            onClick={handleSendMessage}
          />
        </div>
      </div>
      <p className='power-by'>This chatbot is powered by NewCo</p>
    </div>
  );
};

export default Chatbot;
