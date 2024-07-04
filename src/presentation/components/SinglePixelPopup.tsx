import React from "react";

interface SinglePixelPopupProps {
  x: number;
  y: number;
  onClose: () => void;
}

const SinglePixelPopup: React.FC<SinglePixelPopupProps> = ({
  x,
  y,
  onClose,
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from reaching the grid
    onClose();
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50"
      onClick={(e) => e.stopPropagation()} // Prevent clicks on the popup from reaching the grid
    >
      <h2 className="text-xl font-bold mb-4">Single Pixel Selected</h2>
      <p>
        Coordinates: (x{x}, y{y})
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};

export default SinglePixelPopup;
