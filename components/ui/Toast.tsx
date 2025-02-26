"use client";

import { TriangleAlert, X, CircleCheck, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ToastProps {
  type: "success" | "error" | "warning";
  message?: string;
  onClose?: () => void;
  duration?: number;
}

const Toast = ({ type, message, onClose, duration = 3000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const iconMap = {
    success: <CircleCheck className="h-6 w-6" />,
    error: <TriangleAlert className="h-6 w-6" />,
    warning: <AlertCircle className="h-6 w-6" />,
  };

  const messageMap = {
    success: "Note saved successfully!",
    error: "Failed to save note!",
    warning: "Note not found!",
  };

  const bgColorMap = {
    success: "border-green-200 bg-green-50 text-green-800",
    error: "border-red-200 bg-red-50 text-red-800",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`flex w-full max-w-sm items-center rounded-lg border p-4 ${bgColorMap[type]}`}
      >
        <div className="mr-3 flex-shrink-0">{iconMap[type]}</div>
        <h3 className="text-sm font-medium">{message || messageMap[type]}</h3>
        <button
          className="ml-auto inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
