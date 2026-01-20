
export enum CellType {
  EMPTY = 0,
  WALL = 1,
  DOOR = 2,
  START = 3,
  END = 4,
}

export interface Position {
  x: number;
  y: number;
}

export interface Challenge {
  id: number;
  level: 1 | 2 | 3;
  title: string;
  description: string;
  placeholder: string;
  imageUrl?: string; // Nova propriedade para imagem/gif do desafio
  validate: (output: string, code: string) => { success: boolean; message: string };
}

export interface LevelData {
  id: number;
  title: string;
  grid: number[][];
  challenges: Challenge[];
  robotImageUrl?: string; // Nova propriedade para skin do robô por nível
}

export interface GameState {
  currentLevelIndex: number;
  currentPos: Position;
  unlockedDoors: number[];
  completedChallenges: number[];
  isLevelWon: boolean;
  lastFeedback: { message: string; type: 'success' | 'error' | 'info' | null };
}
