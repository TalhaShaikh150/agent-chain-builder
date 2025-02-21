"use client";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Settings,
  Box,
  AlertCircle,
  Monitor,
  Briefcase,
  Stethoscope,
  Cpu,
  Database,
  Plus,
  Network,
  CircuitBoard,
  Rocket,
  Zap,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const HomePage = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const stats = [
    { label: "Active Agents", value: "100K+", icon: <Zap size={20} /> },
    { label: "Daily Operations", value: "1.2M", icon: <CircuitBoard size={20} /> },
    { label: "Integrations", value: "50+", icon: <Link2 size={20} /> },
    { label: "Uptime", value: "99.9%", icon: <Database size={20} /> },
  ];

  const sections = [
    {
      title: "Active Agent Chains",
      items: ["Customer Support Flow", "Data Processing Pipeline", "E-commerce Automation"],
      icon: <Network size={20} className="text-blue-500" />,
      color: "text-blue-500",
    },
    {
      title: "Monitoring Alerts",
      items: ["Payment Gateway Latency"],
      icon: <AlertCircle size={20} className="text-red-500" />,
      color: "text-red-500",
    },
    {
      title: "Template Library",
      items: [
        "CRM Integration Template",
        "AI Chatbot Template",
        "Data Analysis Workflow",
        "Inventory Management",
        "Marketing Automation",
        "Customer Onboarding",
      ],
      icon: <Briefcase size={20} className="text-purple-500" />,
      color: "text-purple-500",
    },
    {
      title: "Recent Workflows",
      items: [
        "User Authentication Chain",
        "Order Processing System",
        "Data Encryption Pipeline",
        "API Gateway Manager",
        "Analytics Dashboard",
        "Notification System",
      ],
      icon: <CircuitBoard size={20} className="text-green-500" />,
      color: "text-green-500",
    },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      {/* Top Navigation Bar */}
      <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} flex items-center gap-4`}>
        <div className="flex items-center gap-2">
          <Rocket className="text-blue-500" size={24} />
          <h1 className="text-xl font-semibold">AgentChain Studio</h1>
        </div>

        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search workflows, agents, or templates..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
            <Settings size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-shadow`}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  {React.cloneElement(stat.icon, { className: "text-blue-500" })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Workflow Builder</h2>
          <Button className="gap-2">
            <Plus size={16} />
            New Agent Chain
          </Button>
        </div>

        {sections.map((section, index) => (
          <Card key={index} className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {section.icon}
                <CardTitle className={section.color}>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`p-4 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 "
                    } border ${
                      darkMode ? "border-gray-600" : "border-gray-200"
                    } transition-colors cursor-pointer flex items-center gap-3 group`}
                  >
                    <div className="p-2 rounded-md bg-blue-500/10">
                      {index === 0 && <Cpu size={18} className="text-blue-500" />}
                      {index === 1 && <AlertCircle size={18} className="text-red-500" />}
                      {index === 2 && <Briefcase size={18} className="text-purple-500" />}
                      {index === 3 && <CircuitBoard size={18} className="text-green-500" />}
                    </div>
                    <div>
                      <p className="font-medium">{item}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {index === 0 && "3 agents • 2 connections"}
                        {index === 1 && "High priority • Needs attention"}
                        {index === 2 && "Template • 15 components"}
                        {index === 3 && "Modified 2h ago"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        size="icon"
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default HomePage;