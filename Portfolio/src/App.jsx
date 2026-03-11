import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react';

// --- Configuration ---
const TILE_SIZE = 64; // Size of one grid block in pixels
const MAP_WIDTH = 20; // Grid width
const MAP_HEIGHT = 12; // Grid height
const PLAYER_SPEED = 4; // Movement speed

// --- Assets & Sprites (CSS-based Pixel Art) ---
// In a real app, you might use image sprites. Here we use styled divs for pure CSS art.

const Sprite = ({ type, color, label }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center group">
      {/* The Building Block */}
      <div 
        className={`w-12 h-12 ${color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative transition-transform group-hover:scale-105`}
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Pixel Details based on type */}
        {type === 'house' && (
          <>
            <div className="absolute -top-6 left-0 w-full h-6 bg-red-600 border-4 border-black border-b-0" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
            <div className="absolute top-4 left-2 w-2 h-4 bg-yellow-200 border-2 border-black"></div>
            <div className="absolute top-4 right-2 w-2 h-4 bg-yellow-200 border-2 border-black"></div>
            <div className="absolute bottom-0 left-4 w-4 h-5 bg-amber-800 border-2 border-black"></div>
          </>
        )}
        {type === 'shop' && (
          <>
            <div className="absolute -top-2 left-0 w-full h-4 bg-blue-400 border-4 border-black"></div>
            <div className="absolute top-4 left-1 w-10 h-6 bg-white border-2 border-black flex items-center justify-center text-[8px] text-black">OPEN</div>
          </>
        )}
        {type === 'tower' && (
          <>
             <div className="absolute -top-8 left-2 w-8 h-8 bg-gray-400 border-4 border-black"></div>
             <div className="absolute top-2 left-2 w-8 h-8 bg-gray-600 border-2 border-black opacity-50"></div>
          </>
        )}
        {type === 'tree' && (
          <div className="absolute -top-8 left-0 w-12 h-16 bg-green-600 border-4 border-black rounded-t-lg flex items-end justify-center pb-1">
             <div className="w-4 h-4 bg-amber-900"></div>
          </div>
        )}
      </div>
      
      {/* Label */}
      <div className="absolute -bottom-8 bg-black/80 px-2 py-1 text-[10px] text-white whitespace-nowrap border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {label}
      </div>
    </div>
  );
};

// --- Data ---

const BUILDINGS = [
  { id: 'about', x: 2, y: 2, type: 'house', color: 'bg-orange-400', label: 'About Me', title: 'The Home', content: 'Hello! I am a Creative Developer who loves building immersive web experiences. I specialize in React, WebGL, and UI Design.' },
  { id: 'skills', x: 12, y: 2, type: 'tower', color: 'bg-gray-400', label: 'Skills', title: 'The Tech Tower', content: 'React, Vue, Node.js, Three.js, Tailwind CSS, TypeScript, Python, Docker.' },
  { id: 'projects', x: 4, y: 8, type: 'shop', color: 'bg-blue-500', label: 'Projects', title: 'Project Shop', content: 'Check out my latest work: E-commerce platforms, Game engines, and Data visualization tools.' },
  { id: 'contact', x: 16, y: 8, type: 'house', color: 'bg-purple-500', label: 'Contact', title: 'Post Office', content: 'Let\'s work together! Reach me at dev@pixelworld.com or find me on social media.' },
];

const TREES = [
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 5, y: 1 }, { x: 18, y: 2 }, { x: 19, y: 3 },
  { x: 0, y: 10 }, { x: 19, y: 10 }, { x: 10, y: 5 }, { x: 11, y: 5 }
];

// --- Components ---

const Modal = ({ building, onClose }) => {
  if (!building) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-800 border-4 border-white w-full max-w-2xl max-h-[80vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        {/* Header */}
        <div className="bg-slate-900 p-4 border-b-4 border-white flex justify-between items-center">
          <h2 className="text-xl text-yellow-400 uppercase tracking-widest">{building.title}</h2>
          <button onClick={onClose} className="hover:text-red-400 transition-colors">
            <X size={32} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto pixel-scroll font-sans text-lg leading-relaxed text-gray-200">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className={`w-32 h-32 ${building.color} border-4 border-black shrink-0 flex items-center justify-center`}>
               <span className="text-4xl">🏢</span>
            </div>
            <div>
              <p className="mb-6">{building.content}</p>
              
              {building.id === 'projects' && (
                <div className="space-y-4">
                  <div className="bg-slate-700 p-4 border-2 border-slate-500 hover:border-yellow-400 cursor-pointer transition-colors">
                    <h3 className="text-yellow-400 font-bold mb-1">Project Alpha</h3>
                    <p className="text-sm">A real-time 3D dashboard using Three.js.</p>
                  </div>
                  <div className="bg-slate-700 p-4 border-2 border-slate-500 hover:border-yellow-400 cursor-pointer transition-colors">
                    <h3 className="text-yellow-400 font-bold mb-1">Project Beta</h3>
                    <p className="text-sm">E-commerce platform with headless CMS.</p>
                  </div>
                </div>
              )}

              {building.id === 'contact' && (
                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-2 bg-blue-600 px-4 py-2 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all">
                    <Github size={20} /> GitHub
                  </button>
                  <button className="flex items-center gap-2 bg-blue-400 px-4 py-2 border-b-4 border-blue-600 active:border-b-0 active:translate-y-1 transition-all">
                    <Linkedin size={20} /> LinkedIn
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-900 p-4 border-t-4 border-white text-right">
          <button 
            onClick={onClose}
            className="bg-red-500 px-6 py-3 text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all uppercase text-sm"
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
  // Game State
  const [playerPos, setPlayerPos] = useState({ x: 5 * TILE_SIZE, y: 5 * TILE_SIZE });
  const [keys, setKeys] = useState({});
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [facing, setFacing] = useState('down'); // down, up, left, right
  const [isMoving, setIsMoving] = useState(false);
  
  const gameLoopRef = useRef();
  const containerRef = useRef();

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeBuilding) return; // Disable movement when modal is open
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
  }, [activeBuilding]);

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

        // Movement Logic
        if (keys['ArrowUp'] || keys['w']) {
          newY = Math.max(0, prev.y - PLAYER_SPEED);
          setFacing('up');
          moving = true;
        }
        if (keys['ArrowDown'] || keys['s']) {
          newY = Math.min((MAP_HEIGHT - 1) * TILE_SIZE, prev.y + PLAYER_SPEED);
          setFacing('down');
          moving = true;
        }
        if (keys['ArrowLeft'] || keys['a']) {
          newX = Math.max(0, prev.x - PLAYER_SPEED);
          setFacing('left');
          moving = true;
        }
        if (keys['ArrowRight'] || keys['d']) {
          newX = Math.min((MAP_WIDTH - 1) * TILE_SIZE, prev.x + PLAYER_SPEED);
          setFacing('right');
          moving = true;
        }

        setIsMoving(moving);

        // Collision Detection (Simple AABB)
        const playerRect = { x: newX + 10, y: newY + 10, w: TILE_SIZE - 20, h: TILE_SIZE - 20 }; // Smaller hitbox
        
        // Check building collisions
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
            // Collision detected, revert position
            return prev;
          }
        }

        return { x: newX, y: newY };
      });

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [keys, activeBuilding]);

  // Interaction Check (Space/Enter)
  useEffect(() => {
    const handleInteraction = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !activeBuilding) {
        // Check if near a building
        const pRect = { x: playerPos.x, y: playerPos.y, w: TILE_SIZE, h: TILE_SIZE };
        
        // Expand search area slightly for easier interaction
        const interactRect = {
          x: pRect.x - 10,
          y: pRect.y - 10,
          w: pRect.w + 20,
          h: pRect.h + 20
        };

        const nearBuilding = BUILDINGS.find(b => {
           const bRect = { 
            x: b.x * TILE_SIZE, 
            y: b.y * TILE_SIZE, 
            w: TILE_SIZE, 
            h: TILE_SIZE 
          };
          return (
            interactRect.x < bRect.x + bRect.w &&
            interactRect.x + interactRect.w > bRect.x &&
            interactRect.y < bRect.y + bRect.h &&
            interactRect.y + interactRect.h > bRect.y
          );
        });

        if (nearBuilding) {
          setActiveBuilding(nearBuilding);
        }
      }
    };

    window.addEventListener('keydown', handleInteraction);
    return () => window.removeEventListener('keydown', handleInteraction);
  }, [playerPos, activeBuilding]);

  // Camera Logic (Center player)
  const cameraX = -playerPos.x + (window.innerWidth / 2) - (TILE_SIZE / 2);
  const cameraY = -playerPos.y + (window.innerHeight / 2) - (TILE_SIZE / 2);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#2d4c1e]">
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-40 pointer-events-none">
        <h1 className="text-2xl md:text-4xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] mb-2">
          DEV_WORLD.exe
        </h1>
        <div className="bg-black/60 p-4 border-2 border-white text-xs md:text-sm max-w-xs backdrop-blur-sm">
          <p className="mb-2 text-yellow-300">CONTROLS:</p>
          <div className="grid grid-cols-2 gap-2 text-gray-300">
            <span>Move: <span className="text-white">WASD / Arrows</span></span>
            <span>Interact: <span className="text-white">SPACE / ENTER</span></span>
          </div>
        </div>
      </div>

      {/* World Container */}
      <div 
        className="absolute top-0 left-0 w-full h-full transition-transform duration-75 ease-linear"
        style={{
          transform: `translate(${cameraX}px, ${cameraY}px)`
        }}
      >
        {/* Grid Background */}
        <div 
          className="absolute top-0 left-0 opacity-20 pointer-events-none"
          style={{
            width: MAP_WIDTH * TILE_SIZE,
            height: MAP_HEIGHT * TILE_SIZE,
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`
          }}
        />

        {/* Map Boundaries Visuals */}
        <div 
          className="absolute border-8 border-black/50 bg-black/10"
          style={{
            width: MAP_WIDTH * TILE_SIZE,
            height: MAP_HEIGHT * TILE_SIZE,
          }}
        />

        {/* Trees */}
        {TREES.map((tree, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: tree.x * TILE_SIZE,
              top: tree.y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE
            }}
          >
            <Sprite type="tree" color="bg-green-600" label="" />
          </div>
        ))}

        {/* Buildings */}
        {BUILDINGS.map((b) => (
          <div
            key={b.id}
            className="absolute cursor-pointer"
            style={{
              left: b.x * TILE_SIZE,
              top: b.y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
            }}
            onClick={() => setActiveBuilding(b)} // Mouse interaction support
          >
            <Sprite type={b.type} color={b.color} label={b.label} />
          </div>
        ))}

        {/* Player */}
        <div
          className="absolute z-30 transition-transform"
          style={{
            width: TILE_SIZE,
            height: TILE_SIZE,
            left: playerPos.x,
            top: playerPos.y,
            transform: `scaleX(${facing === 'left' ? -1 : 1})`
          }}
        >
          {/* Character Sprite */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Shadow */}
            <div className="absolute bottom-1 w-10 h-3 bg-black/30 rounded-full"></div>
            
            {/* Body */}
            <div className={`w-10 h-12 bg-blue-500 border-4 border-black relative ${isMoving ? 'animate-bounce-slow' : ''}`}>
              {/* Face */}
              <div className="absolute top-2 left-1 w-2 h-2 bg-black"></div> {/* Eye L */}
              <div className="absolute top-2 right-1 w-2 h-2 bg-black"></div> {/* Eye R */}
              <div className="absolute bottom-2 left-3 w-4 h-1 bg-black"></div> {/* Mouth */}
              
              {/* Hat */}
              <div className="absolute -top-3 -left-2 w-14 h-4 bg-red-500 border-4 border-black"></div>
              <div className="absolute -top-6 left-2 w-6 h-4 bg-red-600 border-4 border-black"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Prompt */}
      {!activeBuilding && BUILDINGS.some(b => {
         const pRect = { x: playerPos.x - 10, y: playerPos.y - 10, w: TILE_SIZE + 20, h: TILE_SIZE + 20 };
         const bRect = { x: b.x * TILE_SIZE, y: b.y * TILE_SIZE, w: TILE_SIZE, h: TILE_SIZE };
         return (
            pRect.x < bRect.x + bRect.w &&
            pRect.x + pRect.w > bRect.x &&
            pRect.y < bRect.y + bRect.h &&
            pRect.y + pRect.h > bRect.y
         );
      }) && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 animate-pulse-fast">
          <div className="bg-white text-black px-4 py-2 border-4 border-black font-bold text-sm shadow-[4px_4px_0_#000]">
            PRESS SPACE TO ENTER
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal building={activeBuilding} onClose={() => setActiveBuilding(null)} />
    </div>
  );
}