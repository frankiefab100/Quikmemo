"use client";

import {
  TriangleAlert,
  X,
  CircleCheck,
  AlertCircle,
  Archive,
  Star,
  Trash2,
  RotateCcw,
  Save,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastAction =
  | "create"
  | "update"
  | "delete"
  | "permanentDelete"
  | "restore"
  | "archive"
  | "unarchive"
  | "favorite"
  | "unfavorite"
  | "restoreAll"
  | "emptyTrash";

interface ToastProps {
  type: ToastType;
  action?: ToastAction;
  message?: string;
  onClose?: () => void;
  duration?: number;
  title?: string;
}

const Toast = ({
  type,
  action,
  message,
  title,
  onClose,
  duration = 3000,
}: ToastProps) => {
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

  // Get the appropriate icon based on action or type
  const getIcon = () => {
    if (action) {
      switch (action) {
        case "create":
          return <FileText className="h-5 w-5" />;
        case "update":
          return <Save className="h-5 w-5" />;
        case "delete":
        case "permanentDelete":
        case "emptyTrash":
          return <Trash2 className="h-5 w-5" />;
        case "restore":
        case "restoreAll":
          return <RotateCcw className="h-5 w-5" />;
        case "archive":
        case "unarchive":
          return <Archive className="h-5 w-5" />;
        case "favorite":
        case "unfavorite":
          return <Star className="h-5 w-5" />;
      }
    }

    // Default icons based on type
    switch (type) {
      case "success":
        return <CircleCheck className="h-5 w-5" />;
      case "error":
        return <TriangleAlert className="h-5 w-5" />;
      case "warning":
        return <AlertCircle className="h-5 w-5" />;
      case "info":
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  // Get the default message based on action
  const getDefaultMessage = () => {
    if (action) {
      switch (action) {
        case "create":
          return "Note created successfully";
        case "update":
          return "Note updated successfully";
        case "delete":
          return "Note moved to trash";
        case "permanentDelete":
          return "Note permanently deleted";
        case "restore":
          return "Note restored successfully";
        case "restoreAll":
          return "All notes restored successfully";
        case "emptyTrash":
          return "Trash emptied successfully";
        case "archive":
          return "Note archived successfully";
        case "unarchive":
          return "Note unarchived successfully";
        case "favorite":
          return "Note added to favorites";
        case "unfavorite":
          return "Note removed from favorites";
      }
    }

    // Default messages based on type
    switch (type) {
      case "success":
        return "Operation completed successfully";
      case "error":
        return "An error occurred";
      case "warning":
        return "Warning";
      case "info":
        return "Information";
    }
  };

  // Get the title based on action or type
  const getTitle = () => {
    if (title) return title;

    if (action) {
      switch (action) {
        case "create":
        case "update":
        case "restore":
        case "restoreAll":
          return "Success";
        case "delete":
          return "Note Trashed";
        case "permanentDelete":
        case "emptyTrash":
          return "Deleted";
        case "archive":
          return "Archived";
        case "unarchive":
          return "Unarchived";
        case "favorite":
          return "Added to Favorites";
        case "unfavorite":
          return "Removed from Favorites";
      }
    }

    // Default titles based on type
    switch (type) {
      case "success":
        return "Success";
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      case "info":
        return "Information";
    }
  };

  const bgColorMap = {
    success:
      "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 text-green-800 dark:text-green-300",
    error:
      "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-300",
    warning:
      "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300",
    info: "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-300",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex w-full max-w-sm items-center rounded-lg border p-4 shadow-md ${bgColorMap[type]}`}
      >
        <div className="mr-3 flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">{getTitle()}</h3>
          <p className="mt-1 text-xs opacity-90">
            {message || getDefaultMessage()}
          </p>
        </div>
        <button
          className="ml-4 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
