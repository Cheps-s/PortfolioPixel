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

export default function App() {
  const [playerPos, setPlayerPos] = useState({ x: 12 * TILE_SIZE, y: 8 * TILE_SIZE });
  const [keys, setKeys] = useState({});
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [facing, setFacing] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const { playSound, muted, setMuted } = useSound();
  const gameLoopRef = useRef();

  const movePlayer = useCallback((dx, dy) => {
    setPlayerPos(prev => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;
      return { x: newX, y: newY };
    });
    setIsMoving(true);
  }, []);

  const handleKeyDown = useCallback((e) => {
    setKeys(prev => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        setFacing('up');
        playSound('step');
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        setFacing('down');
        playSound('step');
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        setFacing('left');
        playSound('step');
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setFacing('right');
        playSound('step');
      }
      return prev;
    });
  }, [playSound]);

  const handleKeyUp = useCallback((e) => {
    setKeys(prev => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        setFacing('down');
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        setFacing('up');
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        setFacing('right');
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setFacing('left');
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const gameLoop = () => {
      if (isMoving) {
        movePlayer(PLAYER_SPEED * (facing === 'right' ? 1 : -1), 0);
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }, [isMoving, movePlayer, facing]);

  return (
    <div className={`relative w-screen h-screen overflow-hidden bg-[#2d4c1e]`}>
      {/* Your game content */}
      <p className="text-white">Enhanced PortfolioPixel Game</p>
    </div>
  );
}