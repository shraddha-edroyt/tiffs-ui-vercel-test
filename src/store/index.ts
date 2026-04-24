import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

// ─────────────────────────────────────────────────────────────
// Redux Store
// ─────────────────────────────────────────────────────────────
// Used for synchronous UI state (sidebar open/close, modals, etc.)
// Server/async data is handled by React Query (TanStack Query).
// Auth state is handled by Zustand (authStore).
// ─────────────────────────────────────────────────────────────

// Import reducers as you add feature slices:
// import uiReducer from "@/features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    // Placeholder to satisfy Redux requirement of at least one reducer.
    // Replace with real slices as the app grows:
    // ui: uiReducer,
    _placeholder: (state = null) => state,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types / paths if needed
        ignoredActions: [],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks — use these instead of plain useDispatch / useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
