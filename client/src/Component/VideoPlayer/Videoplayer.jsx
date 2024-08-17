import React, { useRef, useState, useEffect } from 'react';
import Hammer from 'react-hammerjs';

const VideoPlayer = ({ videoSrc, nextVideo, showComments, showLocation }) => {
  const videoRef = useRef(null);
  const [tapCount, setTapCount] = useState(0);

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
    const { width, height } = videoRef.current.getBoundingClientRect();
    const { clientX, clientY } = videoRef.current.lastTapEvent.pointers[0];

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
    const { clientX } = videoRef.current.lastTapEvent.pointers[0];
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
    const { clientX } = videoRef.current.lastTapEvent.pointers[0];
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

  const handleTap = (e) => {
    videoRef.current.lastTapEvent = e;
    setTapCount((prev) => prev + 1);
  };

  const handleHold = (e) => {
    const { clientX } = e.pointers[0];
    const { width } = videoRef.current.getBoundingClientRect();

    if (clientX < width / 3) {
      // Hold left
      videoRef.current.playbackRate = 0.5;
    } else if (clientX > (2 * width) / 3) {
      // Hold right
      videoRef.current.playbackRate = 2;
    }
  };

  const handleRelease = () => {
    videoRef.current.playbackRate = 1;
  };

  return (
    <Hammer onTap={handleTap} onPress={handleHold} onPressUp={handleRelease}>
      <div style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          src={videoSrc}
          style={{ width: '100%' }}
          controls
        />
      </div>
    </Hammer>
  );
};

export default VideoPlayer;
