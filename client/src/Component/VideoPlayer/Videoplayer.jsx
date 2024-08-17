import React, { useRef, useState, useEffect } from 'react';
import Hammer from 'hammerjs';

const VideoPlayer = ({ videoSrc, nextVideo, showComments, showLocation }) => {
    const videoRef = useRef(null);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [tapCount, setTapCount] = useState(0);
  
  useEffect(() => {
    if (!videoRef.current) return;
    // Initialize Hammer.js
    const hammer = new Hammer(videoRef.current);

    hammer.on('tap', (e) => {
      videoRef.current.lastTapEvent = e;
      setTapCount((prev) => prev + 1);
    });

    hammer.on('press', (e) => {
      const { clientX } = e.pointers[0];
      const { width } = videoRef.current.getBoundingClientRect();
      if (clientX < width / 3) {
        videoRef.current.playbackRate = 0.5;
      } else if (clientX > (2 * width) / 3) {
        videoRef.current.playbackRate = 2;
      }
    });

    hammer.on('pressup', () => {
        videoRef.current.playbackRate = 1;
    });

    return () => {
      hammer.destroy();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (tapCount === 1) {
      timer = setTimeout(() => {
        handleSingleTap();
        setTapCount(0);
      }, 300);
    } else if (tapCount === 2) {
      timer = setTimeout(() => {
        handleDoubleTap();
        setTapCount(0);
      }, 300);
    } else if (tapCount === 3) {
      handleTripleTap();
      setTapCount(0);
    }
    return () => clearTimeout(timer);
  }, [tapCount]);

  const handleSingleTap = () => {
        const lastTapEvent = videoRef.current?.lastTapEvent;

    if (!lastTapEvent) return;

    const { width, height } = videoRef.current.getBoundingClientRect();
    const pointer = lastTapEvent.pointers[0];

    if (!pointer) return;

    const { clientX, clientY } = pointer;

    if (clientX > (2 * width) / 3 && clientY < height / 3) {
      // Single-tap on top-right corner
      showLocation();
    } else if (clientX < width / 3) {
      // Single-tap left
      videoRef.current.currentTime -= 10;
    } else if (clientX > (2 * width) / 3) {
      // Single-tap right
      videoRef.current.currentTime += 10;
    } else {
      // Single-tap middle
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  const handleDoubleTap = () => {
    const lastTapEvent = videoRef.current?.lastTapEvent;

    if (!lastTapEvent) return;

    const pointer = lastTapEvent.pointers[0];

    if (!pointer) return;

    const { clientX } = pointer;
    const { width } = videoRef.current.getBoundingClientRect();

    if (clientX < width / 3) {
      // Double-tap left
      videoRef.current.currentTime -= 10;
    } else if (clientX > (2 * width) / 3) {
      // Double-tap right
      videoRef.current.currentTime += 10;
    }
  };

  const handleTripleTap = () => {
    const lastTapEvent = videoRef.current?.lastTapEvent;

    if (!lastTapEvent) return;

    const pointer = lastTapEvent.pointers[0];

    if (!pointer) return;

    const { clientX } = pointer;
    const { width } = videoRef.current.getBoundingClientRect();

    if (clientX < width / 3) {
      // Three-tap left
      showComments();
    } else if (clientX > (2 * width) / 3) {
      // Three-tap right
      window.close();
    } else {
      // Three-tap middle
      nextVideo();
    }
  };

//   const handleTap = (e) => {
//     videoRef.current.lastTapEvent = e;
//     setTapCount((prev) => prev + 1);
//   };

//   const handleHold = (e) => {
//     const { clientX } = e.pointers[0];
//     const { width } = videoRef.current.getBoundingClientRect();

//     if (clientX < width / 3) {
//       // Hold left
//       videoRef.current.playbackRate = 0.5;
//     } else if (clientX > (2 * width) / 3) {
//       // Hold right
//       videoRef.current.playbackRate = 2;
//     }
//   };

//   const handleRelease = () => {
//     videoRef.current.playbackRate = 1;
//   };

  const handleKeyboardControls = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        videoRef.current.currentTime += 10;
        break;
      case 'ArrowLeft':
        videoRef.current.currentTime -= 10;
        break;
      case ' ':
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
        break;
      case 'n':
        nextVideo();
        break;
      case 'c':
        showComments();
        break;
      case 'l':
        showLocation();
        break;
      default:
        break;
    }
  };

  const handleMouseClick = (e) => {
    const { clientX, clientY } = e;
    const { width, height } = videoRef.current.getBoundingClientRect();

    if (clientX > (2 * width) / 3 && clientY < height / 3) {
      showLocation();
    } else if (clientX < width / 3) {
      videoRef.current.currentTime -= 10;
    } else if (clientX > (2 * width) / 3) {
      videoRef.current.currentTime += 10;
    } else {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  
  useEffect(() => {
    const currentVideoRef = videoRef.current;

    if (currentVideoRef) {
      window.addEventListener('keydown', handleKeyboardControls);
      currentVideoRef.addEventListener('click', handleMouseClick);
    }

    return () => {
      if (currentVideoRef) {
        window.removeEventListener('keydown', handleKeyboardControls);
        currentVideoRef.removeEventListener('click', handleMouseClick);
      }
    };
  }, [videoRef.current]);

  return (
        <video
          ref={videoRef}
          src={videoSrc}
          controls
        />
  );
};

export default VideoPlayer;
