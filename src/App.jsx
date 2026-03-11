import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, Github, Linkedin, Mail, ExternalLink, 
  ChevronRight, Sword, Shield, Heart, Star, 
  Zap, Trophy, Scroll, Volume2, VolumeX,
  Moon, Sun, Code2, Terminal, Cpu, Pickaxe
} from 'lucide-react';

// Minecraft-style configuration
const BLOCK_SIZE = 50;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 12;

// Block types
const BLOCK_TYPES = {
  STONE: 'stone',
  DIRT: 'dirt',
  GRASS: 'grass',
  SAND: 'sand',
  WOOD: 'wood',
  LEAVES: 'leaves',
  WATER: 'water',
  DIAMOND: 'diamond',
  GOLD: 'gold',
  IRON: 'iron',
  EMPTY: 'empty'
};

// Color map for blocks
const BLOCK_COLORS = {
  stone: '#808080',
  dirt: '#8B4513',
  grass: '#00AA00',
  sand: '#F5DEB3',
  wood: '#8B4513',
  leaves: '#228B22',
  water: '#4169E1',
  diamond: '#00FFFF',
  gold: '#FFD700',
  iron: '#C0C0C0',
  empty: 'transparent'
};

// Sound effects hook
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
      case 'block_break':
        oscillator.frequency.value = 100;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      case 'block_place':
        oscillator.frequency.value = 300;
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      default:
        break;
    }
  }, [muted]);

  return { playSound, muted, setMuted };
};

// Minecraft-style block component
const MinecraftBlock = ({ type, x, y, onBreak, isSelected }) => {
  const [crackLevel, setCrackLevel] = useState(0);
  
  const handleClick = () => {
    onBreak(x, y, type);
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute cursor-pointer transition-all hover:scale-105 group ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
      style={{
        left: x * BLOCK_SIZE,
        top: y * BLOCK_SIZE,
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        backgroundColor: BLOCK_COLORS[type],
        border: '2px solid rgba(0,0,0,0.3)',
        boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.5), inset 2px 2px 0 rgba(255,255,255,0.5)',
      }}
    >
      {/* Block texture details */}
      <div className="w-full h-full relative">
        {type === 'stone' && (
          <>
            <div className="absolute top-1 left-1 w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-600 rounded-full"></div>
          </>
        )}
        {type === 'dirt' && (
          <>
            <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-700 rounded-full"></div>
            <div className="absolute bottom-3 right-3 w-1 h-1 bg-yellow-700 rounded-full"></div>
          </>
        )}
        {type === 'grass' && (
          <div className="w-full h-1/3 bg-green-700 absolute top-0"></div>
        )}
        {type === 'diamond' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-lg">💎</div>
          </div>
        )}
        {type === 'gold' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-lg">⭐</div>
          </div>
        )}
        {type === 'iron' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-lg">⚙️</div>
          </div>
        )}
      </div>

      {/* Block breaking animation */}
      <div 
        className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all pointer-events-none"
      ></div>
    </div>
  );
};

// Portfolio info modal
const PortfolioModal = ({ block, onClose, position }) => {
  if (!block) return null;

  const portfolioData = {
    diamond: {
      title: 'About Me',
      icon: '💎',
      content: 'Full Stack Developer with 5+ years of experience building amazing web applications.',
      links: [{ label: 'LinkedIn', url: '#' }]
    },
    gold: {
      title: 'Projects',
      icon: '⭐',
      content: 'E-commerce Platform, AI Dashboard, Game Engine, Social App',
      links: [{ label: 'GitHub', url: '#' }]
    },
    iron: {
      title: 'Skills',
      icon: '⚙️',
      content: 'React, TypeScript, Node.js, Python, AWS, WebGL',
      links: [{ label: 'Resume', url: '#' }]
    }
  };

  const data = portfolioData[block] || { title: 'Block', content: 'Interesting block!' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-stone-700 border-8 border-stone-900 p-8 max-w-md shadow-2xl" style={{ boxShadow: 'inset -4px -4px 0 rgba(0,0,0,0.5), inset 4px 4px 0 rgba(255,255,255,0.2)' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-yellow-300">{data.icon} {data.title}</h2>
          <button onClick={onClose} className="text-2xl hover:scale-125">✕</button>
        </div>
        
        <p className="text-white mb-6 font-mono text-sm leading-relaxed">{data.content}</p>

        <div className="flex gap-2">
          {data.links?.map((link, i) => (
            <button 
              key={i}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [blocks, setBlocks] = useState(() => {
    const initialBlocks = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        let type = BLOCK_TYPES.EMPTY;
        
        if (y === GRID_HEIGHT - 1) type = BLOCK_TYPES.GRASS;
        else if (y === GRID_HEIGHT - 2) type = BLOCK_TYPES.DIRT;
        else if (y > GRID_HEIGHT - 5) type = BLOCK_TYPES.STONE;
        
        // Scatter some special blocks
        if (y > GRID_HEIGHT - 6 && Math.random() < 0.05) {
          const special = [BLOCK_TYPES.DIAMOND, BLOCK_TYPES.GOLD, BLOCK_TYPES.IRON];
          type = special[Math.floor(Math.random() * special.length)];
        }
        
        initialBlocks.push({ x, y, type });
      }
    }
    return initialBlocks;
  });

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [miningProgress, setMiningProgress] = useState(0);
  const { playSound, muted, setMuted } = useSound();
  const miningTimeoutRef = useRef(null);

  const handleBlockBreak = (x, y, type) => {
    if (type === BLOCK_TYPES.EMPTY) return;

    playSound('block_break');
    
    // Remove block
    setBlocks(prev => prev.filter(b => !(b.x === x && b.y === y)));
    
    // Show special block modal
    if ([BLOCK_TYPES.DIAMOND, BLOCK_TYPES.GOLD, BLOCK_TYPES.IRON].includes(type)) {
      setSelectedBlock(type);
    }

    // Add block below if in air
    setTimeout(() => {
      setBlocks(prev => {
        const newBlocks = [...prev];
        for (let by = y + 1; by < GRID_HEIGHT; by++) {
          const blockBelow = newBlocks.find(b => b.x === x && b.y === by);
          if (!blockBelow) {
            newBlocks.push({ x, y: by, type: BLOCK_TYPES.STONE });
          } else {
            break;
          }
        }
        return newBlocks;
      });
      playSound('block_place');
    }, 300);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="bg-stone-800 border-b-4 border-stone-900 p-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-yellow-300 font-minecraft">
          ▓ PORTFOLIO MINER ▓
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setMuted(!muted)}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 border-b-4 border-green-800"
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>

      {/* Game area */}
      <div className="flex-1 relative bg-sky-300 overflow-auto">
        <div className="relative" style={{ width: GRID_WIDTH * BLOCK_SIZE, height: GRID_HEIGHT * BLOCK_SIZE }}>
          {/* Layer shadow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)`
          }}></div>

          {/* Blocks */}
          {blocks.map((block, i) => (
            <MinecraftBlock
              key={i}
              type={block.type}
              x={block.x}
              y={block.y}
              onBreak={handleBlockBreak}
              isSelected={selectedBlock === block.type}
            />
          ))}

          {/* Cursor/Crosshair */}
          <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce">
            ⛏️
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="bg-stone-800 border-t-4 border-stone-900 p-4 text-white font-mono text-sm">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-yellow-300">💎 Diamond Blocks</div>
            <div className="text-gray-300">Click to see About</div>
          </div>
          <div>
            <div className="text-yellow-300">⭐ Gold Blocks</div>
            <div className="text-gray-300">Click to see Projects</div>
          </div>
          <div>
            <div className="text-yellow-300">⚙️ Iron Blocks</div>
            <div className="text-gray-300">Click to see Skills</div>
          </div>
        </div>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal block={selectedBlock} onClose={() => setSelectedBlock(null)} />
    </div>
  );
}