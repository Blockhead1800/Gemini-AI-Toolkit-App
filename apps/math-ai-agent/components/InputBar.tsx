
import React, { useState, useRef, useCallback } from 'react';
import { type ImageFile } from '../types';
import { Paperclip, Send, XCircle } from './Icons';

interface InputBarProps {
  onSendMessage: (text: string, image?: ImageFile) => void;
  isLoading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<ImageFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (isLoading || (!text.trim() && !image)) return;
    onSendMessage(text, image ?? undefined);
    setText('');
    setImage(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };
  
  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if(file){
            setImage({ file, preview: URL.createObjectURL(file) });
        }
        event.preventDefault();
        return;
      }
    }
  }, []);

  return (
    <div className="bg-slate-800 p-3 rounded-lg shadow-inner">
      {image && (
        <div className="mb-3 relative w-32 h-32">
          <img src={image.preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
          <button
            onClick={() => setImage(null)}
            className="absolute -top-2 -right-2 bg-slate-700 rounded-full text-white hover:bg-red-500 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      )}
      <div className="flex items-center bg-slate-900 rounded-lg">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          onPaste={handlePaste}
          placeholder="Ask a math question or paste an image..."
          className="flex-1 bg-transparent p-3 text-slate-200 placeholder-slate-500 focus:outline-none resize-none"
          rows={1}
          disabled={isLoading}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-3 text-slate-400 hover:text-sky-400 disabled:opacity-50"
          disabled={isLoading}
        >
          <Paperclip className="w-6 h-6" />
        </button>
        <button
          onClick={handleSend}
          className="p-3 text-slate-400 hover:text-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || (!text.trim() && !image)}
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default InputBar;
