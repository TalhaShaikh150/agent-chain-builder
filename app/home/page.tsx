"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, FileText, Cpu, Paintbrush, Database, Send, Upload, Settings, Maximize2, Minimize2, Check, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const agents = [
  { id: "gpt-4", name: "GPT-4", icon: BrainCircuit, description: "Advanced AI model for reasoning and text generation." },
  { id: "claude-3", name: "Claude-3", icon: FileText, description: "Specializes in document analysis and deep insights." },
  { id: "llama-3", name: "LLaMA-3", icon: Cpu, description: "Lightweight and efficient for on-device AI tasks." },
  { id: "gemini", name: "Gemini", icon: Paintbrush, description: "Designed for creative and multimodal tasks." },
  { id: "mistral", name: "Mistral", icon: Database, description: "Optimized for structured data processing." }
];

const tasks = [
  "Code Generation",
  "Text Analysis",
  "Document Processing",
  "Mathematical Calculations",
  "Creative Writing",
  "Image Generation"
];

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  type: "text" | "code" | "file" | "error";
  language?: string;
  fileType?: string;
  size?: number;
}

const HomePage = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "System initialized. Select an agent and task to begin.",
      type: "text",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleProceed = () => {
    if (selectedAgent && selectedTask) {
      router.push(`/dashboard?agent=${selectedAgent}&task=${selectedTask}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input, type: "text" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          type: "text",
          content: "This is a simulated response from the selected AI agent.",
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const MessageContent = ({ message }: { message: Message }) => (
    <div className="whitespace-pre-wrap">{message.content}</div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <div className="p-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            AI Agent Platform
          </motion.h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <span>Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agent Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Select Agent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedAgent === agent.id
                          ? "border-blue-500 bg-blue-50"
                          : darkMode
                          ? "border-gray-700 bg-gray-800  text-white"
                          : "border-gray-200 bg-white "
                      }`}
                      onClick={() => setSelectedAgent(agent.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${
                            darkMode ? "bg-gray-700" : "bg-gray-100"
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              selectedAgent === agent.id ? "text-blue-500" : ""
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{agent.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {agent.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Task Selection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Select Task</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {tasks.map((task) => (
                  <motion.button
                    key={task}
                    whileHover={{ scale: 1.05 }}
                    className={`p-2 rounded-md text-sm transition-colors ${
                      selectedTask === task
                        ? "bg-blue-500 text-white"
                        : darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedTask(task)}
                  >
                    {task}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-xl shadow-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Agent Interaction</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleProceed}
                  disabled={!selectedAgent || !selectedTask}
                >
                  Activate
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : darkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                      }`}
                    >
                      <MessageContent message={message} />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="animate-pulse">...</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2 items-center">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message the agent..."
                    className="resize-none"
                    rows={1}
                  />
                  <Button className="active:bg-blue-500 active:text-white " type="submit" size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;