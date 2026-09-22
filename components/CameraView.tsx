"use client";

import { useEffect, useRef } from "react";
import { usePoseDetection } from "@/hooks/usePoseDetection";

interface CameraViewProps {
  stream: MediaStream;
  accentColor: string;
}

export default function CameraView({ stream, accentColor }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { isModelLoaded, poses, startDetection, stopDetection } = usePoseDetection(videoRef);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (isModelLoaded) {
      startDetection();
    }
    return () => stopDetection();
  }, [isModelLoaded, startDetection, stopDetection]);

  useEffect(() => {
    // draw on canvas
    if (canvasRef.current && videoRef.current && window.poseDetection) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      
      const { videoWidth, videoHeight } = videoRef.current;
      if (videoWidth && videoHeight) {
        if (canvasRef.current.width !== videoWidth) canvasRef.current.width = videoWidth;
        if (canvasRef.current.height !== videoHeight) canvasRef.current.height = videoHeight;
      }

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      if (poses.length > 0) {
        const keypoints = poses[0].keypoints;

        // Draw connections
        const connections = window.poseDetection.util.getAdjacentPairs(window.poseDetection.SupportedModels.MoveNet);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 4;

        connections.forEach(([i, j]: number[]) => {
          const kp1 = keypoints[i];
          const kp2 = keypoints[j];

          if (kp1.score != null && kp1.score > 0.3 && kp2.score != null && kp2.score > 0.3) {
            ctx.beginPath();
            ctx.moveTo(kp1.x, kp1.y);
            ctx.lineTo(kp2.x, kp2.y);
            ctx.stroke();
          }
        });

        // Draw keypoints
        ctx.fillStyle = "white";
        keypoints.forEach((kp: any) => {
          if (kp.score != null && kp.score > 0.3) {
            ctx.beginPath();
            ctx.arc(kp.x, kp.y, 6, 0, 2 * Math.PI);
            ctx.fill();
          }
        });
      }
    }
  }, [poses, accentColor]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
        onLoadedMetadata={() => {
            if (videoRef.current) {
                videoRef.current.width = videoRef.current.videoWidth;
                videoRef.current.height = videoRef.current.videoHeight;
            }
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
      />
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-4">
             <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: `${accentColor} transparent transparent transparent` }} />
             <p className="text-sm font-display font-medium text-white">Loading AI Model...</p>
          </div>
        </div>
      )}
    </div>
  );
}
