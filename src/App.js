import React, { useState, useEffect } from 'react';
import './App.css';

function SkillCircle({ name, percentage, color }) {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    setCurrentPercent(0);
    const timer = setTimeout(() => {
      setCurrentPercent(percentage);
    }, 50);

    return () => clearTimeout(timer);
  }, [percentage, name]);

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle 
            cx="50%" 
            cy="50%" 
            r={radius} 
            stroke="#1a2333" 
            strokeWidth="8" 
            fill="transparent" 
          />
          <circle 
            cx="50%" 
            cy="50%" 
            r={radius} 
            stroke={color} 
            strokeWidth="8" 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out'
            }}
          />
        </svg>
        <span className="absolute text-xl sm:text-2xl font-bold text-white tracking-wider">
          {percentage}%
        </span>
      </div>

      <h3 className="text-sm sm:text-base font-bold tracking-wide text-gray-400 opacity-80 group-hover:text-white group-hover:opacity-100 transition-all duration-300">
        {name}
      </h3>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState('Home');

  const words = ["React-Engineer", "Front-End Developer"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          setIsDeleting(true);
          setTypingSpeed(1800);
        } else {
          setTypingSpeed(90);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(400);
        } else {
          setTypingSpeed(40);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  const allSkills = [
    { name: "Html5", percentage: 95, color: "#f97316" },
    { name: "CSS", percentage: 90, color: "#38bdf8" },
    { name: "CSS3", percentage: 90, color: "#0ea5e9" },
    { name: "JavaScript", percentage: 85, color: "#eab308" },
    { name: "Tailwind CSS", percentage: 88, color: "#38bdf8" },
    { name: "React.js", percentage: 85, color: "#06b6d4" },
  ];

  const [skillsPage, setSkillsPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allSkills.length / itemsPerPage);

  const nextSkills = () => {
    if (skillsPage < totalPages - 1) {
      setSkillsPage((prev) => prev + 1);
    }
  };

  const prevSkills = () => {
    if (skillsPage > 0) {
      setSkillsPage((prev) => prev - 1);
    }
  };

  const visibleSkills = allSkills.slice(skillsPage * itemsPerPage, (skillsPage + 1) * itemsPerPage);

  const [activeTab, setActiveTab] = useState("1st Section");
  const projects = {
    "1st Section": [
      { id: 1, title: "Project 1", desc: "Simple Design With HTML & CSS", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=Project+1" },
      { id: 2, title: "Techno Market", desc: "Online Store HTML & CSS3 Design", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=Techno+Market" },
      { id: 3, title: "EduPlatform", desc: "Design With Bootstrap 5", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=EduPlatform" },
      { id: 4, title: "Password Generator", desc: "React & JS Tool", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=Password+Generator" },
      { id: 5, title: "Portfolio Concept", desc: "React & Tailwind CSS", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=Portfolio" },
      { id: 6, title: "E-Commerce UI", desc: "Responsive Layout", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=E-Commerce" },
    ],
    "2nd Section": [
      { id: 7, title: "Dashboard", desc: "React Admin Panel", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=Dashboard" },
      { id: 8, title: "Weather App", desc: "JavaScript API Integration", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=Weather+App" },
    ],
    "3rd Section": [
      { id: 9, title: "Task Manager", desc: "React State Management", img: "https://via.placeholder.com/400x300/121829/94a3b8?text=Task+Manager" },
    ]
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#080b11] min-h-screen text-white font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden pt-20">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#080b11]/90 border-b border-gray-800/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
            <span className="text-2xl font-bold tracking-tight text-white">Portfolio</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveNav(item)}
                className={`transition-all duration-300 py-1 ${
                  activeNav === item
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3">
              {[
                { icon: 'fa-linkedin-in', link: 'https://linkedin.com' },
                { icon: 'fa-facebook-f', link: 'https://facebook.com' },
                { icon: 'fa-instagram', link: 'https://instagram.com' },
                { icon: 'fa-github', link: 'https://github.com' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-900/80 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-transparent transition-all duration-300 shadow-sm"
                >
                  <i className={`fab ${social.icon} text-sm`}></i>
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Let's Connect
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-[88vh] flex items-center max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-gray-900/90 border border-gray-800 px-4 py-2 rounded-full text-xs font-medium text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Available for opportunities</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Hi! I'm <span className="text-white">Sara Madeeh</span>
              </h1>
              
              <div className="text-3xl sm:text-5xl font-bold h-16 flex items-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                  {currentText}
                </span>
                <span className="w-1 h-10 bg-blue-500 inline-block ml-1 animate-pulse"></span>
              </div>
            </div>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Crafting beautiful, responsive web applications with modern front-end technologies. 
              Passionate about clean code, elegant UI, and delightful user experiences.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 rounded-full text-sm transition-all duration-300 shadow-lg shadow-blue-600/30"
              >
                View My Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-12 bg-gray-900/90 hover:bg-gray-800 text-white border border-gray-700/80 font-semibold px-7 rounded-full text-sm transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center relative py-10">
            <div className="w-full max-w-[350px] bg-[#121824] border border-gray-800 rounded-2xl p-4 relative card-box-shadow flex flex-col justify-between font-mono text-xs leading-relaxed overflow-visible">
              <div className="flex items-center space-x-3 pb-2 mb-2 border-b border-gray-800/60">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                </div>
                <span className="text-[11px] text-gray-400 font-sans">Sara.jsx</span>
              </div>

              <div className="space-y-0.5 my-1">
                <div>
                  <span className="text-purple-400 font-bold">const </span>
                  <span className="text-blue-300">developer </span>
                  <span className="text-white">= &#123;</span>
                </div>

                <div className="pl-4">
                  <span className="text-gray-300">name: </span>
                  <span className="text-emerald-400">"Sara Madeeh"</span>
                  <span className="text-white">,</span>
                </div>

                <div className="pl-4">
                  <span className="text-gray-300">role: </span>
                  <span className="text-emerald-400">"Front-End Developer"</span>
                  <span className="text-white">,</span>
                </div>

                <div className="pl-4">
                  <span className="text-gray-300">stack: </span>
                  <span className="text-white">[</span>
                </div>

                <div className="pl-8 space-x-2">
                  <span className="text-emerald-400">"HTML"</span>
                  <span className="text-white">,</span>
                  <span className="text-emerald-400">"CSS"</span>
                  <span className="text-white">,</span>
                </div>

                <div className="pl-8 space-x-2">
                  <span className="text-emerald-400">"JavaScript"</span>
                  <span className="text-white">,</span>
                  <span className="text-emerald-400">"React"</span>
                  <span className="text-white">,</span>
                </div>

                <div className="pl-8">
                  <span className="text-emerald-400">"Tailwind"</span>
                </div>

                <div className="pl-4">
                  <span className="text-white">]</span>
                </div>

                <div>
                  <span className="text-white">&#125;</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-800/60 flex items-center space-x-2">
                <span className="text-gray-400">&gt;</span>
                <span className="text-blue-400 animate-pulse font-semibold">ready_to_build()</span>
                <span className="text-emerald-400 font-bold">✓</span>
              </div>

              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/40 px-2.5 py-1 rounded-xl shadow-lg animate-float-up flex items-center space-x-1.5 z-20 font-sans">
                <i className="fab fa-react text-cyan-400 text-[11px]"></i>
                <span className="text-[9px] font-semibold text-white">React JS</span>
              </div>

              <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-blue-600 to-cyan-600 border border-blue-400/40 px-2.5 py-1 rounded-xl shadow-lg animate-float-down flex items-center space-x-1.5 z-20 font-sans">
                <i className="fas fa-code text-white text-[9px]"></i>
                <span className="text-[9px] font-semibold text-white">Clean Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-[#0a0e17] border-y border-gray-800/40 relative">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2 block">
            TECHNICAL EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Front-End Skills
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-16 text-sm sm:text-base leading-relaxed">
            The front-end technologies I use to build modern, responsive web experiences.
          </p>

          <div className="relative flex items-center justify-between max-w-4xl mx-auto">
            <button 
              onClick={prevSkills} 
              disabled={skillsPage === 0}
              className={`w-9 h-9 rounded-full bg-gray-900 border border-gray-800 text-white flex items-center justify-center transition-all z-20 shadow-md ${
                skillsPage === 0 
                  ? 'opacity-30 cursor-not-allowed pointer-events-none' 
                  : 'opacity-100 hover:bg-gray-800'
              }`}
            >
              ❮
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 w-full px-1 justify-items-center">
              {visibleSkills.map((skill) => (
                <SkillCircle
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                  color={skill.color}
                />
              ))}
            </div>

            <button 
              onClick={nextSkills} 
              disabled={skillsPage === totalPages - 1}
              className={`w-9 h-9 rounded-full bg-gray-900 border border-gray-800 text-white flex items-center justify-center transition-all z-20 shadow-md ${
                skillsPage === totalPages - 1 
                  ? 'opacity-30 cursor-not-allowed pointer-events-none' 
                  : 'opacity-100 hover:bg-gray-800'
              }`}
            >
              ❯
            </button>
          </div>

          <div className="flex justify-center items-center space-x-2 mt-12">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSkillsPage(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  skillsPage === idx ? 'w-8 bg-blue-500' : 'w-2.5 bg-gray-700 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-[#080b11]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2 block">
            PORTFOLIO SHOWCASE
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">My Projects</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            My name is Sara Madeeh. These are some of my projects built with modern frontend tools.
          </p>

          <div className="flex justify-center bg-gray-900/80 max-w-lg mx-auto rounded-full p-1.5 border border-gray-800 mb-12 shadow-inner">
            {Object.keys(projects).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects[activeTab].map((project) => (
              <div key={project.id} className="relative group overflow-hidden rounded-2xl aspect-video cursor-pointer border border-gray-800/80 bg-[#121824]">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <h4 className="text-xl font-bold text-white mb-1">{project.title}</h4>
                  <p className="text-xs text-gray-300">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0a0c16] relative">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2 block">
            SAY HELLO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Get In Touch
          </h2>
          <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Open to freelance projects, internships, and full-time opportunities.<br />
            Let's build something great together.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#101426] border border-gray-800/80 p-8 rounded-3xl flex flex-col justify-between text-left shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-xl mb-6">
                👩‍💻
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Sara Madeeh</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Front-End Developer based in Egypt. I love building elegant, responsive web applications and am always open to new opportunities.
              </p>
            </div>

            <div className="space-y-4 border-t border-gray-800/60 pt-6">
              <div className="flex items-start space-x-3">
                <span className="text-pink-500 text-base mt-0.5">📍</span>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Location</span>
                  <span className="text-sm text-gray-200">Kafr El-Shaikh, Egypt</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-blue-400 text-base mt-0.5">✉️</span>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Email</span>
                  <a href="mailto:sarahmadeeh111@gmail.com" className="text-sm text-gray-200 hover:text-blue-400 transition-colors">
                    sarahmadeeh111@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-amber-500 text-base mt-0.5">💼</span>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Focus</span>
                  <span className="text-sm text-gray-200">Front-End Development</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#101426] border border-gray-800/80 p-8 rounded-3xl flex flex-col justify-between text-left shadow-xl min-h-[420px]">
            <h3 className="text-lg font-bold text-white mb-6">Send a Message</h3>

            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl font-bold mb-2">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-cyan-400">
                  Message sent successfully!
                </h4>
                <p className="text-sm text-gray-400">
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      required 
                      className="w-full bg-[#090c17] border border-gray-800/90 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 text-sm text-white placeholder-gray-500" 
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      required 
                      className="w-full bg-[#090c17] border border-gray-800/90 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 text-sm text-white placeholder-gray-500" 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      className="w-full bg-[#090c17] border border-gray-800/90 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 text-sm text-white placeholder-gray-500" 
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone No. (optional)" 
                      className="w-full bg-[#090c17] border border-gray-800/90 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 text-sm text-white placeholder-gray-500" 
                    />
                  </div>

                  <textarea 
                    rows="4" 
                    placeholder="Your message..." 
                    required 
                    className="w-full bg-[#090c17] border border-gray-800/90 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 text-sm text-white placeholder-gray-500 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 text-sm shadow-md mt-4"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Section (معدل: ارتفاع أقل وهوامش جانبية موسعة قليلاً لتناسب التصميم الرشيق) */}
      <footer className="bg-[#060810] text-gray-400 pt-10 pb-8 border-t border-gray-800/55">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          
          {/* Top Newsletter / Stay Updated Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pb-8 mb-8 border-b border-gray-800/60 gap-4">
            <div className="text-left">
              <h3 className="text-base font-bold text-white mb-0.5">Stay Updated</h3>
              <p className="text-xs text-gray-400">Subscribe to see my latest projects & articles.</p>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center w-full md:w-auto gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[#0b0e1b] border border-gray-800 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2 rounded-xl transition-all shadow-md shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left pb-10 border-b border-gray-800/40">
            {/* Column 1: Portfolio Info & Social Links */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                <span className="text-base font-bold text-white tracking-tight">Portfolio</span>
              </div>
              <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                Front-End Developer building beautiful, responsive web experiences with modern front-end technologies.
              </p>
              
              <div className="flex items-center space-x-2.5 pt-1">
                {[
                  { icon: 'fa-linkedin-in', link: 'https://linkedin.com' },
                  { icon: 'fa-facebook-f', link: 'https://facebook.com' },
                  { icon: 'fa-instagram', link: 'https://instagram.com' },
                  { icon: 'fa-github', link: 'https://github.com' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full border border-gray-800 bg-[#0a0d18] flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-600/20 transition-all duration-300 text-[11px] shadow-sm cursor-pointer"
                  >
                    <i className={`fab ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 space-y-2">
              <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-2">Navigation</h4>
              <ul className="space-y-1.5 text-xs">
                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white hover:font-medium transition-all duration-200 block py-0.5 cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: What I Do */}
            <div className="md:col-span-4 space-y-2">
              <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-2">What I Do</h4>
              <ul className="space-y-1.5 text-xs">
                {[
                  'Front-End Development',
                  'Responsive Web Design',
                  'React & Tailwind Projects',
                  'UI / UX Implementation',
                  'Component Architecture'
                ].map((service, idx) => (
                  <li key={idx} className="text-gray-400 hover:text-gray-200 transition-colors duration-200 cursor-default">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Text */}
          <div className="pt-6 text-center text-[11px] text-gray-500 tracking-wide">
            © 2026 Sara Madeeh -- All Rights Reserved
          </div>

        </div>
      </footer>
    </div>
  );
}

class AppErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div className="text-white text-center p-10">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default function WrappedApp() {
  return (
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  );
}