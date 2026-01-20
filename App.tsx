
import React, { useState, useEffect, useCallback } from 'react';
import { Maze } from './components/Maze';
import { Editor } from './components/Editor';
import { LEVELS } from './constants';
import { Position, GameState, CellType, Challenge } from './types';
import { initPyodide } from './services/pyodide';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('python_maze_quest_v9');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, isLevelWon: false, lastFeedback: { message: 'Sistemas Reiniciados.', type: 'info' } };
    }
    return {
      currentLevelIndex: 0,
      currentPos: { x: 1, y: 1 },
      unlockedDoors: [],
      completedChallenges: [],
      isLevelWon: false,
      lastFeedback: { message: 'Use WASD ou as setas para mover o robô.', type: 'info' }
    };
  });

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentLevel = LEVELS[gameState.currentLevelIndex];

  useEffect(() => {
    initPyodide().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('python_maze_quest_v9', JSON.stringify({
      currentLevelIndex: gameState.currentLevelIndex,
      currentPos: gameState.currentPos,
      unlockedDoors: gameState.unlockedDoors,
      completedChallenges: gameState.completedChallenges
    }));
  }, [gameState]);

  const nextLevel = () => {
    setGameState(prev => {
      const nextIndex = prev.currentLevelIndex + 1;
      if (nextIndex >= LEVELS.length) {
        return {
          ...prev,
          isLevelWon: false,
          lastFeedback: { message: 'MISSÃO CUMPRIDA: Você explorou todos os setores!', type: 'success' }
        };
      }
      return {
        currentLevelIndex: nextIndex,
        currentPos: { x: 1, y: 1 },
        unlockedDoors: [],
        completedChallenges: [],
        isLevelWon: false,
        lastFeedback: { message: `Entrando no Setor ${nextIndex + 1}... Sistemas prontos.`, type: 'info' }
      };
    });
  };

  const handleMove = useCallback((dx: number, dy: number) => {
    if (activeChallenge || gameState.isLevelWon) return;

    const newX = gameState.currentPos.x + dx;
    const newY = gameState.currentPos.y + dy;
    const grid = currentLevel.grid;

    if (newY < 0 || newY >= grid.length || newX < 0 || newX >= grid[0].length) return;

    const cell = grid[newY][newX];
    if (cell === CellType.WALL) return;

    if (cell === CellType.END) {
      if (gameState.unlockedDoors.length >= 10) {
        setGameState(prev => ({ ...prev, currentPos: { x: newX, y: newY }, isLevelWon: true }));
      } else {
        setGameState(prev => ({ 
          ...prev, 
          lastFeedback: { 
            message: `🔒 SAÍDA BLOQUEADA: Resolva todos os 10 terminais primeiro!`, 
            type: 'error' 
          } 
        }));
      }
      return;
    }

    if (cell === CellType.DOOR) {
      let doorCounter = 0;
      let targetDoorId = -1;
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
          if (grid[r][c] === CellType.DOOR) {
            doorCounter++;
            if (r === newY && c === newX) {
              targetDoorId = doorCounter;
              break;
            }
          }
        }
        if (targetDoorId !== -1) break;
      }

      if (targetDoorId !== -1) {
        if (gameState.unlockedDoors.includes(targetDoorId)) {
          setGameState(prev => ({ ...prev, currentPos: { x: newX, y: newY }, lastFeedback: { message: null, type: null } }));
        } else {
          setActiveChallenge(currentLevel.challenges[targetDoorId - 1]);
        }
        return;
      }
    }

    setGameState(prev => ({ ...prev, currentPos: { x: newX, y: newY }, lastFeedback: { message: null, type: null } }));
  }, [activeChallenge, gameState, currentLevel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeChallenge) return;
      
      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault();
      }

      switch (key) {
        case 'w':
        case 'arrowup':
          handleMove(0, -1);
          break;
        case 's':
        case 'arrowdown':
          handleMove(0, 1);
          break;
        case 'a':
        case 'arrowleft':
          handleMove(-1, 0);
          break;
        case 'd':
        case 'arrowright':
          handleMove(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, activeChallenge]);

  if (isLoading) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-game text-[8px] text-blue-400 animate-pulse uppercase tracking-widest">Sincronizando Python Core...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-2 sm:p-6 font-sans">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-sm sm:text-lg font-game text-blue-500 tracking-tighter">PYTHON MAZE</h1>
          <p className="text-[7px] sm:text-[9px] font-game text-slate-500 uppercase mt-1">Setor {currentLevel.id}/20: {currentLevel.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${gameState.unlockedDoors.length === 10 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-[8px] font-game text-slate-400">{gameState.unlockedDoors.length}/10</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="bg-slate-900/40 p-3 sm:p-6 rounded-[2rem] border border-slate-800/50 flex flex-col items-center shadow-xl backdrop-blur-sm">
          <div className="max-w-full overflow-auto p-2">
            <Maze 
              grid={currentLevel.grid} 
              pos={gameState.currentPos} 
              unlockedDoors={gameState.unlockedDoors} 
              robotImageUrl={currentLevel.robotImageUrl} 
            />
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-2 lg:hidden">
            <div />
            <button onClick={() => handleMove(0, -1)} className="w-12 h-12 bg-slate-800 border-2 border-slate-700 rounded-xl flex items-center justify-center active:bg-blue-600 transition-colors">▲</button>
            <div />
            <button onClick={() => handleMove(-1, 0)} className="w-12 h-12 bg-slate-800 border-2 border-slate-700 rounded-xl flex items-center justify-center active:bg-blue-600 transition-colors">◀</button>
            <button onClick={() => handleMove(0, 1)} className="w-12 h-12 bg-slate-800 border-2 border-slate-700 rounded-xl flex items-center justify-center active:bg-blue-600 transition-colors">▼</button>
            <button onClick={() => handleMove(1, 0)} className="w-12 h-12 bg-slate-800 border-2 border-slate-700 rounded-xl flex items-center justify-center active:bg-blue-600 transition-colors">▶</button>
          </div>
        </div>

        <aside className="space-y-4">
          {activeChallenge ? (
            <Editor 
              challenge={activeChallenge} 
              onSuccess={(msg, output) => {
                setGameState(prev => ({
                  ...prev,
                  unlockedDoors: [...prev.unlockedDoors, activeChallenge.id],
                  lastFeedback: { message: `✅ SUCESSO!\nOutput: ${output}`, type: 'success' }
                }));
                setActiveChallenge(null);
              }}
              onError={(msg) => setGameState(prev => ({ ...prev, lastFeedback: { message: msg, type: 'error' } }))}
              onCancel={() => setActiveChallenge(null)}
            />
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 rounded-[2rem] p-6 shadow-xl flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <span className="text-xl">🤖</span>
                <h3 className="font-game text-[9px] text-blue-400 uppercase tracking-widest">Status</h3>
              </div>
              
              <div className={`p-5 rounded-2xl border-l-4 font-code text-xs min-h-[140px] transition-all duration-300 ${
                gameState.lastFeedback.type === 'success' ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400' :
                gameState.lastFeedback.type === 'error' ? 'bg-red-950/20 border-red-500 text-red-400 animate-error-flash' :
                'bg-slate-950 border-blue-500 text-blue-300 shadow-inner'
              }`}>
                {gameState.lastFeedback.message || "Robô aguardando comandos de movimento (WASD)."}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-[7px] font-game text-slate-500">
                   <span>TERMINAIS</span>
                   <span>{gameState.unlockedDoors.length}/10</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(gameState.unlockedDoors.length / 10) * 100}%` }}></div>
                </div>
                {gameState.unlockedDoors.length === 10 && (
                  <p className="text-[7px] font-game text-green-500 text-center animate-bounce uppercase">Saída Liberada!</p>
                )}
              </div>
            </div>
          )}
        </aside>
      </main>

      {gameState.isLevelWon && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
          <div className="bg-slate-900 border-2 border-emerald-500/30 p-10 rounded-[2.5rem] text-center max-w-sm shadow-2xl">
            <span className="text-6xl block mb-6 animate-bounce">🏁</span>
            <h2 className="text-xl font-game text-emerald-400 mb-4 uppercase">Setor Limpo</h2>
            <p className="text-slate-400 mb-8 font-game text-[8px] leading-relaxed uppercase opacity-80">Você hackeou todos os terminais e encontrou a saída.</p>
            <button onClick={nextLevel} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-game text-[10px] rounded-xl transition-all shadow-[0_5px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none uppercase">Próxima Fase</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;