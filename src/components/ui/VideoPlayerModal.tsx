"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from "react-icons/fa";
import { HiX } from "react-icons/hi";

// Declare global properties for YT API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  aspectRatio?: "portrait" | "landscape";
}

// Global script loading coordinator for YouTube API
let apiLoaded = false;
let callbacks: Array<() => void> = [];

function loadYoutubeApi(callback: () => void) {
  if (typeof window === "undefined") return;

  if (window.YT && window.YT.Player) {
    callback();
    return;
  }

  callbacks.push(callback);

  if (apiLoaded) return;
  apiLoaded = true;

  const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
  if (!existingScript) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }

  const prevCallback = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    if (prevCallback) prevCallback();
    callbacks.forEach((cb) => cb());
    callbacks = [];
  };
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  videoUrl,
  aspectRatio = "landscape",
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Detect source type
  const isYoutube = videoUrl
    ? videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") || videoUrl.includes("shorts/")
    : false;

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const youtubeId = videoUrl && isYoutube ? getYoutubeId(videoUrl) : null;

  // Background scroll lock & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // ---------- YouTube Player API Lifecycle ----------
  useEffect(() => {
    if (!isOpen || !youtubeId || !isYoutube) return;

    let player: any;

    loadYoutubeApi(() => {
      if (!iframeRef.current) return;

      player = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (event: any) => {
            ytPlayerRef.current = event.target;
            setPlayerReady(true);
            
            // Set initial volume & play
            event.target.setVolume(volume);
            event.target.playVideo();
            setIsPlaying(true);

            const d = event.target.getDuration();
            if (d) setDuration(d);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              // Loop video automatically when finished
              event.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
      ytPlayerRef.current = null;
      setPlayerReady(false);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    };
  }, [isOpen, youtubeId, isYoutube]);

  // Poll YouTube progress
  useEffect(() => {
    if (!isPlaying || !playerReady || !isYoutube) return;

    const updateProgress = () => {
      if (ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
        const cur = ytPlayerRef.current.getCurrentTime();
        setCurrentTime(cur);
        const dur = ytPlayerRef.current.getDuration();
        if (dur) setDuration(dur);
      }
    };

    const interval = setInterval(updateProgress, 250);
    return () => clearInterval(interval);
  }, [isPlaying, playerReady, isYoutube]);

  // ---------- HTML5 Video Lifecycle ----------
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen || isYoutube) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleVolumeChange = () => {
      setVolume(Math.round(video.volume * 100));
      setIsMuted(video.muted);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("volumechange", handleVolumeChange);

    // Initial load
    if (video.duration) setDuration(video.duration);
    video.volume = volume / 100;
    video.muted = isMuted;

    // Autoplay local video when modal opens
    video.play().catch((err) => {
      console.debug("HTML5 Autoplay blocked:", err);
    });

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [isOpen, videoUrl, isYoutube]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto-hiding controls timeout
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // Controls triggers
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isYoutube) {
      if (!ytPlayerRef.current) return;
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
    } else {
      const video = videoRef.current;
      if (!video) return;
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
    if (isYoutube) {
      if (ytPlayerRef.current && ytPlayerRef.current.seekTo) {
        ytPlayerRef.current.seekTo(value, true);
      }
    } else {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = value;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isYoutube) {
      if (!ytPlayerRef.current) return;
      if (isMuted) {
        ytPlayerRef.current.unmute();
        setIsMuted(false);
        ytPlayerRef.current.setVolume(volume);
      } else {
        ytPlayerRef.current.mute();
        setIsMuted(true);
      }
    } else {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVolume(value);
    if (isYoutube) {
      if (ytPlayerRef.current && ytPlayerRef.current.setVolume) {
        ytPlayerRef.current.setVolume(value);
        if (value > 0 && isMuted) {
          ytPlayerRef.current.unmute();
          setIsMuted(false);
        } else if (value === 0 && !isMuted) {
          ytPlayerRef.current.mute();
          setIsMuted(true);
        }
      }
    } else {
      const video = videoRef.current;
      if (!video) return;
      video.volume = value / 100;
      if (value > 0) {
        video.muted = false;
        setIsMuted(false);
      } else {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Time formatter helper
  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop Blur Overlay */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-default"
            onClick={onClose}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
            aria-label="Close video player"
          >
            <HiX size={24} />
          </button>

          {/* Video Container Card */}
          <motion.div
            ref={containerRef}
            className={`relative z-10 bg-black overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)]
              ${isFullscreen 
                ? "w-screen h-screen rounded-none border-none flex items-center justify-center" 
                : aspectRatio === "portrait"
                  ? "w-full max-w-[min(400px,90vw)] aspect-[9/16] max-h-[80vh] md:max-h-[85vh] rounded-3xl"
                  : "w-full max-w-[min(800px,90vw)] aspect-video rounded-3xl"
              }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Conditional Video rendering (YouTube IFrame vs HTML5 Video) */}
            {isYoutube ? (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1`}
                className={`w-full h-full object-cover ${isFullscreen ? (aspectRatio === "portrait" ? "max-h-screen max-w-full aspect-[9/16]" : "max-h-screen max-w-full aspect-video") : ""}`}
                allow="autoplay; encrypted-media"
              />
            ) : (
              <video
                ref={videoRef}
                src={videoUrl}
                className={`w-full h-full object-cover ${isFullscreen ? (aspectRatio === "portrait" ? "max-h-screen max-w-full aspect-[9/16]" : "max-h-screen max-w-full aspect-video") : ""}`}
                playsInline
                preload="auto"
                onClick={() => togglePlay()}
              />
            )}

            {/* Click-intercepting overlay layer */}
            <div 
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={() => togglePlay()}
            />

            {/* Big center Play icon when paused */}
            {!isPlaying && (isYoutube ? playerReady : true) && (
              <div 
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 pointer-events-none"
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-blue-500/90 backdrop-blur-md flex items-center justify-center shadow-lg shadow-blue-500/40 border border-blue-400/40"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <FaPlay className="text-white ml-1.5" size={24} />
                </motion.div>
              </div>
            )}

            {/* Premium Custom Controls Overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  className="absolute inset-x-0 bottom-0 z-20 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 flex flex-col gap-4 pointer-events-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Progress & Seek Slider */}
                  <div className="flex flex-col gap-1 w-full">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeekChange}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none transition-all duration-300 hover:h-1.5"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                          (currentTime / (duration || 1)) * 100
                        }%, rgba(255, 255, 255, 0.2) ${
                          (currentTime / (duration || 1)) * 100
                        }%, rgba(255, 255, 255, 0.2) 100%)`,
                      }}
                    />
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center justify-between">
                    {/* Play/Pause & Timeline */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                      </button>

                      <span className="text-white/80 text-xs font-mono select-none">
                        {formatTime(currentTime)} <span className="opacity-40">/</span> {formatTime(duration)}
                      </span>
                    </div>

                    {/* Controls right side: Volume & Fullscreen */}
                    <div className="flex items-center gap-4">
                      {/* Mute & Volume Control */}
                      <div className="flex items-center gap-2 group/volume">
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                        </button>

                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-0 opacity-0 group-hover/volume:w-16 group-hover/volume:opacity-100 transition-all duration-300 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                              isMuted ? 0 : volume
                            }%, rgba(255, 255, 255, 0.2) ${
                              isMuted ? 0 : volume
                            }%, rgba(255, 255, 255, 0.2) 100%)`,
                          }}
                        />
                      </div>

                      {/* Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                      >
                        {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
