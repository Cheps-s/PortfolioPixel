import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  X, Github, Linkedin, Mail, ExternalLink, 
  ChevronRight, Sword, Shield, Heart, Star, 
  Zap, Trophy, Scroll, Volume2, VolumeX,
  Moon, Sun, MapPin, Code2, Terminal, Cpu
} from 'lucide-react';

// --- Enhanced Configuration ---
const TILE_SIZE = 64;
const MAP_WIDTH = 24;
const MAP_HEIGHT = 16;
const PLAYER_SPEED = 5;
const SPRINT_SPEED = 8;

// --- Sound Effects ---
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
      default: break;
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
      style={{ left: x, top: y, backgroundColor: color, animationDuration: '1s' }}
    />
  );
};

// --- Sprite Component ---
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
          </>
        );
      case 'shop':
        return (
          <>
            <div className="absolute -top-2 left-0 w-full h-4 bg-blue-400 border-4 border-black animate-pulse"></div>
            <div className="absolute top-4 left-1 w-10 h-6 bg-white/80 border-2 border-black">
              <div className="text-[6px] text-black text-center mt-1 font-bold">SHOP</div>
            </div>
          </>
        );
      case 'tower':
        return (
          <div className="absolute -top-10 left-3 w-6 h-10 bg-gray-300 border-4 border-black">
            <div className="absolute top-2 left-1 w-2 h-2 bg-cyan-400 animate-pulse"></div>
          </div>
        );
      case 'tree':
        return (
          <div className={`absolute -top-8 left-0 w-12 h-16 ${isNight ? 'bg-green-800' : 'bg-green-600'} border-4 border-black rounded-t-lg`}>
            <div className="w-4 h-4 bg-amber-900 mx-auto mt-8"></div>
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
      default: return null;
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center group">
      <div 
        className={`w-12 h-12 ${color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${isHovered ? 'scale-110 -translate-y-2' : ''}`}
      >
        {getSpriteContent()}
      </div>
      <div className={`absolute -bottom-8 bg-black/90 px-3 py-1 text-[10px] text-white whitespace-nowrap border-2 border-white transition-all pointer-events-none z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {label}
      </div>
    </div>
  );
};

// --- Data ---
const BUILDINGS = [
  { id: 'about', x: 3, y: 3, type: 'castle', color: 'bg-orange-400', label: 'About Me', title: 'The Castle' },
  { id: 'skills', x: 18, y: 3, type: 'tower', color: 'bg-gray-400', label: 'Skills', title: 'The Tech Tower' },
  { id: 'projects', x: 5, y: 11, type: 'shop', color: 'bg-blue-500', label: 'Projects', title: 'Project Bazaar' },
  { id: 'contact', x: 19, y: 11, type: 'chest', color: 'bg-purple-500', label: 'Contact', title: 'Treasure Chest' },
];

const TREES = [
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 20, y: 0 }, { x: 21, y: 0 }, { x: 22, y: 0 }, { x: 23, y: 0 },
  { x: 0, y: 1 }, { x: 23, y: 1 }, { x: 0, y: 14 }, { x: 23, y: 14 },
  { x: 0, y: 15 }, { x: 1, y: 15 }, { x: 22, y: 15 }, { x: 23, y: 15 },
];

// --- Modal ---
const Modal = ({ building, onClose, playSound }) => {
  useEffect(() => {
    if (building) playSound('interact');
  }, [building, playSound]);

  if (!building) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-slate-800 border-4 border-white w-full max-w-2xl max-h-[80vh] flex flex-col shadow-lg">
        <div className="bg-slate-900 p-6 border-b-4 border-white flex justify-between items-center">
          <h2 className="text-2xl text-yellow-400 font-bold">{building.title}</h2>
          <button onClick={() => { playSound('close'); onClose(); }}>
            <X size={32} className="text-gray-400 hover:text-red-400" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-1 text-gray-200">
          <p className="text-lg mb-4">Welcome to {building.label}</p>
          <p>Click to learn more about this section!</p>
        </div>

        <div className="bg-slate-900 p-4 border-t-4 border-white flex justify-end">
          <button 
            onClick={() => { playSound('close'); onClose(); }}
            className="bg-red-500 px-6 py-2 text-white border-b-2 border-red-700 uppercase text-sm font-bold hover:bg-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [playerPos, setPlayerPos] = useState({ x: 12 * TILE_SIZE, y: 8 * TILE_SIZE });
  const [keys, setKeys] = useState({});
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [facing, setFacing] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  
  const { playSound, muted, setMuted } = useSound();
  const gameLoopRef = useRef();
  const lastStepTime = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeBuilding) {
        setActiveBuilding(null);
        playSound('close');
        return;
      }
      if (activeBuilding) return;
      setKeys(prev => ({ ...prev, [e.key]: true }));
    };
    
    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeBuilding, playSound]);

  useEffect(() => {
    const loop = () => {
      if (!activeBuilding) {
        setPlayerPos(prev => {
          let newX = prev.x;
          let newY = prev.y;
          let moving = false;
          const speed = PLAYER_SPEED;

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

          if (moving && Date.now() - lastStepTime.current > 300) {
            playSound('step');
            lastStepTime.current = Date.now();
          }

          setIsMoving(moving);
          return { x: newX, y: newY };
        });
      }
      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [keys, activeBuilding, playSound]);

  useEffect(() => {
    const handleInteraction = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !activeBuilding) {
        const nearBuilding = BUILDINGS.find(b => {
          const dx = playerPos.x - (b.x * TILE_SIZE);
          const dy = playerPos.y - (b.y * TILE_SIZE);
          return Math.sqrt(dx*dx + dy*dy) < 100;
        });
        if (nearBuilding) setActiveBuilding(nearBuilding);
      }
    };

    window.addEventListener('keydown', handleInteraction);
    return () => window.removeEventListener('keydown', handleInteraction);
  }, [playerPos, activeBuilding]);

  useEffect(() => {
    const pRect = { x: playerPos.x - 40, y: playerPos.y - 40, w: TILE_SIZE + 80, h: TILE_SIZE + 80 };
    const near = BUILDINGS.find(b => {
      const bRect = { x: b.x * TILE_SIZE, y: b.y * TILE_SIZE, w: TILE_SIZE, h: TILE_SIZE };
      return pRect.x < bRect.x + bRect.w && pRect.x + pRect.w > bRect.x && 
             pRect.y < bRect.y + bRect.h && pRect.y + pRect.h > bRect.y;
    });
    setHoveredBuilding(near || null);
  }, [playerPos]);

  const cameraX = -playerPos.x + (window.innerWidth / 2) - (TILE_SIZE / 2);
  const cameraY = -playerPos.y + (window.innerHeight / 2) - (TILE_SIZE / 2);

  return (
    <div className={`relative w-screen h-screen overflow-hidden transition-colors duration-1000 ${isNight ? 'bg-[#0f172a]' : 'bg-[#2d4c1e]'}`}>
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 z-20 ${isNight ? 'opacity-40 bg-blue-900/50' : 'opacity-0'}`}></div>

      <div className="absolute top-4 left-4 z-40">
        <div className="bg-black/80 backdrop-blur-md p-4 border-4 border-white/20">
          <h1 className="text-xl text-yellow-400 font-bold mb-2">PortfolioPixel</h1>
          <div className="text-[10px] text-gray-400">
            <div>Use WASD or Arrow Keys to move</div>
            <div>Press SPACE to interact</div>
            <div className="mt-2">{isNight ? '🌙 Night' : '☀️ Day'} Mode</div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-40 flex gap-2">
        <button onClick={() => setMuted(!muted)} className="bg-black/60 p-3 border-2 border-white/30 hover:border-yellow-400">
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button onClick={() => setIsNight(!isNight)} className="bg-black/60 p-3 border-2 border-white/30 hover:border-yellow-400">
          {isNight ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div 
        className="absolute top-0 left-0 w-full h-full transition-transform duration-75"
        style={{ transform: `translate(${cameraX}px, ${cameraY}px)` }}
      >
        <div 
          className="absolute border-8 border-black/30"
          style={{ width: MAP_WIDTH * TILE_SIZE, height: MAP_HEIGHT * TILE_SIZE }}
        />

        {TREES.map((tree, i) => (
          <div key={i} className="absolute" style={{ left: tree.x * TILE_SIZE, top: tree.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}>
            <Sprite type="tree" color="bg-green-600" label="" isNight={isNight} />
          </div>
        ))}

        {BUILDINGS.map((b) => (
          <div key={b.id} className="absolute cursor-pointer" 
            style={{ left: b.x * TILE_SIZE, top: b.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}
            onClick={() => setActiveBuilding(b)}>
            <Sprite type={b.type} color={b.color} label={b.label} isNight={isNight} isHovered={hoveredBuilding?.id === b.id} />
          </div>
        ))}

        <div className="absolute z-30" style={{ width: TILE_SIZE, height: TILE_SIZE, left: playerPos.x, top: playerPos.y }}>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`w-10 h-12 ${isNight ? 'bg-indigo-500' : 'bg-blue-500'} border-4 border-black`}>
              <div className="absolute top-2 left-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-2 right-1 w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {hoveredBuilding && !activeBuilding && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 animate-pulse">
          <div className="bg-white text-black px-6 py-3 border-4 border-black font-bold text-sm">
            PRESS SPACE TO ENTER {hoveredBuilding.label.toUpperCase()}
          </div>
        </div>
      )}

      <Modal building={activeBuilding} onClose={() => setActiveBuilding(null)} playSound={playSound} />
    </div>
  );
}