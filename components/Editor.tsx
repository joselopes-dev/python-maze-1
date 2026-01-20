
import React, { useState, useEffect } from 'react';
import { Challenge } from '../types';
import { runPythonCode } from '../services/pyodide';
import { getCodeHint } from '../services/gemini';

interface EditorProps {
  challenge: Challenge;
  onSuccess: (msg: string, output: string) => void;
  onCancel: () => void;
  onError: (msg: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ challenge, onSuccess, onCancel, onError }) => {
  const defaultComment = "# ESCREVA SEU CÓDIGO PYTHON ABAIXO\n";
  const [code, setCode] = useState(() => {
    return challenge.placeholder ? `${defaultComment}${challenge.placeholder}` : defaultComment;
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRun = async () => {
    setIsExecuting(true);
    setHint(null);
    setLocalError(null);
    const result = await runPythonCode(code);
    setIsExecuting(false);

    if (result.error) {
      const errorMsg = `❌ ERRO DE SINTAXE:\n${result.error}`;
      setLocalError(errorMsg);
      onError(errorMsg);
    } else {
      const validation = challenge.validate(result.output, code);
      if (validation.success) {
        setLocalError(null);
        onSuccess(validation.message, result.output);
      } else {
        const errorMsg = `⚠️ ALGORITMO INCORRETO:\nOutput: ${result.output}\n${validation.message}`;
        setLocalError(errorMsg);
        onError(errorMsg);
      }
    }
  };

  const handleHint = async () => {
    setIsExecuting(true);
    const resultHint = await getCodeHint(code, localError || "Incorreto", challenge.description);
    setHint(resultHint);
    setIsExecuting(false);
  };

  return (
    <div className="flex flex-col bg-slate-900 border-2 border-blue-500/50 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
      <div className="bg-blue-600 p-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
           <h3 className="font-game text-[8px] sm:text-[9px] text-white uppercase tracking-widest">Módulo: {challenge.title}</h3>
        </div>
        <button onClick={onCancel} className="text-white hover:text-red-300 p-1 font-bold">✕</button>
      </div>
      
      <div className="p-4 flex flex-col gap-3">
        {challenge.imageUrl && (
          <div className="w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex justify-center p-2 mb-1">
            <img 
              src={challenge.imageUrl} 
              alt="Desafio Visual" 
              className="max-h-24 sm:max-h-32 object-contain" 
            />
          </div>
        )}

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] text-blue-200 font-code leading-relaxed">
          <span className="text-blue-500 font-bold block mb-1 uppercase tracking-tighter">Missão:</span>
          {challenge.description}
        </div>

        {localError && (
          <div className="p-3 bg-red-900/40 border-2 border-red-500 text-red-400 font-code text-[10px] rounded-xl animate-error-flash shadow-lg">
            <span className="font-game text-[7px] block mb-1">ALERTA DE SISTEMA:</span>
            {localError}
          </div>
        )}

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-32 sm:h-48 bg-slate-950 text-emerald-400 font-code p-3 rounded-xl border border-slate-800 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-xs leading-relaxed resize-none shadow-inner"
        />

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={handleRun} 
            disabled={isExecuting}
            className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-game text-[8px] rounded-xl shadow-[0_4px_0_rgb(29,78,216)] active:translate-y-1 active:shadow-none disabled:opacity-50 uppercase transition-all"
          >
            {isExecuting ? 'Processando...' : 'Executar Código'}
          </button>
          <button 
            onClick={handleHint}
            disabled={isExecuting}
            className="py-3 bg-slate-800 hover:bg-slate-700 text-blue-400 font-game text-[8px] rounded-xl border border-slate-700 active:translate-y-1 uppercase transition-all"
          >
            Pedir Dica
          </button>
        </div>

        {hint && (
          <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-[9px] text-blue-300 animate-in fade-in duration-300">
            <span className="font-game text-[7px] text-blue-500 block mb-1 uppercase">Mentor IA:</span>
            "{hint}"
          </div>
        )}
      </div>
    </div>
  );
};