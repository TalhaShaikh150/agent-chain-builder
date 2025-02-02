"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Lightweight particles engine
import { Engine } from "tsparticles-engine";

const Home = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Initialize Particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div
      className={`relative ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      } h-screen overflow-hidden transition-colors duration-500`}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: darkMode ? "#000" : "#f8f9fa" },
          particles: {
            number: { value: 180, density: { enable: true, area: 800 } },
            color: { value: darkMode ? "#ffffff" : "#3b82f6" }, // White stars in dark mode, blue in light mode
            shape: { type: "circle" }, 
            opacity: { value: 0.8, random: { enable: true, minimumValue: 0.5 } },
            size: { value: 4, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 1, direction: "none", random: false },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } }, // Stars move away on hover
            modes: { repulse: { distance: 100 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative z-10 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } shadow-sm transition-colors duration-500`}
      >
        <div className="max-w-7xl 2xl:max-w-[100rem] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Agent Chain Builder</h1>
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center">
        {/* Main Content with fade-in animation */}
        <motion.main
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mt-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl 2xl:text-5xl font-bold mb-4 transition-colors duration-500"
          >
            Welcome to AI Agent Builder
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg 2xl:text-xl mb-8 transition-colors duration-500"
          >
            Build and interact with AI-powered agent chains.
          </motion.p>

          {/* Login & Sign Up Buttons with hover effects */}
          <div className="flex gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => router.push("/login")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-all"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/signup")}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg hover:bg-gray-300 transition"
            >
              Sign Up
            </motion.button>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Home;
