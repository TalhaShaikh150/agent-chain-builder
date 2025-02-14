"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Switch } from "@/components/ui/switch";
import type { Engine } from "tsparticles-engine";
import {
  BrainCircuit,
  Code2,
  Database,
  Globe,
  Layers,
  Shield,
  Terminal,
  ChevronDown,
  Zap,
  Cpu,
  FileText,
  ArrowRight,
  BarChart,
  CloudLightning,
  Command,
  Server,
  Github,
  Linkedin,
  Twitter
} from "lucide-react";

const Home = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Data arrays
  const stats = [
    { icon: <Zap size={24} />, value: "100K+", label: "Active Agents" },
    { icon: <CloudLightning size={24} />, value: "1.2M", label: "Daily Operations" },
    { icon: <Command size={24} />, value: "50+", label: "Integrations" },
    { icon: <Server size={24} />, value: "99.9%", label: "Uptime" },
  ];

  const features = [
    { icon: <Code2 size={24} />, title: "Multi-Agent Workflows", description: "Orchestrate complex tasks across multiple AI agents with seamless communication" },
    { icon: <Layers size={24} />, title: "Layer Composition", description: "Stack models vertically for enhanced problem-solving capabilities" },
    { icon: <Terminal size={24} />, title: "Code Generation", description: "Production-ready code output in 15+ programming languages" },
    { icon: <Database size={24} />, title: "Data Analysis", description: "Real-time processing of structured and unstructured datasets" },
    { icon: <BarChart size={24} />, title: "Analytics Dashboard", description: "Monitor agent performance and workflow metrics" },
    { icon: <Shield size={24} />, title: "Enterprise Security", description: "End-to-end encryption and SOC2 compliance" },
  ];

  const useCases = [
    { title: "Automated Research Assistant", description: "Combine web scraping, data analysis, and report generation" },
    { title: "Smart Customer Support", description: "Multi-layer ticket resolution with human escalation" },
    { title: "AI-Powered Development", description: "From spec to deployment in one workflow" },
    { title: "Real-time Market Analysis", description: "Process financial data streams with millisecond latency" },
  ];

  const models = [
    { name: "GPT-4", icon: <BrainCircuit size={32} />, capabilities: ["Advanced reasoning", "Long-form content", "Multilingual support"] },
    { name: "Claude-3", icon: <Globe size={32} />, capabilities: ["Document analysis", "Legal compliance", "Risk assessment"] },
    { name: "Llama-3", icon: <Cpu size={32} />, capabilities: ["On-device processing", "Low-latency", "Privacy-focused"] },
    { name: "Gemini", icon: <Layers size={32} />, capabilities: ["Multimodal processing", "Creative tasks", "Visual analysis"] },
  ];

  const faqs = [
    { question: "How does agent composition work?", answer: "Our visual workflow builder allows drag-and-drop agent chaining with real-time validation." },
    { question: "What about data privacy?", answer: "All data is encrypted in transit and at rest. We never share or sell your data." },
    { question: "Can I use custom models?", answer: "Yes, integrate any ONNX or PyTorch model through our API endpoints." },
    { question: "What support is available?", answer: "24/7 enterprise support with SLAs starting at 99.9% uptime." },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className={`relative ${darkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"} min-h-screen overflow-hidden transition-colors duration-300`}>
      
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: darkMode ? "#000" : "#f8f9fa" },
          particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            color: { value: darkMode ? "#ffffff" : "#3b82f6" },
            opacity: { value: 0.6 },
            size: { value: 3 },
            move: { enable: true, speed: 0.5 },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Header */}
      <header className={`relative z-10 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-b py-4 px-6 flex items-center justify-between transition-colors duration-300`}>
        <h1 className="text-xl font-bold flex items-center gap-2 hover:text-blue-500 transition-colors">
          <Command className="text-blue-500" /> AI Agent Builder
        </h1>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {["Features", "Documentation", "Pricing", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => router.push(`/${item.toLowerCase()}`)}
              className="hover:text-blue-500 transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Dark Mode</span>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className={`text-5xl md:text-6xl font-bold ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              Build Smarter AI Systems
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto">
              Orchestrate intelligent agent workflows with enterprise-grade security
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => router.push("/signup")}
              >
                Start Building Free
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mt-24">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-900 hover:bg-gray-800" : "bg-white hover:bg-gray-50"
                } shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 hover:scale-105 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="space-y-16">
            <h2 className="text-3xl font-bold text-center">Enterprise-Grade Agent Infrastructure</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-900 hover:bg-gray-800" : "bg-white hover:bg-gray-50"
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600 hover:rotate-6 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Model Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-center">Supported AI Architectures</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {models.map((model, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-900 hover:bg-gray-800" : "bg-white hover:bg-gray-50"
                  } shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-blue-100 text-blue-600 hover:scale-110 transition-transform duration-300">
                      {model.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                    <ul className="space-y-2 text-gray-500">
                      {model.capabilities.map((capability, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-900 hover:bg-gray-800" : "bg-white hover:bg-gray-50"
                  } shadow-lg transition-all duration-300 cursor-pointer`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-300 ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openFaqIndex === index && (
                    <p className="mt-4 text-gray-500 transition-all duration-300">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={`relative z-30 ${darkMode ? "bg-gray-900" : "bg-gray-100"} mt-24 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Command className="text-blue-500" />
                <span className="font-bold text-lg">AI Agent Builder</span>
              </div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Empowering intelligent automation
              </p>
              <div className="flex gap-4">
                <Github className={`${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                } cursor-pointer transition-colors duration-300`} />
                <Twitter className={`${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                } cursor-pointer transition-colors duration-300`} />
                <Linkedin className={`${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                } cursor-pointer transition-colors duration-300`} />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {['Features', 'Pricing', 'Documentation', 'Status'].map((item) => (
                  <li key={item} className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item} className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {['Privacy', 'Terms', 'Security', 'GDPR'].map((item) => (
                  <li key={item} className="hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`border-t ${
            darkMode ? "border-gray-800" : "border-gray-200"
          } mt-8 pt-8 text-center`}>
            <p className={`${
              darkMode ? "text-gray-400" : "text-gray-600"
            } text-sm`}>
              © 2024 AI Agent Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;