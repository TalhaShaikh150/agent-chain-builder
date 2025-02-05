"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";

const Home = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

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
            number: { value: 200, density: { enable: true, area: 800 } },
            color: { value: darkMode ? "#ffffff" : "#3b82f6" },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: { enable: true, minimumValue: 0.5 } },
            size: { value: 4, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 1, direction: "none", random: false },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
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
          darkMode ? "bg-gray-900" : "bg-white"
        } shadow-sm transition-colors duration-500 py-4 px-6 flex items-center justify-between`}
      >
        {/* Branding */}
        <h1 className="text-xl font-bold tracking-wide">AI Agent Builder</h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <button onClick={() => router.push("/")} className="hover:text-blue-500 transition">Home</button>
          <button onClick={() => router.push("/features")} className="hover:text-blue-500 transition">Features</button>
          <button onClick={() => router.push("/docs")} className="hover:text-blue-500 transition">Docs</button>
          <button onClick={() => router.push("/contact")} className="hover:text-blue-500 transition">Contact</button>
        </nav>

        {/* Dark Mode Toggle Switch */}
        <div className="flex items-center space-x-3">
          <span className="text-sm">{darkMode ? "Dark Mode" : "Light Mode"}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-5 peer-checked:after:bg-white peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-800 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center">
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
            className="mx-4 md:mx-0 text-3xl md:text-4xl text-center 2xl:text-5xl font-extrabold sm:font-bold mb-4"
          >
            Welcome to AI Agent Builder
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-base md:text-lg 2xl:text-xl mb-8 text-center mx-4 md:mx-0"
          >
            Build and interact with AI-powered agent chains.
          </motion.p>

          {/* Login & Sign Up Buttons */}
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