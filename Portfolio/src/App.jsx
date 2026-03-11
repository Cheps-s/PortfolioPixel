import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';useEffect, useRef, useCallback, useMemo } from 'react';
import { import { 
  X, Github, Linkedin, Mail, ExternalLink, kedin, Mail, ExternalLink, 
  ChevronRight, Sword, Shield, Heart, Star, ight, Sword, Shield, Heart, Star, 
  Zap, Trophy, Scroll, Volume2, VolumeX,
  Moon, Sun, MapPin, Code2, Terminal, Cpu
} from 'lucide-react';ide-react';

// --- Enhanced Configuration ----- Enhanced Configuration ---
const TILE_SIZE = 64;onst TILE_SIZE = 64;
const MAP_WIDTH = 24;const MAP_WIDTH = 24;
const MAP_HEIGHT = 16;16;














































































































































}  );    </div>      <p className="text-white">Enhanced PortfolioPixel Game</p>      {/* Your game content */}    <div className={`relative w-screen h-screen overflow-hidden bg-[#2d4c1e]`}>  return (  }, [isMoving, movePlayer, facing]);    return () => cancelAnimationFrame(gameLoop);    gameLoop();    };      gameLoopRef.current = requestAnimationFrame(gameLoop);      }        movePlayer(PLAYER_SPEED * (facing === 'right' ? 1 : -1), 0);      if (isMoving) {    const gameLoop = () => {  useEffect(() => {  }, []);    });      return prev;      }        setFacing('left');      } else if (e.key === 'ArrowRight' || e.key === 'd') {        setFacing('right');      } else if (e.key === 'ArrowLeft' || e.key === 'a') {        setFacing('up');      } else if (e.key === 'ArrowDown' || e.key === 's') {        setFacing('down');      if (e.key === 'ArrowUp' || e.key === 'w') {    setKeys(prev => {  const handleKeyUp = useCallback((e) => {  }, [playSound]);    });      return prev;      }        playSound('step');        setFacing('right');      } else if (e.key === 'ArrowRight' || e.key === 'd') {        playSound('step');        setFacing('left');      } else if (e.key === 'ArrowLeft' || e.key === 'a') {        playSound('step');        setFacing('down');      } else if (e.key === 'ArrowDown' || e.key === 's') {        playSound('step');        setFacing('up');      if (e.key === 'ArrowUp' || e.key === 'w') {    setKeys(prev => {  const handleKeyDown = useCallback((e) => {  }, []);    setIsMoving(true);    });      return { x: newX, y: newY };      const newY = prev.y + dy;      const newX = prev.x + dx;    setPlayerPos(prev => {  const movePlayer = useCallback((dx, dy) => {  const gameLoopRef = useRef();  const { playSound, muted, setMuted } = useSound();    const [particles, setParticles] = useState([]);  const [isNight, setIsNight] = useState(false);  const [isMoving, setIsMoving] = useState(false);  const [facing, setFacing] = useState('down');  const [activeBuilding, setActiveBuilding] = useState(null);  const [keys, setKeys] = useState({});  const [playerPos, setPlayerPos] = useState({ x: 12 * TILE_SIZE, y: 8 * TILE_SIZE });export default function App() {};  );    />      }}        animationDuration: '1s'        backgroundColor: color,        top: y,         left: x,       style={{       className="absolute w-2 h-2 pointer-events-none animate-ping"    <div   return (  }, [onComplete]);    return () => clearTimeout(timer);    const timer = setTimeout(onComplete, 1000);  useEffect(() => {const Particle = ({ x, y, color, onComplete }) => {// --- Particle System ---};  return { playSound, muted, setMuted };  }, [muted]);    }        break;      default:        break;        oscillator.stop(audioContext.currentTime + 0.2);        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);        oscillator.start(audioContext.currentTime);        oscillator.type = 'sawtooth';        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);        oscillator.frequency.value = 400;      case 'close':        break;        oscillator.stop(audioContext.currentTime + 0.15);        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);        oscillator.start(audioContext.currentTime);        oscillator.type = 'square';        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);        oscillator.frequency.value = 600;      case 'interact':        break;        oscillator.stop(audioContext.currentTime + 0.1);        oscillator.start(audioContext.currentTime);        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);        oscillator.frequency.value = 150;      case 'step':    switch(type) {        gainNode.connect(audioContext.destination);    oscillator.connect(gainNode);        const gainNode = audioContext.createGain();    const oscillator = audioContext.createOscillator();    const audioContext = new (window.AudioContext || window.webkitAudioContext)();        if (muted) return;  const playSound = useCallback((type) => {    const [muted, setMuted] = useState(false);const useSound = () => {// --- Sound Effects (Simulated with AudioContext for pure React solution) ---const SPRINT_SPEED = 8;const PLAYER_SPEED = 5;const PLAYER_SPEED = 5;
const SPRINT_SPEED = 8;

// --- Sound Effects (Simulated with AudioContext for pure React solution) ---
const useSound = () => {
  const [muted, setMuted] = useState(false);
  
  const playSound = useCallback((type) => {
    if (muted) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
      case 'step':
        oscillator.frequency.value = 150;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case 'interact':
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        oscillator.type = 'square';
        oscillator.start(audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        oscillator.stop(audioContext.currentTime + 0.15);
        break;
      case 'close':
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        oscillator.type = 'sawtooth';
        oscillator.start(audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      default:
        break;
    }
  }, [muted]);

  return { playSound, muted, setMuted };
};

// --- Particle System ---
const Particle = ({ x, y, color, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="absolute w-2 h-2 pointer-events-none animate-ping"
      style={{ 
        left: x, 
        top: y, 
        backgroundColor: color,
        animationDuration: '1s'
      }}
    />
  );
};

// --- Enhanced Sprites ---
const Sprite = ({ type, color, label, isNight, isHovered }) => {
  const getSpriteContent = () => {
    switch(type) {
      case 'castle':
        return (
          <>
            <div className="absolute -top-12 left-2 w-12 h-12 bg-gray-400 border-4 border-black">
              <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-200 animate-pulse"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-200 animate-pulse"></div>
            </div>
            <div className="absolute -top-4 left-0 w-16 h-4 bg-red-700 border-4 border-black"></div>
            <div className="absolute bottom-0 left-2 w-4 h-6 bg-amber-900 border-2 border-black"></div>
            <div className="absolute bottom-0 right-2 w-4 h-6 bg-amber-900 border-2 border-black"></div>
          </>
        );
      case 'shop':
        return (
          <>
            <div className="absolute -top-2 left-0 w-full h-4 bg-blue-400 border-4 border-black animate-pulse"></div>
            <div className="absolute top-4 left-1 w-10 h-6 bg-white/80 border-2 border-black backdrop-blur-sm">
              <div className="text-[6px] text-black text-center mt-1 font-bold">SHOP</div>
            </div>
            <div className="absolute bottom-0 left-4 w-4 h-5 bg-amber-800 border-2 border-black"></div>
          </>
        );
      case 'tower':
        return (
          <>
             <div className="absolute -top-10 left-3 w-6 h-10 bg-gray-300 border-4 border-black">
               <div className="absolute top-2 left-1 w-2 h-2 bg-cyan-400 animate-pulse"></div>
             </div>
             <div className="absolute top-2 left-2 w-8 h-8 bg-gray-500 border-2 border-black opacity-50"></div>
          </>
        );
      case 'tree':
        return (
          <div className={`absolute -top-8 left-0 w-12 h-16 ${isNight ? 'bg-green-800' : 'bg-green-600'} border-4 border-black rounded-t-lg flex items-end justify-center pb-1 transition-colors duration-1000`}>
             <div className="w-4 h-4 bg-amber-900"></div>
             {isNight && <div className="absolute -top-2 left-4 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>}
          </div>
        );
      case 'rock':
        return (
          <div className="absolute -top-4 left-2 w-8 h-6 bg-gray-500 border-4 border-black rounded-t-full">
            <div className="absolute top-1 left-2 w-2 h-2 bg-gray-400"></div>
          </div>
        );
      case 'chest':
        return (
          <div className="absolute -top-6 left-2 w-8 h-8 bg-yellow-600 border-4 border-black">
            <div className="absolute top-3 left-0 w-full h-1 bg-black"></div>
            <div className="absolute top-2 left-3 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center group">
      <div 
        className={`w-12 h-12 ${color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative transition-all duration-200 ${isHovered ? 'scale-110 -translate-y-2' : ''}`}
        style={{ imageRendering: 'pixelated' }}
      >
        {getSpriteContent()}
      </div>
      
      <div className={`absolute -bottom-8 bg-black/90 px-3 py-1 text-[10px] text-white whitespace-nowrap border-2 border-white transition-all duration-200 pointer-events-none z-10 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {label}
        <span className="block text-[8px] text-gray-400 mt-1">Press SPACE</span>
      </div>
    </div>
  );
};

// --- Data ---
const BUILDINGS = [
  { id: 'about', x: 3, y: 3, type: 'castle', color: 'bg-orange-400', label: 'About Me', title: 'The Castle', icon: Shield,
    content: 'Welcome to my kingdom! I am a Full Stack Developer with 5+ years of experience crafting digital experiences. I specialize in React, Node.js, and cloud architecture.',
    stats: [{ label: 'Experience', value: '5+ Years' }, { label: 'Projects', value: '50+' }, { label: 'Clients', value: '30+' }] },
  { id: 'skills', x: 18, y: 3, type: 'tower', color: 'bg-gray-400', label: 'Skills', title: 'The Tech Tower', icon: Cpu,
    content: 'My arsenal of technologies and tools that I wield to build amazing products.',
    skills: [
      { name: 'React/Next.js', level: 95, color: 'bg-cyan-400' },
      { name: 'TypeScript', level: 90, color: 'bg-blue-400' },
      { name: 'Node.js', level: 85, color: 'bg-green-400' },
      { name: 'Python', level: 80, color: 'bg-yellow-400' },
      { name: 'AWS/Cloud', level: 75, color: 'bg-orange-400' },
      { name: 'Three.js/WebGL', level: 70, color: 'bg-purple-400' }
    ] },
  { id: 'projects', x: 5, y: 11, type: 'shop', color: 'bg-blue-500', label: 'Projects', title: 'Project Bazaar', icon: Code2,
    content: 'Browse my collection of completed quests and adventures in code.',
    projects: [
      { name: 'E-Commerce Platform', tech: 'Next.js, Stripe, PostgreSQL', desc: 'Full-stack shopping experience with real-time inventory' },
      { name: 'AI Dashboard', tech: 'React, Python, TensorFlow', desc: 'Data visualization for machine learning models' },
      { name: 'Game Engine', tech: 'TypeScript, WebGL', desc: 'Browser-based 2D game engine with physics' },
      { name: 'Social App', tech: 'React Native, Firebase', desc: 'Mobile app connecting local communities' }
    ] },
  { id: 'contact', x: 19, y: 11, type: 'chest', color: 'bg-purple-500', label: 'Contact', title: 'Treasure Chest', icon: Mail,
    content: 'Found my work interesting? Let\'s collaborate on the next big adventure!',
    contact: { email: 'alex.dev@pixelworld.com', github: 'github.com/alexdev', linkedin: 'linkedin.com/in/alexdev' } },
];

const TREES = [
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 20, y: 0 }, { x: 21, y: 0 }, { x: 22, y: 0 }, { x: 23, y: 0 },
  { x: 0, y: 1 }, { x: 23, y: 1 },
  { x: 0, y: 14 }, { x: 23, y: 14 },
  { x: 0, y: 15 }, { x: 1, y: 15 }, { x: 22, y: 15 }, { x: 23, y: 15 },
  { x: 8, y: 5 }, { x: 9, y: 5 }, { x: 14, y: 8 }, { x: 15, y: 8 },
  { x: 12, y: 12 }, { x: 3, y: 10 }
];

const ROCKS = [
  { x: 6, y: 2 }, { x: 17, y: 4 }, { x: 2, y: 13 }, { x: 21, y: 10 }, { x: 11, y: 7 }
];

// --- Components ---

const SkillBar = ({ name, level, color, delay }) => (
  <div className="mb-4 group">
    <div className="flex justify-between mb-1 text-sm">
      <span className="text-white font-bold">{name}</span>
      <span className="text-yellow-400">{level}%</span>
    </div>
    <div className="w-full bg-gray-700 h-4 border-2 border-black relative overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out relative`}
        style={{ width: `${level}%`, transitionDelay: `${delay}ms` }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
    </div>
  </div>
);

const ProjectCard = ({ project, index }) => (
  <div className="bg-slate-700 p-4 border-4 border-black hover:border-yellow-400 transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#facc15]">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-yellow-400 font-bold text-lg group-hover:text-yellow-300">{project.name}</h3>
      <ExternalLink size={16} className="text-gray-400 group-hover:text-white" />
    </div>
    <p className="text-cyan-400 text-xs mb-2 font-mono">{project.tech}</p>
    <p className="text-gray-300 text-sm">{project.desc}</p>
    <div className="mt-3 flex gap-2">
      <span className="text-[10px] bg-black/50 px-2 py-1 text-gray-400">View Code</span>
      <span className="text-[10px] bg-black/50 px-2 py-1 text-gray-400">Live Demo</span>
    </div>
  </div>
);

const Modal = ({ building, onClose, playSound }) => {
  useEffect(() => {
    if (building) playSound('interact');
  }, [building, playSound]);

  if (!building) return null;

  const Icon = building.icon || Star;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-slate-800 border-4 border-white w-full max-w-3xl max-h-[85vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-yellow-400"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-yellow-400"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-yellow-400"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-yellow-400"></div>

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b-4 border-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`p-3 ${building.color} border-4 border-black rounded-lg`}>
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-yellow-400 uppercase tracking-widest font-bold">{building.title}</h2>
              <p className="text-xs text-gray-400 mt-1">Level 99 {building.id === 'about' ? 'Developer' : building.id === 'skills' ? 'Wizard' : building.id === 'projects' ? 'Merchant' : 'Treasure Hunter'}</p>
            </div>
          </div>
          <button 
            onClick={() => { playSound('close'); onClose(); }}
            className="hover:bg-red-500/20 p-2 rounded transition-colors group"
          >
            <X size={32} className="text-gray-400 group-hover:text-red-400" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto pixel-scroll font-sans text-lg leading-relaxed text-gray-200 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMWUyOTNiIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyZTRhNjYiIG9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')]">
          
          {building.id === 'about' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className={`w-32 h-32 ${building.color} border-4 border-black shrink-0 flex items-center justify-center relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <span className="text-5xl animate-bounce">👨‍💻</span>
                </div>
                <div className="flex-1">
                  <p className="mb-4 text-lg">{building.content}</p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {building.stats.map((stat, i) => (
                      <div key={i} className="bg-slate-700/50 p-3 border-2 border-slate-600 text-center">
                        <div className="text-2xl font-bold text-yellow-400">{stat.value}</div>
                        <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/30 p-4 border-l-4 border-yellow-400">
                <p className="italic text-gray-300">"Code is like humor. When you have to explain it, it's bad." – Cory House</p>
              </div>
            </div>
          )}

          {building.id === 'skills' && (
            <div className="space-y-2">
              <p className="mb-6">{building.content}</p>
              <div className="grid gap-4">
                {building.skills.map((skill, i) => (
                  <SkillBar key={i} {...skill} delay={i * 100} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-slate-700/30 border-2 border-slate-600 rounded">
                <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                  <Trophy size={16} /> Achievements Unlocked
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Open Source Contributor', 'Hackathon Winner', 'Tech Speaker', 'Mentor'].map((ach, i) => (
                    <span key={i} className="bg-yellow-400/20 text-yellow-300 px-3 py-1 text-xs border border-yellow-400/50 rounded">
                      {ach}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {building.id === 'projects' && (
            <div className="space-y-4">
              <p className="mb-6">{building.content}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {building.projects.map((proj, i) => (
                  <ProjectCard key={i} project={proj} index={i} />
                ))}
              </div>
            </div>
          )}

          {building.id === 'contact' && (
            <div className="space-y-6">
              <p className="text-xl">{building.content}</p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <a href={`mailto:${building.contact.email}`} className="bg-red-500/20 border-2 border-red-500 p-6 text-center hover:bg-red-500/40 transition-all group">
                  <Mail size={32} className="mx-auto mb-2 text-red-400 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-bold">Email</div>
                  <div className="text-xs text-gray-400 mt-1 truncate">{building.contact.email}</div>
                </a>
                <a href={`https://${building.contact.github}`} target="_blank" rel="noreferrer" className="bg-gray-700/50 border-2 border-gray-500 p-6 text-center hover:bg-gray-700 transition-all group">
                  <Github size={32} className="mx-auto mb-2 text-white group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-bold">GitHub</div>
                  <div className="text-xs text-gray-400 mt-1 truncate">{building.contact.github}</div>
                </a>
                <a href={`https://${building.contact.linkedin}`} target="_blank" rel="noreferrer" className="bg-blue-500/20 border-2 border-blue-500 p-6 text-center hover:bg-blue-500/40 transition-all group">
                  <Linkedin size={32} className="mx-auto mb-2 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-bold">LinkedIn</div>
                  <div className="text-xs text-gray-400 mt-1 truncate">{building.contact.linkedin}</div>
                </a>
              </div>
              <div className="mt-8 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400 rounded text-center">
                <p className="text-yellow-300 font-bold">🎮 Currently available for freelance quests and full-time adventures!</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900 p-4 border-t-4 border-white flex justify-between items-center">
          <div className="text-xs text-gray-500">Press ESC to close</div>
          <button 
            onClick={() => { playSound('close'); onClose(); }}
            className="bg-red-500 px-6 py-3 text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all uppercase text-sm font-bold hover:bg-red-400"
          >
            Close [X]
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  // Game State
  const [playerPos, setPlayerPos] = useState({ x: 12 * TILE_SIZE, y: 8 * TILE_SIZE });
  const [keys, setKeys] = useState({});
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [facing, setFacing] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [isSprinting, setIsSprinting] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [collectedItems, setCollectedItems] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  
  const { playSound, muted, setMuted } = useSound();
  const gameLoopRef = useRef();
  const lastStepTime = useRef(0);

  // Quest system
  const quests = [
    { id: 1, text: "Visit the Castle (About)", completed: collectedItems.includes('about') },
    { id: 2, text: "Explore the Tech Tower (Skills)", completed: collectedItems.includes('skills') },
    { id: 3, text: "Browse the Project Bazaar", completed: collectedItems.includes('projects') },
    { id: 4, text: "Open the Treasure Chest (Contact)", completed: collectedItems.includes('contact') },
  ];

  const questProgress = quests.filter(q => q.completed).length;

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeBuilding) {
        setActiveBuilding(null);
        playSound('close');
        return;
      }
      if (activeBuilding) return;
      
      setKeys(prev => ({ ...prev, [e.key]: true }));
      if (e.key === 'Shift') setIsSprinting(true);
      if (e.key === 'q' || e.key === 'Q') setShowQuestLog(prev => !prev);
    };
    
    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
      if (e.key === 'Shift') setIsSprinting(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeBuilding, playSound]);

  // Day/Night cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Toggle night mode every 30 seconds for demo purposes
    if (gameTime > 0 && gameTime % 30 === 0) {
      setIsNight(prev => !prev);
    }
  }, [gameTime]);

  // Particle effect when moving
  const addParticle = useCallback((x, y) => {
    const colors = isNight ? ['#4ade80', '#60a5fa', '#f472b6'] : ['#fbbf24', '#f87171', '#a78bfa'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const id = Date.now() + Math.random();
    setParticles(prev => [...prev, { id, x, y, color }]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);
  }, [isNight]);

  // Game Loop
  useEffect(() => {
    const loop = () => {
      if (activeBuilding) {
        setIsMoving(false);
        gameLoopRef.current = requestAnimationFrame(loop);
        return;
      }

      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let moving = false;
        const speed = isSprinting ? SPRINT_SPEED : PLAYER_SPEED;

        if (keys['ArrowUp'] || keys['w'] || keys['W']) {
          newY = Math.max(0, prev.y - speed);
          setFacing('up');
          moving = true;
        }
        if (keys['ArrowDown'] || keys['s'] || keys['S']) {
          newY = Math.min((MAP_HEIGHT - 1) * TILE_SIZE, prev.y + speed);
          setFacing('down');
          moving = true;
        }
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
          newX = Math.max(0, prev.x - speed);
          setFacing('left');
          moving = true;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
          newX = Math.min((MAP_WIDTH - 1) * TILE_SIZE, prev.x + speed);
          setFacing('right');
          moving = true;
        }

        setIsMoving(moving);

        // Footstep particles and sound
        if (moving && Date.now() - lastStepTime.current > (isSprinting ? 200 : 350)) {
          addParticle(newX + TILE_SIZE/2, newY + TILE_SIZE);
          playSound('step');
          lastStepTime.current = Date.now();
        }

        // Collision Detection
        const playerRect = { x: newX + 12, y: newY + 12, w: TILE_SIZE - 24, h: TILE_SIZE - 24 };
        
        for (const building of BUILDINGS) {
          const bRect = { 
            x: building.x * TILE_SIZE, 
            y: building.y * TILE_SIZE, 
            w: TILE_SIZE, 
            h: TILE_SIZE 
          };
          
          if (
            playerRect.x < bRect.x + bRect.w &&
            playerRect.x + playerRect.w > bRect.x &&
            playerRect.y < bRect.y + bRect.h &&
            playerRect.y + playerRect.h > bRect.y
          ) {
            return prev;
          }
        }

        // Rock collision
        for (const rock of ROCKS) {
          const rRect = {
            x: rock.x * TILE_SIZE + 20,
            y: rock.y * TILE_SIZE + 20,
            w: 24,
            h: 24
          };
          if (
            playerRect.x < rRect.x + rRect.w &&
            playerRect.x + playerRect.w > rRect.x &&
            playerRect.y < rRect.y + rRect.h &&
            playerRect.y + playerRect.h > rRect.y
          ) {
            return prev;
          }
        }

        return { x: newX, y: newY };
      });

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [keys, activeBuilding, isSprinting, addParticle, playSound]);

  // Interaction Check
  useEffect(() => {
    const handleInteraction = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !activeBuilding) {
        const pRect = { x: playerPos.x - 10, y: playerPos.y - 10, w: TILE_SIZE + 20, h: TILE_SIZE + 20 };
        
        const nearBuilding = BUILDINGS.find(b => {
           const bRect = { 
            x: b.x * TILE_SIZE, 
            y: b.y * TILE_SIZE, 
            w: TILE_SIZE, 
            h: TILE_SIZE 
          };
          return (
            pRect.x < bRect.x + bRect.w &&
            pRect.x + pRect.w > bRect.x &&
            pRect.y < bRect.y + bRect.h &&
            pRect.y + pRect.h > bRect.y
          );
        });

        if (nearBuilding) {
          setActiveBuilding(nearBuilding);
          if (!collectedItems.includes(nearBuilding.id)) {
            setCollectedItems(prev => [...prev, nearBuilding.id]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleInteraction);
    return () => window.removeEventListener('keydown', handleInteraction);
  }, [playerPos, activeBuilding, collectedItems]);

  // Check proximity for hover effects
  useEffect(() => {
    const pRect = { x: playerPos.x - 20, y: playerPos.y - 20, w: TILE_SIZE + 40, h: TILE_SIZE + 40 };
    const near = BUILDINGS.find(b => {
      const bRect = { x: b.x * TILE_SIZE, y: b.y * TILE_SIZE, w: TILE_SIZE, h: TILE_SIZE };
      return (
        pRect.x < bRect.x + bRect.w &&
        pRect.x + pRect.w > bRect.x &&
        pRect.y < bRect.y + bRect.h &&
        pRect.y + pRect.h > bRect.y
      );
    });
    setHoveredBuilding(near || null);
  }, [playerPos]);

  // Camera Logic
  const cameraX = -playerPos.x + (window.innerWidth / 2) - (TILE_SIZE / 2);
  const cameraY = -playerPos.y + (window.innerHeight / 2) - (TILE_SIZE / 2);

  return (
    <div className={`relative w-screen h-screen overflow-hidden transition-colors duration-1000 ${isNight ? 'bg-[#0f172a]' : 'bg-[#2d4c1e]'}`}>
      
      {/* Ambient overlay for night mode */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 z-20 ${isNight ? 'opacity-40 bg-blue-900/50' : 'opacity-0'}`}></div>
      
      {/* Stars (visible at night) */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-40 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md p-4 border-4 border-white/20 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
          <h1 className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2 font-bold drop-shadow-sm">
            DEV_WORLD.exe
          </h1>
          <div className="text-[10px] text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isNight ? 'bg-blue-400' : 'bg-yellow-400'} animate-pulse`}></div>
              <span>{isNight ? 'Night' : 'Day'} Cycle Active</span>
            </div>
            <div>Quests: {questProgress}/4</div>
          </div>
        </div>
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-4 left-4 z-40 pointer-events-none hidden md:block">
        <div className="bg-black/60 backdrop-blur-sm p-4 border-2 border-white/30 text-xs space-y-2 rounded">
          <div className="text-yellow-300 font-bold mb-2 border-b border-white/20 pb-1">CONTROLS</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-gray-300">
            <span><span className="text-white font-bold">WASD</span> / Arrows</span>
            <span>Move</span>
            <span><span className="text-white font-bold">SHIFT</span></span>
            <span>Sprint</span>
            <span><span className="text-white font-bold">SPACE</span></span>
            <span>Interact</span>
            <span><span className="text-white font-bold">Q</span></span>
            <span>Quest Log</span>
            <span><span className="text-white font-bold">ESC</span></span>
            <span>Close</span>
          </div>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 z-40 flex gap-2">
        <button 
          onClick={() => setMuted(!muted)}
          className="bg-black/60 p-3 border-2 border-white/30 hover:border-yellow-400 hover:bg-black/80 transition-all rounded group"
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400 group-hover:scale-110 transition-transform" />}
        </button>
        <button 
          onClick={() => setIsNight(!isNight)}
          className="bg-black/60 p-3 border-2 border-white/30 hover:border-yellow-400 hover:bg-black/80 transition-all rounded group"
          title="Toggle Day/Night"
        >
          {isNight ? <Sun size={20} className="text-yellow-400 group-hover:rotate-180 transition-transform duration-500" /> : <Moon size={20} className="text-blue-400 group-hover:rotate-12 transition-transform" />}
        </button>
      </div>

      {/* Quest Log */}
      {showQuestLog && (
        <div className="absolute top-20 right-4 z-40 bg-slate-900/95 border-4 border-yellow-400/50 p-4 rounded shadow-[4px_4px_0_rgba(0,0,0,0.5)] w-64 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3 border-b border-yellow-400/30 pb-2">
            <Scroll size={16} className="text-yellow-400" />
            <h3 className="text-yellow-400 font-bold text-sm">Quest Log</h3>
          </div>
          <div className="space-y-2">
            {quests.map(quest => (
              <div key={quest.id} className={`text-xs flex items-start gap-2 ${quest.completed ? 'text-green-400' : 'text-gray-400'}`}>
                <div className={`mt-0.5 w-4 h-4 border-2 flex items-center justify-center text-[10px] ${quest.completed ? 'border-green-400 bg-green-400/20' : 'border-gray-600'}`}>
                  {quest.completed && '✓'}
                </div>
                <span className={quest.completed ? 'line-through opacity-60' : ''}>{quest.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-2 border-t border-white/10">
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${(questProgress / quests.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-center mt-1 text-gray-500">{questProgress}/{quests.length} Completed</div>
          </div>
        </div>
      )}

      {/* World Container */}
      <div 
        className="absolute top-0 left-0 w-full h-full transition-transform duration-75 ease-out will-change-transform"
        style={{ transform: `translate(${cameraX}px, ${cameraY}px)` }}
      >
        {/* Grid Background */}
        <div 
          className="absolute top-0 left-0 opacity-10 pointer-events-none"
          style={{
            width: MAP_WIDTH * TILE_SIZE,
            height: MAP_HEIGHT * TILE_SIZE,
            backgroundImage: `linear-gradient(${isNight ? '#60a5fa' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isNight ? '#60a5fa' : '#000'} 1px, transparent 1px)`,
            backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`
          }}
        />

        {/* Map Boundaries */}
        <div 
          className={`absolute border-8 ${isNight ? 'border-blue-900/50' : 'border-black/30'} bg-black/5`}
          style={{ width: MAP_WIDTH * TILE_SIZE, height: MAP_HEIGHT * TILE_SIZE }}
        />

        {/* Decorative Path */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <svg className="w-full h-full opacity-20">
            <path 
              d={`M ${3.5 * TILE_SIZE} ${3.5 * TILE_SIZE} Q ${12 * TILE_SIZE} ${8 * TILE_SIZE} ${19.5 * TILE_SIZE} ${11.5 * TILE_SIZE}`}
              fill="none"
              stroke={isNight ? '#60a5fa' : '#fbbf24'}
              strokeWidth="20"
              strokeDasharray="20 10"
            />
          </svg>
        </div>

        {/* Rocks */}
        {ROCKS.map((rock, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: rock.x * TILE_SIZE, top: rock.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}
          >
            <Sprite type="rock" color="bg-gray-600" label="" isNight={isNight} />
          </div>
        ))}

        {/* Trees */}
        {TREES.map((tree, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: tree.x * TILE_SIZE, top: tree.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}
          >
            <Sprite type="tree" color="bg-green-600" label="" isNight={isNight} />
          </div>
        ))}

        {/* Buildings */}
        {BUILDINGS.map((b) => (
          <div
            key={b.id}
            className="absolute cursor-pointer"
            style={{ left: b.x * TILE_SIZE, top: b.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}
            onClick={() => {
              setActiveBuilding(b);
              if (!collectedItems.includes(b.id)) {
                setCollectedItems(prev => [...prev, b.id]);
              }
            }}
          >
            <Sprite 
              type={b.type} 
              color={b.color} 
              label={b.label} 
              isNight={isNight}
              isHovered={hoveredBuilding?.id === b.id}
            />
            {collectedItems.includes(b.id) && (
              <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce">
                <Star size={16} fill="currentColor" />
              </div>
            )}
          </div>
        ))}

        {/* Particles */}
        {particles.map(p => (
          <Particle key={p.id} x={p.x} y={p.y} color={p.color} onComplete={() => {}} />
        ))}

        {/* Player */}
        <div
          className="absolute z-30 transition-transform will-change-transform"
          style={{
            width: TILE_SIZE,
            height: TILE_SIZE,
            left: playerPos.x,
            top: playerPos.y,
            transform: `scaleX(${facing === 'left' ? -1 : 1})`
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`absolute bottom-1 w-10 h-3 bg-black/40 rounded-full transition-all ${isMoving ? 'scale-75' : 'scale-100'}`}></div>
            
            <div className={`w-10 h-12 relative transition-all duration-100 ${isMoving ? 'animate-bounce' : ''}`}>
              {/* Character Body */}
              <div className={`absolute inset-0 ${isNight ? 'bg-indigo-500' : 'bg-blue-500'} border-4 border-black rounded-sm`}>
                {/* Face */}
                <div className="absolute top-2 left-1 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute top-2 right-1 w-2 h-2 bg-black rounded-full"></div>
                <div className={`absolute bottom-3 left-3 w-4 h-1 bg-black rounded-full transition-all ${isMoving ? 'w-3 left-3.5' : ''}`}></div>
                
                {/* Headband */}
                <div className="absolute -top-1 left-0 right-0 h-3 bg-red-500 border-b-2 border-black"></div>
                <div className="absolute -top-2 left-2 w-2 h-3 bg-red-600 border-2 border-black"></div>
                
                {/* Scarf flowing when moving */}
                {isMoving && (
                  <div className={`absolute top-4 ${facing === 'left' ? '-right-4' : '-left-4'} w-4 h-3 bg-orange-400 border-2 border-black animate-pulse`}></div>
                )}
              </div>
              
              {/* Sword on back */}
              <div className="absolute -top-2 -right-1 w-2 h-8 bg-gray-400 border-2 border-black transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Prompt */}
      {hoveredBuilding && !activeBuilding && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 animate-pulse">
          <div className="bg-white text-black px-6 py-3 border-4 border-black font-bold text-sm shadow-[4px_4px_0_#000] flex items-center gap-2">
            <span className="text-xl">⚡</span>
            PRESS SPACE TO ENTER {hoveredBuilding.label.toUpperCase()}
            <span className="text-xl">⚡</span>
          </div>
        </div>
      )}

      {/* Sprint indicator */}
      {isSprinting && isMoving && (
        <div className="absolute bottom-4 right-4 z-40">
          <div className="flex items-center gap-2 bg-yellow-400/90 text-black px-3 py-1 border-2 border-black text-xs font-bold">
            <Zap size={14} fill="currentColor" />
            SPRINTING
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal 
        building={activeBuilding} 
        onClose={() => setActiveBuilding(null)} 
        playSound={playSound}
      />
    </div>
  );
}