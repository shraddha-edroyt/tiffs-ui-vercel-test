
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useApi } from "@/features/apiplayground/hooks/useApi"; 
import TabBar from "@/features/apiplayground/component/TabBar";
import UrlBar from "@/features/apiplayground/component/UrlBar";
import RequestPanel from "@/features/apiplayground/component/RequestPanel";
import ResponsePanel from "@/features/apiplayground/component/ResponsePanel";

type Row = { key: string; value: string; enabled: boolean };

type TabState = {
  params: Row[];
  headers: Row[];
  body: string;
  response: any;
  status: string;
  time: string;
  size: string;
  activeRequestTab: string;
  activeResponseTab: string;
  responseView: "pretty" | "preview";
  responseHeaders: Record<string, string>;
  responseCookies: Array<{ name: string; value: string; domain: string; path: string; expires: string; httpOnly: boolean; secure: boolean }>;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Initial state helper
const getInitialState = (): TabState => ({
  params: [{ key: "", value: "", enabled: true }],
  headers: [{ key: "Content-Type", value: "application/json", enabled: true }],
  body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }, null, 2),
  response: null,
  status: "",
  time: "",
  size: "",
  activeRequestTab: "params",
  activeResponseTab: "body",
  responseView: "pretty",
  responseHeaders: {},
  responseCookies: []
});

export default function ApiPlayground() {
  const { tabs, activeTab, setActiveTab, addTab, updateTab, removeTab } = useApi();
  
  // Find active tab data safely
  const active = tabs.find((t) => t.id === activeTab);
  
  // State management for multiple tabs
  const [states, setStates] = useState<Record<string, TabState>>({});

  // Helper to get current tab state
  const getState = (): TabState => {
    if (!active) return getInitialState();
    return states[active.id] || getInitialState();
  };

  const updateState = (data: Partial<TabState>) => {
    if (!active) return;
    setStates((prev) => ({
      ...prev,
      [active.id]: { ...getState(), ...data },
    }));
  };

  const state = getState();

  // Initialize state for new tabs
  useEffect(() => {
    if (active && !states[active.id]) {
      updateState({});
    }
  }, [active?.id]);

  // Helper to convert Row array to Object
  const toObject = (arr: Row[]) => {
    const obj: any = {};
    arr.forEach((i) => {
      if (i.enabled && i.key.trim()) obj[i.key] = i.value;
    });
    return obj;
  };

  // Cookie Parser Utility
  const parseCookie = (cookieString: string) => {
    const parts = cookieString.split(';');
    const nameValue = parts[0].split('=');
    const cookie: any = {
      name: nameValue[0]?.trim() || '',
      value: nameValue[1]?.trim() || '',
      domain: 'localhost',
      path: '/',
      expires: 'Session',
      httpOnly: false,
      secure: false
    };

    parts.slice(1).forEach(part => {
      const [key, value] = part.split('=');
      if (key && value) {
        const trimmedKey = key.trim().toLowerCase();
        if (trimmedKey === 'domain') cookie.domain = value.trim();
        if (trimmedKey === 'path') cookie.path = value.trim();
        if (trimmedKey === 'expires') cookie.expires = value.trim();
        if (trimmedKey === 'httponly') cookie.httpOnly = true;
        if (trimmedKey === 'secure') cookie.secure = true;
      } else if (key) {
        const trimmedKey = key.trim().toLowerCase();
        if (trimmedKey === 'httponly') cookie.httpOnly = true;
        if (trimmedKey === 'secure') cookie.secure = true;
      }
    });

    return cookie;
  };

  const handleSend = async () => {
    if (!active) return;
    
    const start = Date.now();
    try {
      const url = active.url.replace("{{baseUrl}}", BASE_URL);

      let data = {};
      if (state.body) {
        try { data = JSON.parse(state.body); } 
        catch (e) { data = { raw: state.body }; }
      }

      const res = await axios({
        method: active.method as any,
        url,
        params: toObject(state.params),
        headers: toObject(state.headers),
        data: active.method !== "GET" ? data : undefined,
      });

      const end = Date.now();
      
      // Process Headers & Cookies
      const responseHeaders: Record<string, string> = {};
      res.headers && Object.entries(res.headers).forEach(([key, value]) => {
        responseHeaders[key] = String(value);
      });

      const cookies: any[] = [];
      const setCookieHeader = res.headers['set-cookie'];
      if (setCookieHeader) {
        (Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader]).forEach(c => cookies.push(parseCookie(c)));
      }

      updateState({
        response: res.data,
        status: `${res.status} ${res.statusText}`,
        time: `${end - start} ms`,
        size: `${JSON.stringify(res.data).length} B`,
        responseHeaders,
        responseCookies: cookies
      });
    } catch (err: any) {
      const end = Date.now();
      const responseHeaders: Record<string, string> = {};
      if (err?.response?.headers) {
        Object.entries(err.response.headers).forEach(([key, value]) => {
          responseHeaders[key] = String(value);
        });
      }

      updateState({
        response: err?.response?.data || err.message,
        status: err?.response?.status ? `${err.response.status} Error` : "Network Error",
        time: `${end - start} ms`,
        size: "0 B",
        responseHeaders,
        responseCookies: []
      });
    }
  };

  const handleCopyResponse = () => {
    const text = typeof state.response === 'object' ? JSON.stringify(state.response, null, 2) : String(state.response);
    navigator.clipboard.writeText(text);
  };

  const handleSaveResponse = () => {
    const text = typeof state.response === 'object' ? JSON.stringify(state.response, null, 2) : String(state.response);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `response_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!active) return <div className="p-4">No tab open. Please add a tab.</div>;

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden ">
      
      <TabBar 
        tabs={tabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        addTab={addTab} 
        removeTab={removeTab} 
      />

      <UrlBar 
        method={active.method}
        url={active.url}
        onMethodChange={(method) => updateTab(active.id, { method })}
        onUrlChange={(url) => updateTab(active.id, { url })}
        onSend={handleSend}
      />

      <RequestPanel 
        activeTab={state.activeRequestTab}
        setActiveTab={(tab) => updateState({ activeRequestTab: tab })}
        params={state.params}
        headers={state.headers}
        body={state.body}
        setParams={(params) => updateState({ params })}
        setHeaders={(headers) => updateState({ headers })}
        setBody={(body) => updateState({ body })}
      />

      <ResponsePanel 
        status={state.status}
        time={state.time}
        size={state.size}
        activeTab={state.activeResponseTab}
        setActiveTab={(tab) => updateState({ activeResponseTab: tab })}
        viewMode={state.responseView}
        setViewMode={(mode) => updateState({ responseView: mode })}
        response={state.response}
        headers={state.responseHeaders}
        cookies={state.responseCookies}
        onCopy={handleCopyResponse}
        onSave={handleSaveResponse}
      />
    </div>
  );
}