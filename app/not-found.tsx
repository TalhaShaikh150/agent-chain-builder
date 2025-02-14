"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";

const NotFoundPage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div
      className={`relative ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      } h-screen overflow-hidden flex items-center justify-center transition-colors duration-500`}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: darkMode ? "#000" : "#f8f9fa" },
          particles: {
            number: { value: 180, density: { enable: true, area: 800 } },
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

      {/* 404 Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl mt-4"
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        {/* Button to Go Home */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Back To Home
        </motion.button>

        {/* Dark Mode Toggle */}
        <div className="mt-8 flex items-center space-x-3">
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
      </motion.div>
    </div>
  );
};

export default NotFoundPage;