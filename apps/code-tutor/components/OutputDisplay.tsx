import React, { useEffect, useMemo, useRef } from 'react';
import { CodeIcon } from './icons';

// Declare global variables for libraries loaded via CDN
declare var marked: {
  parse(markdown: string): string;
};
declare var hljs: {
  highlightElement(element: HTMLElement): void;
};

interface OutputDisplayProps {
  text: string;
  isLoading: boolean;
}

// SVG strings for the copy button states
const copyIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`;
const clipboardCheckIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`;

const OutputDisplay: React.FC<OutputDisplayProps> = ({ text, isLoading }) => {
    const outputRef = useRef<HTMLDivElement>(null);

    const parsedHtml = useMemo(() => {
        if (!text || typeof marked === 'undefined') return '';
        try {
            return marked.parse(text);
        } catch (e) {
            console.error("Markdown parsing error:", e);
            return text; // Fallback to plain text on error
        }
    }, [text]);

    useEffect(() => {
        if (outputRef.current && typeof hljs !== 'undefined') {
            const codeBlocks = outputRef.current.querySelectorAll('pre code');
            codeBlocks.forEach((block) => {
                try {
                    hljs.highlightElement(block as HTMLElement);
                } catch (e) {
                    console.error("Highlighting error:", e);
                }
            });

            const pres = outputRef.current.querySelectorAll('pre');
            pres.forEach(pre => {
                if (pre.querySelector('.copy-button')) return;

                pre.classList.add('relative');

                const button = document.createElement('button');
                button.className = 'copy-button absolute top-2 right-2 p-1.5 bg-slate-900/50 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-200';
                button.ariaLabel = 'Copy code';
                button.innerHTML = copyIconSVG;

                button.addEventListener('click', () => {
                    const codeToCopy = pre.querySelector('code')?.innerText || '';
                    navigator.clipboard.writeText(codeToCopy).then(() => {
                        button.innerHTML = clipboardCheckIconSVG;
                        setTimeout(() => {
                            button.innerHTML = copyIconSVG;
                        }, 2000);
                    });
                });
                pre.appendChild(button);
            });
        }
    }, [parsedHtml]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
                    <p className="text-slate-400">Tutor is thinking...</p>
                </div>
            </div>
        );
    }

    if (!text) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <CodeIcon />
                    <h2 className="mt-4 text-xl font-semibold text-slate-100">Welcome to Code Tutor</h2>
                    <p className="mt-2 text-slate-400">Paste your code on the left, select a language and an action, and see the magic happen!</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={outputRef}
            className="prose prose-invert prose-sm md:prose-base max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
    );
};

export default OutputDisplay;