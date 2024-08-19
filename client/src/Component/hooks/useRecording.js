// useRecording.js
import { useState } from 'react';

function useRecording(localVideoRef, remoteVideoRef) {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const startRecording = () => {
        const stream = new MediaStream([
            ...localVideoRef.current.srcObject.getTracks(),
            ...remoteVideoRef.current.srcObject.getTracks()
        ]);

        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = event => {
            if (event.data.size > 0) {
                setRecordedChunks(prev => [...prev, event.data]);
            }
        };

        recorder.start();
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    const downloadRecording = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'recording.webm';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return { startRecording, stopRecording, downloadRecording };
}

export default useRecording;
