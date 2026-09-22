"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function usePoseDetection(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [poses, setPoses] = useState<any[]>([]);
  const detectorRef = useRef<any>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadModel() {
      // Wait for scripts to load
      while (!window.tf || !window.poseDetection) {
        await new Promise(r => setTimeout(r, 100));
      }
      
      await window.tf.ready();
      const detector = await window.poseDetection.createDetector(
        window.poseDetection.SupportedModels.MoveNet,
        { modelType: window.poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
      );
      if (isMounted) {
        detectorRef.current = detector;
        setIsModelLoaded(true);
      }
    }
    loadModel();

    return () => {
      isMounted = false;
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
    };
  }, []);

  const detectPose = useCallback(async () => {
    if (detectorRef.current && videoRef.current && videoRef.current.readyState === 4) {
      try {
        const detectedPoses = await detectorRef.current.estimatePoses(videoRef.current);
        setPoses(detectedPoses);
      } catch (err) {
        console.error("Pose detection error:", err);
      }
    }
    rafId.current = requestAnimationFrame(detectPose);
  }, [videoRef]);

  const startDetection = useCallback(() => {
    if (!rafId.current) {
      detectPose();
    }
  }, [detectPose]);

  const stopDetection = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, [stopDetection]);

  return { isModelLoaded, poses, startDetection, stopDetection };
}
