"use client";

import { Provider } from "react-redux";
import { store } from "../../services/store"; // Assuming your store is here

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}