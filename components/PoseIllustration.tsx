import React from "react";

interface PoseIllustrationProps {
  poseId: string;
  className?: string;
}

export default function PoseIllustration({ poseId, className = "" }: PoseIllustrationProps) {
  // Common colors from the new wellness palette
  const strokeColor = "var(--accent-primary, #5BB8B0)";
  const fillColor = "var(--accent-secondary, #5AB890)";
  const highlightColor = "var(--accent-supporting, #5AA1B8)";

  const renderPose = () => {
    switch (poseId) {
      case "box-breathing":
      case "seated-meditation":
      case "diaphragmatic-breath":
      case "4-7-8-breath":
        // Seated cross-legged
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="30" r="12" fill={fillColor} />
            <path d="M50 42 V 75" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M50 50 C 35 55, 25 75, 25 75" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M50 50 C 65 55, 75 75, 75 75" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M30 85 C 40 80, 60 80, 70 85" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
          </svg>
        );

      case "childs-pose":
      case "childs-pose-wide":
      case "melting-heart":
        // Kneeling, folded forward
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="30" cy="70" r="10" fill={fillColor} />
            <path d="M30 80 L 80 80" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M30 80 C 40 50, 60 60, 70 70 L 80 80" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M70 70 L 90 75" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
          </svg>
        );

      case "cat-cow":
      case "cat-cow-neck":
      case "threading-needle":
      case "thread-needle-deep":
        // On all fours
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="75" cy="40" r="10" fill={fillColor} />
            <path d="M30 50 C 50 40, 60 40, 75 50" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M30 50 L 30 80" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M70 50 L 70 80" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M15 80 L 85 80" stroke={highlightColor} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        );

      case "savasana":
      case "warm-savasana":
      case "yoga-nidra-savasana":
      case "constructive-rest":
      case "legs-up-wall":
      case "legs-up-pcos":
        // Lying flat
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="20" cy="70" r="10" fill={fillColor} />
            <path d="M30 75 L 85 75" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M35 75 L 60 85" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M10 85 L 90 85" stroke={highlightColor} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        );

      case "standing-forward-fold":
      case "sun-salutation-a":
      case "sun-b":
        // Standing folded
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="70" r="10" fill={fillColor} />
            <path d="M60 80 L 60 30 C 50 20, 30 20, 30 50 L 30 80" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M60 40 L 40 80" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M20 85 L 80 85" stroke={highlightColor} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        );

      case "mountain-pose":
      case "chair-pose":
      case "warrior-1":
      case "warrior-2":
      case "warrior-2-pcos":
        // Standing abstract
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="20" r="10" fill={fillColor} />
            <path d="M50 30 V 60" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M50 60 L 35 90" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M50 60 L 65 90" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M50 35 L 25 50" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M50 35 L 75 50" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
          </svg>
        );

      case "cobra":
      case "locust":
      case "yin-sphinx":
        // Prone, chest up
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="75" cy="50" r="10" fill={fillColor} />
            <path d="M20 80 L 60 80 C 70 80, 75 70, 75 60" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M60 80 L 70 60" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M10 85 L 90 85" stroke={highlightColor} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        );
        
      default:
        // Generic lotus/flower shape for unmapped poses
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
            <circle cx="50" cy="50" r="25" stroke={highlightColor} strokeWidth="4" />
            <path d="M50 20 C 65 40, 65 60, 50 80 C 35 60, 35 40, 50 20" stroke={strokeColor} strokeWidth="4" />
            <path d="M20 50 C 40 35, 60 35, 80 50 C 60 65, 40 65, 20 50" stroke={strokeColor} strokeWidth="4" />
            <circle cx="50" cy="50" r="8" fill={fillColor} />
          </svg>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {renderPose()}
    </div>
  );
}
