import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import GitHubRepos from './components/GitHubRepos';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import DarkModeToggle from './components/DarkModeToggle';
import ParticleBackground from './components/ParticleBackground';
import ScrollIndicator from './components/ScrollIndicator';
import RetroRacerModal from './components/RetroRacerModal';

function App() {
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar onOpenArcade={() => setIsArcadeOpen(true)} />
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onOpenArcade={() => setIsArcadeOpen(true)} />
              <About />
              <Projects />
              <GitHubRepos />
              <Skills />
              <Experience />
              <Contact />
            </motion.div>
          } />
        </Routes>
        <Footer />
        <Chatbot />
        <DarkModeToggle />
        <ParticleBackground />
        <ScrollIndicator />
        <RetroRacerModal
          isOpen={isArcadeOpen}
          onClose={() => setIsArcadeOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
