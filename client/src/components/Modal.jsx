import React from 'react';

const Modal = ({ src, alt, onClose }) => {
  if (!src) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="relative max-w-full max-h-full p-4" onClick={(e) => e.stopPropagation()}>
        <span className="absolute top-3 right-20 text-gray-600 text-3xl cursor-pointer" onClick={onClose}>×</span>
        <img
          src={src}
          alt={alt}
          className="h-96 w-96 object-contain"
        />
      </div>
    </div>
  );
};

export default Modal;
