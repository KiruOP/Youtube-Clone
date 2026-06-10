// VideoCall.js
import React, { useRef, useState } from "react";
import useWebRTC from "../hooks/useWebRTC";
import useRecording from "../hooks/useRecording";

function VideoCall() {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const {
        startCall,
        endCall,
        toggleAudio,
        toggleVideo,
        startScreenShare,
        stopScreenShare,
    } = useWebRTC(localVideoRef, remoteVideoRef);

    const { startRecording, stopRecording, downloadRecording } = useRecording(
        localVideoRef,
        remoteVideoRef
    );

    const handleScreenShare = async () => {
        if (isScreenSharing) {
            await stopScreenShare();
        } else {
            await startScreenShare();
        }
        setIsScreenSharing(!isScreenSharing);
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
            <button onClick={startCall}>Start Call</button>
            <button onClick={endCall}>End Call</button>
            <button onClick={toggleAudio}>Toggle Audio</button>
            <button onClick={toggleVideo}>Toggle Video</button>
            <button onClick={handleScreenShare}>
                {isScreenSharing ? "Stop Screen Share" : "Start Screen Share"}
            </button>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <button onClick={downloadRecording}>Download Recording</button>
        </div>
    );
}

export default VideoCall;
