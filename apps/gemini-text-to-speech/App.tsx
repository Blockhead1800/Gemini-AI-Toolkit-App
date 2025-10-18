import React, { useState, useRef, useEffect } from 'react';
import { generateSpeech } from './services/geminiService';
import { VOICES } from './constants';
import { base64ToBlobUrl } from './utils/audioUtils';
import { VoiceSelector } from './components/VoiceSelector';
import { TextArea } from './components/TextArea';
import { GenerateButton } from './components/GenerateButton';
import { StatusDisplay } from './components/StatusDisplay';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState<string>(VOICES[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Ready');
  const [error, setError] = useState<string | null>(null);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);


  const audioRef = useRef<HTMLAudioElement>(null);

  // This effect manages the object URL's lifecycle to prevent memory leaks.
  useEffect(() => {
    // The return function is the cleanup function.
    // It runs when the component unmounts, or when audioUrl changes.
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // This effect syncs the component state with the audio element's state.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('durationchange', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause); // 'ended' event also fires 'pause'
    
    setCurrentTime(0); // Reset time when new audio is loaded

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('durationchange', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [audioUrl]);

  // Sync playback rate with the audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);


  const handleGenerateSpeech = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to generate speech.');
      return;
    }
    
    // Stop any currently playing audio
    if (audioRef.current) {
        audioRef.current.pause();
    }

    setIsLoading(true);
    setError(null);
    setStatus('Generating speech...');

    try {
      const audioData = await generateSpeech(inputText, selectedVoice);
      if (audioData) {
        const url = base64ToBlobUrl(audioData);
        setAudioUrl(url);
        setStatus('Speech generated successfully. Ready to play.');
      } else {
        throw new Error('Received no audio data from the API.');
      }
    } catch (e) {
      console.error('Error generating speech:', e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      setStatus('Error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
  
    if (audio.paused) {
      audio.play().catch(e => {
        console.error("Audio playback failed:", e);
        setError("Playback failed. Your browser may have blocked autoplay.");
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleRewind = () => {
    handleSeek(Math.max(0, currentTime - 5));
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl shadow-indigo-900/20 p-6 sm:p-8 space-y-6 border border-slate-700">
        <Header />

        <div className="space-y-4">
          <VoiceSelector
            selectedVoice={selectedVoice}
            onVoiceChange={setSelectedVoice}
            disabled={isLoading}
          />
          <TextArea
            value={inputText}
            onChange={setInputText}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <StatusDisplay status={status} error={error} />
          <GenerateButton
            isLoading={isLoading}
            onClick={handleGenerateSpeech}
            disabled={isLoading}
          />
        </div>

        {audioUrl && (
          <>
            <audio ref={audioRef} src={audioUrl} />
            <AudioPlayer
              isPlaying={isPlaying}
              duration={duration}
              currentTime={currentTime}
              playbackRate={playbackRate}
              onPlayPause={handlePlayPause}
              onSeek={handleSeek}
              onRewind={handleRewind}
              onSpeedChange={handleSpeedChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;