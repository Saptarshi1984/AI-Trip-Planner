// app/providers/LoadingProvider.tsx
'use client'
import React, { createContext, useContext, useState } from "react";
import Loading from "@/components/ux/Loading";

type LoadingContextType = {
  setPageLoading: (val: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
};

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);

  return (
    <LoadingContext.Provider value={{ setPageLoading: setShow }}>
      {children}
      <Loading show={show} />
    </LoadingContext.Provider>
  );
};

