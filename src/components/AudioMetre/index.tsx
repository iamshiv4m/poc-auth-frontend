import React, { useEffect, useRef, useState } from "react";

const AudioInputLevel: React.FC = () => {
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [isMicConnected, setIsMicConnected] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    const checkMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setIsMicConnected(true);
        initializeAudio(stream);
      } catch (error) {
        console.error("Microphone not connected", error);
        setIsMicConnected(false);
      }
    };

    checkMicrophone();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initializeAudio = (stream: MediaStream) => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;
    dataArrayRef.current = new Uint8Array(
      analyserRef.current.frequencyBinCount
    );
    monitorAudioLevel();
  };

  const monitorAudioLevel = () => {
    const updateAudioLevel = () => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const avg =
          dataArrayRef.current.reduce((a, b) => a + b, 0) /
          dataArrayRef.current.length;
        setAudioLevel(avg);
        requestAnimationFrame(updateAudioLevel);
      }
    };
    updateAudioLevel();
  };

  const meterStyle = {
    height: "50px",
    width: "100%",
    background: "#ddd",
    position: "relative" as "relative",
  };

  const indicatorStyle = {
    height: "100%",
    background: "linear-gradient(to right, green, yellow, red)",
    position: "absolute" as "absolute",
    left: "0",
    top: "0",
    width: `${audioLevel}%`,
  };

  return (
    <div>
      <h2>Start Speaking To Test Your Audio</h2>
      <div style={meterStyle}>
        <div style={indicatorStyle}></div>
      </div>
      <p>
        {isMicConnected ? "Testing Your Audio" : "Microphone not connected"}
      </p>
    </div>
  );
};

export default AudioInputLevel;
