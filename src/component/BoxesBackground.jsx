"use client";
import { useMemo } from "react";
import { cn } from "../utils/cn";
import "./BoxesBackground.css";

export const BoxesBackground = ({
  className,
  rows = 10,
  cols = 12,
  ...props
}) => {
  // Pre-generate color classes for each box (static, no re-renders)
  const colorClasses = useMemo(() => {
    const classes = ['box-cyan', 'box-purple', 'box-pink', 'box-green', 'box-gold'];
    return [...Array(rows * cols)].map(() => 
      classes[Math.floor(Math.random() * classes.length)]
    );
  }, [rows, cols]);

  return (
    <div
      className={cn("boxes-background-container", className)}
      {...props}
    >
      {/* Grid of boxes - CSS only hover, no JS state */}
      <div 
        className="boxes-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {colorClasses.map((colorClass, index) => (
          <div
            key={index}
            className={`box-item ${colorClass}`}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="boxes-gradient-top" />
      <div className="boxes-gradient-bottom" />
    </div>
  );
};

export default BoxesBackground;
