"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertData {
  type: AlertType;
  title?: string;
  message: string;
}

interface AlertContextType {
  showAlert: (type: AlertType, message: string, title?: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = useCallback(
    (type: AlertType, message: string, title?: string) => {
      setAlert({ type, message, title });
      setIsVisible(true);

      // Auto-hide after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setAlert(null), 300);
      }, 3000);
    },
    []
  );

  const hideAlert = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setAlert(null), 300);
  }, []);

  const getAlertStyles = (type: AlertType) => {
    switch (type) {
      case "success":
        return {
          className: "border-green-600 bg-green-50 text-green-900",
          icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
          defaultTitle: "Success!",
        };
      case "error":
        return {
          className: "border-red-600 bg-red-50 text-red-900",
          icon: <XCircle className="h-6 w-6 text-red-600" />,
          defaultTitle: "Error",
        };
      case "warning":
        return {
          className: "border-yellow-600 bg-yellow-50 text-yellow-900",
          icon: <AlertCircle className="h-6 w-6 text-yellow-600" />,
          defaultTitle: "Warning",
        };
      case "info":
        return {
          className: "border-blue-600 bg-blue-50 text-blue-900",
          icon: <Info className="h-6 w-6 text-blue-600" />,
          defaultTitle: "Info",
        };
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {/* Global Alert Overlay */}
      {alert && (
        <div
          className={`
            fixed inset-0 z-[9999] flex items-start pt-20 justify-center 
            pointer-events-none transition-opacity duration-300
            ${isVisible ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className={`
              pointer-events-auto 
              transition-all duration-300 transform
              ${isVisible ? "scale-100" : "scale-95"}
            `}
          >
            <Alert
              className={`
                w-96 shadow-2xl border-2
                ${getAlertStyles(alert.type).className}
              `}
            >
              {getAlertStyles(alert.type).icon}
              <AlertTitle className="text-lg font-bold ml-2">
                {alert.title || getAlertStyles(alert.type).defaultTitle}
              </AlertTitle>
              <AlertDescription className="text-sm ml-2 mt-1">
                {alert.message}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
}
