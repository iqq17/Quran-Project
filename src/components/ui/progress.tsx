import React from "react"

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
  indicatorColor?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, max, className = "", indicatorColor = "bg-primary" }) => {
  const percentage = (value / max) * 100;

  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div
        className={`h-full transition-all ${indicatorColor}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
