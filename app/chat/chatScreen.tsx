"use client";

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  History,
  Settings,
  Plus,
  Send,
  Edit3,
  Check,
  X,
  Heart
} from 'lucide-react';

interface Message {
  role: 'user' | 'agent' | 'system';
  content: string;
}

interface Chat {
  id: number;
  title: string;
  time: string;
  color: string;
  messages: Message[];
}

const ChatWindow: React.FC = () => {
  // -----------------------------
  // THEME STATE
  // -----------------------------
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // -----------------------------
  // CHAT HISTORY in STATE
  // -----------------------------
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [newChatTitle, setNewChatTitle] = useState<string>('');

  // -----------------------------
  // MODEL & TASK SELECTION
  // -----------------------------
  const [agents, setAgents] = useState<string[]>([
    'distilbert-base-uncased',
    'gpt2',
    'bert-base-cased'
  ]);
  const [downloadableModels, setDownloadableModels] = useState<string[]>([
    'facebook/bart-large',
    'google/t5-v1_1-base'
  ]);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string>('');

  const tasks = [
    'Summarization',
    'Question Answering',
    'Text Classification',
    'Translation'
  ];

  // -----------------------------
  // MESSAGE INPUT
  // -----------------------------
  const [messageInput, setMessageInput] = useState<string>('');

  // -----------------------------
  // FILE UPLOAD & PROGRESS
  // -----------------------------
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // -----------------------------
  // SETTINGS SCREEN STATE
  // -----------------------------
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [enableChatLogging, setEnableChatLogging] = useState<boolean>(true);

  // -----------------------------
  // DONATION MODAL STATE
  // -----------------------------
  const [showDonateModal, setShowDonateModal] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<string>('');

  // -----------------------------
  // IndexedDB HELPERS
  // -----------------------------

  /**
   * Initialize or upgrade IndexedDB to store chat data.
   */
  const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ChatDB', 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        // Create an object store to store the entire chats array under a single key
        if (!db.objectStoreNames.contains('chatsStore')) {
          const store = db.createObjectStore('chatsStore', { keyPath: 'id' });
          // Or if you want a single record, you could do:
          // const store = db.createObjectStore('chatsStore');
        }
      };

      request.onsuccess = (event: any) => {
        const db: IDBDatabase = event.target.result;
        resolve(db);
      };

      request.onerror = (event: any) => {
        reject(`DB Error: ${event.target.error}`);
      };
    });
  };

  /**
   * Save the entire chats array into IndexedDB (could be done in multiple ways).
   * Here, we'll store each chat item separately by `chat.id` in 'chatsStore'.
   */
  const saveChatsToIndexedDB = async (allChats: Chat[]) => {
    const db = await initDB();
    const tx = db.transaction('chatsStore', 'readwrite');
    const store = tx.objectStore('chatsStore');

    // Clear existing data (so we don’t get duplicates)
    const clearRequest = store.clear();
    await new Promise((resolve) => {
      clearRequest.onsuccess = () => resolve(true);
    });

    // Add each chat individually
    for (const chat of allChats) {
      store.put(chat); // Key is chat.id from keyPath
    }

    db.close();
  };

  /**
   * Load all chats from IndexedDB into state.
   */
  const loadChatsFromIndexedDB = async () => {
    const db = await initDB();
    const tx = db.transaction('chatsStore', 'readonly');
    const store = tx.objectStore('chatsStore');

    // We'll get everything in the object store.
    const request = store.getAll();
    const data: Chat[] = await new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result as Chat[]);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });

  
    db.close();

    // If there is no data in the DB yet, we can set some default or do nothing.
    if (!data || data.length === 0) {
      // Initialize with your default chats if desired:
      const defaultChats: Chat[] = [
        {
          id: 1,
          title: 'Python Code Help',
          time: 'Feb 15, 01:00 AM',
          color: 'bg-blue-500',
          messages: [
            { role: 'user', content: 'How can I read a file in Python?' },
            { role: 'agent', content: 'Use the built-in open function...' }
          ],
        },
        {
          id: 2,
          title: 'Document Analysis',
          time: 'Feb 15, 01:00 AM',
          color: 'bg-green-500',
          messages: [
            { role: 'user', content: 'Here is a PDF, please summarize.' },
            { role: 'agent', content: 'Summary: ...' }
          ],
        },
        {
          id: 3,
          title: 'Creative Story',
          time: 'Feb 15, 01:00 AM',
          color: 'bg-purple-500',
          messages: [
            { role: 'user', content: 'Write a short fantasy tale.' },
            { role: 'agent', content: 'Once upon a time...' }
          ],
        }
      ];
      setChats(defaultChats);
      setActiveChatId(defaultChats[0].id);
    } else {
      setChats(data);
      if (data.length > 0) {
        setActiveChatId(data[0].id);
      }
    }
  };

  // On mount, load from IndexedDB
  useEffect(() => {
    loadChatsFromIndexedDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever chats change, save to IndexedDB
  useEffect(() => {
    if (chats && chats.length > 0) {
      saveChatsToIndexedDB(chats);
    }
  }, [chats]);

  // -----------------------------
  // GET ACTIVE CHAT
  // -----------------------------
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // -----------------------------
  // EVENT HANDLERS
  // -----------------------------
  // Toggle Dark Mode
  const handleToggleDarkMode = (): void => {
    setIsDarkMode((prev) => !prev);
  };

  // Toggle Settings Modal
  const handleOpenSettings = (): void => setShowSettingsModal(true);
  const handleCloseSettings = (): void => setShowSettingsModal(false);

  // Select a chat
  const handleSelectChat = (chatId: number): void => setActiveChatId(chatId);

  // Start editing chat name
  const handleStartEditingChat = (chatId: number): void => {
    setEditingChatId(chatId);
    const chatToEdit = chats.find((c) => c.id === chatId);
    if (chatToEdit) {
      setNewChatTitle(chatToEdit.title);
    }
  };

  // Confirm editing chat
  const handleConfirmEditChat = (chatId: number): void => {
    setChats((prevChats) =>
      prevChats.map((c) =>
        c.id === chatId ? { ...c, title: newChatTitle } : c
      )
    );
    setEditingChatId(null);
    setNewChatTitle('');
  };

  // Cancel editing
  const handleCancelEditChat = (): void => {
    setEditingChatId(null);
    setNewChatTitle('');
  };

  // Create a new chat
  const handleNewChat = (): void => {
    // Generate a new ID that is larger than any existing ID
    const newId = chats.length ? Math.max(...chats.map((c) => c.id)) + 1 : 1;
    const newChat: Chat = {
      id: newId,
      title: `New Chat ${newId}`,
      time: new Date().toLocaleString(),
      color: 'bg-gray-500',
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChatId(newId);
  };

  // Handle sending a message (calls your backend API)
  const handleSendMessage = async (): Promise<void> => {
    if (!messageInput.trim() || !activeChat) return;

    // 1) Add the user's message to local state
    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { role: 'user' as const, content: messageInput }]
        };
      }
      return chat;
    });
    setChats(updatedChats);
    const tempUserMessage = messageInput; // store in local var
    setMessageInput('');

    // 2) Build the payload: last 4 messages + current user message
    const chatToSend = updatedChats.find((c) => c.id === activeChatId);
    if (!chatToSend) return;

    const last4 = chatToSend.messages.slice(-4); // last 4
    const payloadMessages = [...last4, { role: 'user', content: tempUserMessage }];

    // 3) Send to your API (using /api/chat as example).
    try {
      const response = await axios.post('/api/chat', {
        agent: selectedAgent,
        task: selectedTask,
        messages: payloadMessages
      });
      const agentReply = response.data?.reply || 'No response from server.';

      // 4) If chat-logging is enabled, store the agent's reply
      if (enableChatLogging) {
        setChats((prevChats) =>
          prevChats.map((chat) => {
            if (chat.id === activeChatId) {
              return {
                ...chat,
                messages: [...chat.messages, { role: 'agent', content: agentReply }]
              };
            }
            return chat;
          })
        );
      } else {
        alert(`Chat logging disabled.\nServer reply: ${agentReply}`);
      }
    } catch (error) {
      console.error('Error sending message to /api/chat:', error);
      alert('Error: Could not send message. Check console for details.');
    }
  };

  // Handle file upload (front end)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // This route should be handled by a Multer-based endpoint
      // to handle the file upload on the server side.
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      console.log('Upload complete:', response.data);

      // Optionally store a system message about the file upload
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                { role: 'system', content: `Uploaded file: ${file.name}` }
              ]
            };
          }
          return chat;
        })
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed. Check console for details.');
    }
  };

  // Trigger file input from a button
  const triggerFileSelect = (): void => {
    fileInputRef.current?.click();
  };

  // -----------------------------
  // DONATION MODAL
  // -----------------------------
  const handleOpenDonateModal = () => setShowDonateModal(true);
  const handleCloseDonateModal = () => {
    setShowDonateModal(false);
    setDonationAmount('');
  };

  const handleDonate = async () => {
    if (!donationAmount) return;

    try {
      // Example POST - replace with your real payment processing route
      const response = await axios.post('/api/donate', {
        amount: donationAmount
      });
      console.log('Donation response:', response.data);
      alert(`Thank you for donating $${donationAmount}!`);
    } catch (error) {
      console.error('Donation error:', error);
      alert('There was a problem with your donation. Please try again.');
    }

    handleCloseDonateModal();
  };

  // -----------------------------
  // SETTINGS MODAL
  // -----------------------------
  const SettingsModal = () => {
    if (!showSettingsModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 w-96 shadow-lg relative">
          <button
            onClick={handleCloseSettings}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold mb-4">Settings</h2>
          
          {/* Example Setting: Enable Chat Logging */}
          <div className="mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={enableChatLogging}
                onChange={(e) => setEnableChatLogging(e.target.checked)}
              />
              <span>Enable Chat Logging</span>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              If disabled, the agent messages are not stored in chat history.
            </p>
          </div>

          <div className="text-right mt-6">
            <button
              onClick={handleCloseSettings}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // -----------------------------
  // DONATE MODAL
  // -----------------------------
  const DonateModal = () => {
    if (!showDonateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 w-96 shadow-lg relative">
          <button
            onClick={handleCloseDonateModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold mb-4">Support Our Free AI</h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Help keep this service free by leaving a donation of any amount.
            Current monthly cost to run this service is $4,000/month. 
            Every little bit helps...
          </p>

          <div className="mb-4">
            <label className="block text-sm mb-2">Donation Amount (USD)</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
              placeholder="e.g. 5"
            />
          </div>

          <div className="text-right">
            <button
              onClick={handleDonate}
              className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    );
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className={`${isDarkMode ? 'dark' : ''} h-screen relative`}>
      <div className="flex h-full bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
        
        {/* SIDEBAR */}
        <div className="w-72 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* History Header */}
          <div className="p-4 flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700">
            <History className="w-5 h-5" />
            <span className="font-medium">Chat History</span>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
                  activeChatId === chat.id ? 'bg-gray-200 dark:bg-gray-800' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${chat.color}`} />
                    {editingChatId === chat.id ? (
                      <input
                        type="text"
                        value={newChatTitle}
                        onChange={(e) => setNewChatTitle(e.target.value)}
                        className="w-28 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none"
                      />
                    ) : (
                      <div className="font-medium">{chat.title}</div>
                    )}
                  </div>
                  {editingChatId === chat.id ? (
                    <div className="flex space-x-2">
                      <button onClick={() => handleConfirmEditChat(chat.id)}>
                        <Check className="w-4 h-4 text-green-600" />
                      </button>
                      <button onClick={handleCancelEditChat}>
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={(e) => {
                      e.stopPropagation();
                      handleStartEditingChat(chat.id);
                    }}>
                      <Edit3 className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {chat.time}
                </div>
              </div>
            ))}
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={handleNewChat}
              className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Settings Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mb-2"
              onClick={handleOpenSettings}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <div className="border-b p-4 flex justify-between items-center border-gray-200 dark:border-gray-700">
            {/* Left side: Agent + Task selection */}
            <div className="flex space-x-4">
              {/* Select or Download Agent (Model) */}
              <div className="relative">
                <select
                  className="border rounded-md px-3 py-1 bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                >
                  <option value="">Select Agent (Downloaded)</option>
                  {agents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
              </div>

              {/* Download Models */}
              <div className="relative">
                <select
                  className="border rounded-md px-3 py-1 bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                  onChange={(e) => {
                    const modelToDownload = e.target.value;
                    if (modelToDownload) {
                      // Mock “downloading”
                      alert(`Downloading model: ${modelToDownload}`);
                      setAgents((prevAgents) => [...prevAgents, modelToDownload]);
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="">Download Models</option>
                  {downloadableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Task */}
              <div className="relative">
                <select
                  className="border rounded-md px-3 py-1 bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                >
                  <option value="">Select Task</option>
                  {tasks.map((taskName) => (
                    <option key={taskName} value={taskName}>
                      {taskName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Center/Right side: Donate button + Dark mode toggle */}
            <div className="flex items-center space-x-4">
              {/* DONATE BUTTON */}
              <button
                className="flex items-center space-x-2 bg-pink-500 text-white
                px-6 py-2 rounded-md hover:bg-pink-600 transition-all duration-800 
                animate-[bounce_3s_ease-in-out_infinite]"
                onClick={handleOpenDonateModal}
              >
                <Heart className="w-5 h-5" />
                <span>Donate</span>
              </button>

              {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-2">
                <span>Dark</span>
                <button
                  onClick={handleToggleDarkMode}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    isDarkMode ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
            {activeChat?.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`
                  rounded-lg p-3 max-w-lg 
                  ${
                    msg.role === 'user'
                      ? 'bg-blue-100 text-blue-900 self-end'
                      : msg.role === 'agent'
                      ? 'bg-green-100 text-green-900 self-start'
                      : 'bg-gray-100 text-gray-800'
                  }
                `}
              >
                <strong>{msg.role.toUpperCase()}:</strong> {msg.content}
              </div>
            ))}
          </div>

          {/* INPUT AREA */}
          <div className="border-t p-4 border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Message the agent..."
                className="flex-1 border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white rounded-lg p-2"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </button>

              {/* FILE UPLOAD BUTTON */}
              <button
                onClick={triggerFileSelect}
                className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 dark:bg-gray-600 dark:text-gray-100"
              >
                Upload File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* STATUS BAR / PROGRESS */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="text-sm mt-1">{uploadProgress}%</div>
              </div>
            )}
            {uploadProgress === 100 && (
              <div className="text-sm mt-2 text-green-600">
                Upload Complete!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <SettingsModal />
      <DonateModal />
    </div>
  );
};

export default ChatWindow;
