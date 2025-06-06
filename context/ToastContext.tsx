"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import Toast, { type ToastType, type ToastAction } from "@/components/ui/Toast";

interface ToastContextProps {
  showToast: (options: {
    type: ToastType;
    action?: ToastAction;
    message?: string;
    title?: string;
    duration?: number;
  }) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    visible: boolean;
    type: ToastType;
    action?: ToastAction;
    message?: string;
    title?: string;
    duration?: number;
  } | null>(null);

  const showToast = useCallback(
    ({
      type,
      action,
      message,
      title,
      duration = 3000,
    }: {
      type: ToastType;
      action?: ToastAction;
      message?: string;
      title?: string;
      duration?: number;
    }) => {
      setToast({
        visible: true,
        type,
        action,
        message,
        title,
        duration,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && toast.visible && (
        <Toast
          type={toast.type}
          action={toast.action}
          message={toast.message}
          title={toast.title}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
