"use client";

import React, { useState, useRef, useCallback } from "react";
import SinglePixelPopup from "./SinglePixelPopup";
import BatchSelectionPopup from "./BatchSelectionPopup";

const PixelGrid: React.FC = () => {
  const [selectionStart, setSelectionStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSinglePixelPopup, setShowSinglePixelPopup] = useState(false);
  const [showBatchSelectionPopup, setShowBatchSelectionPopup] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const getCoordinates = useCallback((e: React.MouseEvent) => {
    if (!gridRef.current) return { x: 0, y: 0 };
    const rect = gridRef.current.getBoundingClientRect();
    return {
      x: Math.floor(e.clientX - rect.left),
      y: Math.floor(e.clientY - rect.top),
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const coords = getCoordinates(e);
    setSelectionStart(coords);
    setSelectionEnd(coords);
    setIsSelecting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSelecting) return;
    const coords = getCoordinates(e);
    setSelectionEnd(coords);
  };

  const handleMouseUp = async () => {
    setIsSelecting(false);
    if (selectionStart && selectionEnd) {
      const startX = Math.min(selectionStart.x, selectionEnd.x);
      const startY = Math.min(selectionStart.y, selectionEnd.y);
      const endX = Math.max(selectionStart.x, selectionEnd.x);
      const endY = Math.max(selectionStart.y, selectionEnd.y);

      if (startX === endX && startY === endY) {
        // Single pixel selection
        setShowSinglePixelPopup(true);
      } else {
        // Batch selection
        setShowBatchSelectionPopup(true);
      }

      try {
        const response = await fetch("/api/pixel-batch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startX, startY, endX, endY }),
        });

        if (!response.ok) {
          throw new Error("Failed to save pixel batch");
        }

        const data = await response.json();
        console.log("Selection saved:", data);
      } catch (error) {
        console.error("Error saving selection:", error);
      }
    }
  };

  const handleClosePopup = () => {
    setShowSinglePixelPopup(false);
    setShowBatchSelectionPopup(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const selectionStyle =
    selectionStart && selectionEnd
      ? {
          position: "absolute" as const,
          left: `${Math.min(selectionStart.x, selectionEnd.x)}px`,
          top: `${Math.min(selectionStart.y, selectionEnd.y)}px`,
          width: `${Math.abs(selectionEnd.x - selectionStart.x)}px`,
          height: `${Math.abs(selectionEnd.y - selectionStart.y)}px`,
          backgroundColor: "rgba(0, 123, 255, 0.3)",
          border: "1px solid rgb(0, 123, 255)",
        }
      : {};

  return (
    <div
      ref={gridRef}
      className="relative w-[1000px] h-[1000px] border-2 border-gray-300 cursor-crosshair bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {selectionStart && selectionEnd && <div style={selectionStyle} />}
      {showSinglePixelPopup && selectionStart && (
        <SinglePixelPopup
          x={selectionStart.x}
          y={selectionStart.y}
          onClose={handleClosePopup}
        />
      )}
      {showBatchSelectionPopup && selectionStart && selectionEnd && (
        <BatchSelectionPopup
          startX={Math.min(selectionStart.x, selectionEnd.x)}
          startY={Math.min(selectionStart.y, selectionEnd.y)}
          endX={Math.max(selectionStart.x, selectionEnd.x)}
          endY={Math.max(selectionStart.y, selectionEnd.y)}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default PixelGrid;
