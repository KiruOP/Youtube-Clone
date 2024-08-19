import { useEffect, useState } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

const socket = io('http://localhost:5353');

function useWebRTC(localVideoRef, remoteVideoRef) {
    const [peer, setPeer] = useState(null);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };
        getMedia();
    }, []);

    const startCall = () => {
        try {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    const newPeer = new Peer({ initiator: true, trickle: false, stream });
                    setPeer(newPeer);

                    newPeer.on('signal', data => {
                        socket.emit('call-user', { signalData: data, to: 'some-user-id' });
                    });

                    newPeer.on('stream', remoteStream => {
                        remoteVideoRef.current.srcObject = remoteStream;
                    });

                    socket.on('call-accepted', signal => {
                        newPeer.signal(signal);
                    });

                    newPeer.on('error', (err) => {
                        console.error('Peer connection error:', err);
                    });
                });
        } catch (error) {
            console.error('Error starting call:', error);
        }
    };

    const endCall = () => {
        if (peer) {
            peer.destroy();
            setPeer(null);
        }
    };

    const toggleAudio = () => {
        const audioTrack = localVideoRef.current.srcObject.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
    };

    const toggleVideo = () => {
        const videoTrack = localVideoRef.current.srcObject.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
    };

    const startScreenShare = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
            const videoTrack = screenStream.getVideoTracks()[0];
            const sender = peer.getSenders().find(s => s.track.kind === 'video');
            sender.replaceTrack(videoTrack);
        } catch (error) {
            console.error('Error starting screen share:', error);
        }
    };

    const stopScreenShare = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoTrack = stream.getVideoTracks()[0];
            const sender = peer.getSenders().find(s => s.track.kind === 'video');
            sender.replaceTrack(videoTrack);
        } catch (error) {
            console.error('Error stopping screen share:', error);
        }
    };

    return { startCall, endCall, toggleAudio, toggleVideo, startScreenShare, stopScreenShare };
}

export default useWebRTC;
