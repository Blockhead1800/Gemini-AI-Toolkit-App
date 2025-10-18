import React from 'react';

export const BrainCircuit: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5a3 3 0 1 0-5.993.129" /><path d="M12 5a3 3 0 1 1 5.993.129" /><path d="M15 12a3 3 0 1 0-5.993.129" /><path d="M15 12a3 3 0 1 1 5.993.129" /><path d="M5 19a3 3 0 1 0-5.993.129" /><path d="M5 19a3 3 0 1 1 5.993.129" /><path d="M19 19a3 3 0 1 0-5.993.129" /><path d="M19 19a3 3 0 1 1 5.993.129" /><path d="M12 12h.01" /><path d="M12 19h.01" /><path d="M12 5h.01" /><path d="M5 12H4.99" /><path d="M19 12h-.01" /><path d="M9 9.01V9" /><path d="M15 9.01V9" /><path d="M9 15v-.01" /><path d="M15 15v-.01" /><path d="m14.5 10.5-.866.5" /><path d="m10.366 13.5-.866.5" /><path d="m14.5 13.5.866.5" /><path d="m10.366 10.5.866.5" /><path d="M12 7.5v-1" /><path d="M12 17.5v-1" /><path d="m7.5 12-1 0" /><path d="m17.5 12-1 0" />
  </svg>
);

export const Loader: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const User: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

export const Bot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
  </svg>
);

export const Paperclip: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

export const Send: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
  </svg>
);

export const XCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
  </svg>
);

export const Graph: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
);

export const Code: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
);

export const Wolfram: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 1.99a.5.5 0 0 1 .5.5v2.53a.5.5 0 0 1-1 0V2.49a.5.5 0 0 1 .5-.5zm6.53.98a.5.5 0 0 1 .7.02l1.8 1.8a.5.5 0 0 1-.7.7l-1.8-1.8a.5.5 0 0 1-.01-.71zM3.68 4.77a.5.5 0 0 1 .7-.7l1.8 1.8a.5.5 0 0 1-.7.7l-1.8-1.8a.5.5 0 0 1 0-.7zM20 12.5a.5.5 0 0 1-.5.5h-2.53a.5.5 0 0 1 0-1h2.53a.5.5 0 0 1 .5.5zM5 12.5a.5.5 0 0 1-.5.5H2.47a.5.5 0 0 1 0-1H4.5a.5.5 0 0 1 .5.5zm13.3-6.02a.5.5 0 0 1 .7.7l-1.8 1.8a.5.5 0 0 1-.7-.7l1.8-1.8a.5.5 0 0 1 0 0zm-11.8 0a.5.5 0 0 1 .01.7l-1.8 1.8a.5.5 0 0 1-.7-.7l1.8-1.8a.5.5 0 0 1 .7 0zM12 19a.5.5 0 0 1 .5.5v2.51a.5.5 0 0 1-1 0V19.5a.5.5 0 0 1 .5-.5zm-4.52-1.22a.5.5 0 0 1 .7.7l-1.8 1.8a.5.5 0 1 1-.7-.7l1.8-1.8zm9.04 0a.5.5 0 0 1 .7-.01l1.8 1.8a.5.5 0 0 1-.7.7l-1.8-1.8a.5.5 0 0 1 0-.7zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/>
    </svg>
);

export const Expand: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" />
  </svg>
);

export const Shrink: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="M14 10l7-7" /><path d="M3 21l7-7" />
  </svg>
);

export const CheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const Trash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
    </svg>
);
