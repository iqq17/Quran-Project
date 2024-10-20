import React, { useState, useRef } from 'react';
import { Button } from "./ui/button";
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mb-4">
      <audio ref={audioRef} src={audioSrc} />
      <Button onClick={togglePlayPause} className="flex items-center">
        {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
        {isPlaying ? 'Pause' : 'Play'} Audio
      </Button>
    </div>
  );
};

export default AudioPlayer;
