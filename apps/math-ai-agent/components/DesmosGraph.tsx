
import React, { useRef, useEffect, useState } from 'react';
import { Graph, Expand, Shrink } from './Icons';

declare const Desmos: any;

const DESMOS_API_URL = 'https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';

interface DesmosGraphProps {
  expressions: string | string[];
}

const latexifyExpression = (expr: string): string => {
  const functions = [
    'sin', 'cos', 'tan', 'csc', 'sec', 'cot', 
    'log', 'ln', 'sqrt', 
    'arcsin', 'arccos', 'arctan',
    'sinh', 'cosh', 'tanh'
  ];
  const regex = new RegExp(`(?<!\\\\)\\b(${functions.join('|')})\\b`, 'g');
  return expr.replace(regex, '\\$1');
};

const DesmosGraph: React.FC<DesmosGraphProps> = ({ expressions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const graphInstance = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isApiReady, setIsApiReady] = useState(typeof Desmos !== 'undefined');
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  useEffect(() => {
      const handleFullscreenChange = () => {
          setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Effect to load and wait for the Desmos API
  useEffect(() => {
    if (isApiReady) {
      return;
    }
    
    let script = document.querySelector(`script[src="${DESMOS_API_URL}"]`) as HTMLScriptElement;

    const handleScriptLoad = () => {
      setIsApiReady(true);
    };

    const handleScriptError = () => {
      setLoadError('Failed to load the Desmos graphing library. Please check your connection.');
      console.error('Failed to load Desmos API script.');
    };

    if (script) {
        // If script is already in DOM, it might be loading or loaded.
        if (script.dataset.loaded) {
            handleScriptLoad();
        } else {
            script.addEventListener('load', handleScriptLoad);
            script.addEventListener('error', handleScriptError);
        }
    } else {
        script = document.createElement('script');
        script.src = DESMOS_API_URL;
        script.async = true;
        script.addEventListener('load', () => {
            script.dataset.loaded = 'true';
            handleScriptLoad();
        });
        script.addEventListener('error', handleScriptError);
        document.body.appendChild(script);
    }
    
    return () => {
        script.removeEventListener('load', handleScriptLoad);
        script.removeEventListener('error', handleScriptError);
    };
  }, [isApiReady]);


  // Effect to initialize or update the graph once API is ready
  useEffect(() => {
    if (!isApiReady || !calculatorRef.current || loadError) {
      return;
    }

    try {
      if (!graphInstance.current) {
        graphInstance.current = Desmos.GraphingCalculator(calculatorRef.current, {
          keypad: false,
          expressions: true,
          expressionsCollapsed: true,
          settingsMenu: true,
          zoomButtons: true,
        });
      }

      const expressionsArray = Array.isArray(expressions) ? expressions : [expressions];
      const validExpressions = expressionsArray
        .filter(expr => typeof expr === 'string' && expr.trim() !== '')
        .map((expr, i) => ({
          id: `graph${i}`,
          latex: latexifyExpression(expr),
        }));

      if (validExpressions.length > 0) {
        graphInstance.current.setExpressions(validExpressions);
        graphInstance.current.setViewport([-10, 10, -10, 10]);
      } else {
        graphInstance.current.setBlank();
      }
    } catch (error) {
      console.error("Error with Desmos graph:", error);
      setLoadError("An error occurred while rendering the graph.");
    }
  }, [isApiReady, expressions, loadError]);


  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (graphInstance.current) {
        graphInstance.current.destroy();
        graphInstance.current = null;
      }
    };
  }, []);


  return (
    <div ref={containerRef} className={`${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 p-4 flex' : 'mt-2'}`}>
      <div className="bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700 w-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Graph className="w-5 h-5 text-green-400 mr-2" />
            <h3 className="font-semibold text-slate-200">Desmos Graph</h3>
          </div>
          <button onClick={handleToggleFullscreen} className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700">
            {isFullscreen ? <Shrink className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
          </button>
        </div>
        <div ref={calculatorRef} className={`w-full rounded-md overflow-hidden flex items-center justify-center ${isFullscreen ? 'flex-1' : 'h-96'}`}>
           {loadError && <div className="p-4 text-center text-red-400">{loadError}</div>}
           {!isApiReady && !loadError && <div className="p-4 text-center text-slate-400">Loading graph...</div>}
        </div>
      </div>
    </div>
  );
};

export default DesmosGraph;
