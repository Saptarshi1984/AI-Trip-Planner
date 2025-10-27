"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";

type LoadingState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const LoadingContext = createContext<LoadingState | null>(null);

export function LoadingProvider({
  children,
  initial = false,
}: { children: ReactNode; initial?: boolean }) {
  const state = useState<boolean>(initial);
  return <div><LoadingContext.Provider value={state}>{children}</LoadingContext.Provider></div>;
}

export function useLoading(): LoadingState {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within <LoadingProvider>");
  return ctx;
}
