"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Upload,
  Settings,
  Maximize2,
  Minimize2,
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  History,
  Search,
  Plus,
  Clock,
  Loader2,
  BrainCircuit,
  FileText,
  Cpu,
  Paintbrush,
  Database
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  type: "text" | "code" | "file" | "error";
  language?: string;
  fileType?: string;
  size?: number;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  agent: string;
}

const agents: Agent[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    icon: BrainCircuit,
    description: "Advanced AI model for reasoning and text generation.",
    color: "bg-blue-500",
  },
  {
    id: "claude-3",
    name: "Claude-3",
    icon: FileText,
    description: "Specializes in document analysis and deep insights.",
    color: "bg-emerald-500",
  },
  {
    id: "llama-3",
    name: "LLaMA-3",
    icon: Cpu,
    description: "Lightweight and efficient for on-device AI tasks.",
    color: "bg-orange-500",
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: Paintbrush,
    description: "Designed for creative and multimodal tasks.",
    color: "bg-purple-500",
  },
  {
    id: "mistral",
    name: "Mistral",
    icon: Database,
    description: "Optimized for structured data processing.",
    color: "bg-rose-500",
  },
];

const tasks = [
  "Code Generation",
  "Text Analysis",
  "Document Processing",
  "Mathematical Calculations",
  "Creative Writing",
  "Image Generation",
] as const;

const dummyChats: ChatSession[] = [
  { id: "1", title: "Python Code Help", timestamp: new Date(), agent: "gpt-4" },
  { id: "2", title: "Document Analysis", timestamp: new Date(), agent: "claude-3" },
  { id: "3", title: "Creative Story", timestamp: new Date(), agent: "gemini" },
];

const MessageContent: React.FC<{ message: Message }> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  switch (message.type) {
    case "code":
      return (
        <div className="relative bg-gray-900 rounded-md p-4">
          <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
            <span>{message.language}</span>
            <button onClick={() => copyToClipboard(message.content)} className="opacity-100">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <pre className="text-gray-100 overflow-x-auto">
            <code>{message.content}</code>
          </pre>
        </div>
      );

    case "file":
      return (
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
          <Upload size={20} />
          <span>{message.content}</span>
          {message.size && (
            <span className="text-sm text-gray-500">({Math.round(message.size / 1024)}KB)</span>
          )}
        </div>
      );

    case "error":
      return (
        <Alert variant="destructive">
          <AlertDescription>{message.content}</AlertDescription>
        </Alert>
      );

    default:
      return <div className="whitespace-pre-wrap">{message.content}</div>;
  }
};

const HomePage = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 1000,
    streamResponse: true,
  });
  const [showHistory, setShowHistory] = useState(true);
  const [chatHistory] = useState<ChatSession[]>(dummyChats);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedAgent) return;

    const newMessage: Message = {
      role: "user",
      content: input,
      type: "text"
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const agent = agents.find(a => a.id === selectedAgent);
      const response: Message = {
        role: "assistant",
        type: "text",
        content: agent 
          ? `${agent.name} Response: ${input} (simulated)`
          : "This is a simulated response"
      };

      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          type: "file",
          content: file.name,
          fileType: file.type,
          size: file.size,
        } as Message
      ]);
    });
  };

  const getAgentColor = (agentId: string) => {
    return agents.find(a => a.id === agentId)?.color || "bg-gray-500";
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Collapsible Sidebar */}
      <div className={`transition-all duration-300 ${showHistory ? "w-64" : "w-0"}`}>
        {showHistory && (
          <div className={`h-screen border-r ${darkMode ? "border-gray-700 text-white" : "border-gray-200"} p-4 flex flex-col`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <History size={20} />
                Chat History
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(false)}
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <ChevronLeft size={16} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${getAgentColor(chat.agent)}`} />
                  <div className="flex-1">
                    <p className="font-medium">{chat.title}</p>
                    <p className="text-xs text-gray-500">
                      {chat.timestamp.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white">
              <Plus size={16} className="mr-2" />
              New Chat
            </Button>

            <div className="border-t pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Settings size={16} />
                Settings
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {!showHistory && (
          <Button
            variant="ghost"
            onClick={() => setShowHistory(true)}
            className="absolute left-2 top-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronRight size={16} />
          </Button>
        )}

        <div className={`p-4 border-b ${darkMode ? "border-gray-700 text-white" : "border-gray-200"} flex items-center gap-4`}>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Agent">
                {selectedAgent && (
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${agents.find(a => a.id === selectedAgent)?.color}`} />
                    <span>{agents.find(a => a.id === selectedAgent)?.name}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${agent.color}`} />
                    <agent.icon size={16} className="text-gray-600 dark:text-gray-300" />
                    {agent.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((task) => (
                <SelectItem key={task} value={task}>
                  {task}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2 ml-auto">
            <span>Dark</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              const agentColor = !isUser && selectedAgent 
                ? agents.find(a => a.id === selectedAgent)?.color 
                : "bg-blue-500";

              return (
                <div
                  key={index}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      isUser 
                        ? "bg-blue-500 text-white" 
                        : `${agentColor} ${darkMode ? "text-white" : "text-gray-900"}`
                    }`}
                  >
                    <MessageContent message={message} />
                    {!isUser && (
                      <div className="text-xs mt-1 opacity-70 flex items-center gap-1">
                        <span>{selectedAgent}</span>
                        <Clock size={12} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={16} />
                </Button>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message the agent..."
                  className="resize-none flex-1"
                  rows={1}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HomePage;