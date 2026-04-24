"use client";

import { useState } from "react";
import Sidebar from "@/features/apiplayground/component/Sidebar";
import { ApiContext } from "@/features/apiplayground/hooks/useApi";
import type { ApiContextType } from "@/features/apiplayground/hooks/useApi";


type RequestTab = { id: string; name: string; method: string; url: string; };
type SavedResponse = { id: string; name: string; data: any; status: string; time: string; size: string; };
type Request = { id: string; name: string; method: string; url: string; savedResponses?: SavedResponse[]; };
type Folder = { id: string; name: string; requests: Request[]; isExpanded?: boolean; };
type Collection = { id: string; name: string; folders: Folder[]; };

export default function ApisLayout({ children }: { children: React.ReactNode }) {
  // Sidebar Toggle State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Existing Data States
  const [tabs, setTabs] = useState<RequestTab[]>([
    { id: "1", name: "Create-user", method: "POST", url: "{{baseUrl}}/Create-user" },
  ]);
  const [activeTab, setActiveTab] = useState("1");
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: "col1",
      name: "Collection Name",
      folders: [
        {
          id: "folder1",
          name: "Folder",
          isExpanded: true,
          requests: [
            { id: "req1", name: "Create-user", method: "POST", url: "{{baseUrl}}/Create-user", savedResponses: [{ id: "sr1", name: "E.g. Saved response", data: {}, status: "200 OK", time: "120 ms", size: "1.2 KB" }] },
            { id: "req2", name: "Get User", method: "GET", url: "{{baseUrl}}/Create-user" },
            { id: "req3", name: "Update User", method: "PUT", url: "{{baseUrl}}/Create-user" },
            { id: "req4", name: "Delete User", method: "DELETE", url: "{{baseUrl}}/Create-user" },
          ]
        }
      ]
    },
    { id: "col2", name: "Auth APIs", folders: [] }
  ]);

  // --- Logic Functions (Context value ke liye) ---
  
  const addTab = (tab?: Partial<RequestTab>) => {
    const newTab: RequestTab = {
      id: Date.now().toString(),
      name: tab?.name || "New Request",
      method: tab?.method || "GET",
      url: tab?.url || "",
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const updateTab = (id: string, data: Partial<RequestTab>) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const removeTab = (id: string) => {
    setTabs((prev) => prev.filter((t) => t.id !== id));
    if (activeTab === id && tabs.length > 1) setActiveTab(tabs[0].id);
  };

  const addCollection = (name: string) => {
    setCollections([...collections, { id: Date.now().toString(), name, folders: [] }]);
  };

  const addFolder = (collectionId: string, name: string) => {
    setCollections(collections.map(col => 
      col.id === collectionId 
        ? { ...col, folders: [...col.folders, { id: Date.now().toString(), name, requests: [], isExpanded: true }] } 
        : col
    ));
  };

  const addRequest = (collectionId: string, folderId: string | null, request: Partial<Request>) => {
    // Implementation same as before...
    const newRequest: Request = { id: Date.now().toString(), name: request.name || "New Request", method: request.method || "GET", url: request.url || "" };
    setCollections(collections.map(col => {
        if (col.id === collectionId) {
            if (folderId) {
                 return { ...col, folders: col.folders.map(f => f.id === folderId ? { ...f, requests: [...f.requests, newRequest] } : f) };
            } else {
                 return { ...col, folders: [{ id: Date.now().toString(), name: "New Folder", requests: [newRequest], isExpanded: true }, ...col.folders] };
            }
        }
        return col;
    }));
  };

  const toggleFolder = (collectionId: string, folderId: string) => {
    setCollections(collections.map(col => 
      col.id === collectionId 
        ? { ...col, folders: col.folders.map(f => f.id === folderId ? { ...f, isExpanded: !f.isExpanded } : f) } 
        : col
    ));
  };

  const saveResponse = (requestId: string, response: any, status: string, time: string, size: string) => {
    console.log("Saving response...");
  };

  return (
    <ApiContext.Provider
      value={
        {
          tabs, activeTab, collections, addTab, setActiveTab, updateTab, removeTab,
          addCollection, addFolder, addRequest, toggleFolder, saveResponse
        } as ApiContextType
      }
    >
      <div className="flex h-screen bg-white ">
        
        {/* Sidebar Component - Extracted */}
        <Sidebar 
          collections={collections}
          isCollapsed={!isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onAddTab={addTab}
          onToggleFolder={toggleFolder}
          onAddCollection={addCollection}
          onAddFolder={addFolder}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden ">
            {children}
        </div>
      </div>
    </ApiContext.Provider>
  );
}