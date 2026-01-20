
import React from 'react';
import { CellType, Position } from '../types';

interface MazeProps {
  grid: number[][];
  pos: Position;
  unlockedDoors: number[];
  robotImageUrl?: string; // Nova prop para imagem do robô
}

export const Maze: React.FC<MazeProps> = ({ grid, pos, unlockedDoors, robotImageUrl }) => {
  let doorCounter = 0;
  const isAllUnlocked = unlockedDoors.length >= 10;

  return (
    <div 
      className="grid gap-0.5 sm:gap-1 bg-slate-950/80 p-2 sm:p-3 rounded-2xl border-2 border-slate-800 shadow-2xl"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
        width: 'fit-content',
      }}
    >
      {grid.map((row, y) => (
        row.map((cell, x) => {
          let bgColor = "bg-transparent";
          let content = null;
          let isRobot = pos.x === x && pos.y === y;

          if (cell === CellType.WALL) bgColor = "bg-slate-800 rounded-[2px] shadow-inner";
          if (cell === CellType.START) bgColor = "bg-blue-900/20 border border-blue-500/20 rounded-sm";
          
          if (cell === CellType.END) {
            bgColor = isAllUnlocked 
              ? "bg-green-500/20 border-2 border-green-500 rounded-md animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
              : "bg-red-950 border-2 border-red-900 rounded-md";
            content = (
              <div className="flex flex-col items-center justify-center scale-75 sm:scale-90">
                <span className="text-xs sm:text-sm">{isAllUnlocked ? "🔓" : "🔒"}</span>
              </div>
            );
          }
          
          if (cell === CellType.DOOR) {
            doorCounter++;
            const isUnlocked = unlockedDoors.includes(doorCounter);
            bgColor = isUnlocked 
              ? "bg-emerald-500/10 border border-emerald-500/30 rounded-sm" 
              : "bg-amber-900/30 border border-amber-600/60 shadow-[0_0_8px_rgba(217,119,6,0.15)] rounded-sm";
            
            content = !isUnlocked ? (
               <span className="text-[7px] sm:text-[8px] font-game text-amber-500 font-bold">{doorCounter}</span>
            ) : (
               <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></div>
            );
          }

          return (
            <div 
              key={`${x}-${y}`} 
              className={`w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center transition-all duration-300 ${bgColor} relative`}
            >
              {content}
              {isRobot && (
                <div className="absolute inset-0 flex items-center justify-center z-10 p-0.5">
                  {robotImageUrl ? (
                    <img 
                      src={robotImageUrl} 
                      alt="Robot" 
                      className="w-full h-full object-contain animate-bounce transition-transform duration-200" 
                    />
                  ) : (
                    <div className="w-[85%] h-[85%] bg-yellow-400 rounded-sm border-[1.5px] border-yellow-700 shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-bounce flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                        <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      ))}
    </div>
  );
};
