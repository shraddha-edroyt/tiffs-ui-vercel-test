"use client";

import { createContext, useContext } from "react";

// --- Types ---
type RequestTab = { id: string; name: string; method: string; url: string; };
type SavedResponse = { id: string; name: string; data: any; status: string; time: string; size: string; };
type Request = { id: string; name: string; method: string; url: string; savedResponses?: SavedResponse[]; };
type Folder = { id: string; name: string; requests: Request[]; isExpanded?: boolean; };
type Collection = { id: string; name: string; folders: Folder[]; };

export type ApiContextType = {
  tabs: RequestTab[];
  activeTab: string;
  collections: Collection[];
  addTab: (tab?: Partial<RequestTab>) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, data: Partial<RequestTab>) => void;
  removeTab: (id: string) => void;
  addCollection: (name: string) => void;
  addFolder: (collectionId: string, name: string) => void;
  addRequest: (collectionId: string, folderId: string | null, request: Partial<Request>) => void;
  toggleFolder: (collectionId: string, folderId: string) => void;
  saveResponse: (requestId: string, response: any, status: string, time: string, size: string) => void;
};

export const ApiContext = createContext<ApiContextType>(null as any);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};