import React from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { RewindIcon } from './icons/RewindIcon';

interface AudioPlayerProps {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  playbackRate: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onRewind: () => void;
  onSpeedChange: (rate: number) => void;
}

const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  duration,
  currentTime,
  playbackRate,
  onPlayPause,
  onSeek,
  onRewind,
  onSpeedChange,
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 space-y-3">
        <div className="relative h-2 bg-slate-600 rounded-full cursor-pointer group" onClick={(e) => {
            if (!duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * duration;
            onSeek(newTime);
        }}>
            <div
                className="absolute top-0 left-0 h-2 bg-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
            />
             <div
                className="absolute top-1/2 left-0 w-4 h-4 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%` }}
            />
        </div>
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={onRewind}
                    className="p-2 text-slate-300 hover:text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-indigo-500"
                    aria-label="Rewind 5 seconds"
                >
                    <RewindIcon />
                </button>
                <button
                    onClick={onPlayPause}
                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-indigo-500"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
            </div>

            <div className="flex items-center gap-4">
               <select
                value={playbackRate}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                className="bg-slate-700 text-slate-300 text-sm rounded-md py-1 border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                aria-label="Playback speed"
               >
                 {playbackSpeeds.map(speed => (
                    <option key={speed} value={speed}>
                        {speed === 1 ? `1x` : `${speed}x`}
                    </option>
                 ))}
               </select>

                <div className="text-sm font-mono text-slate-400 w-[90px] text-right">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>
        </div>
    </div>
  );
};