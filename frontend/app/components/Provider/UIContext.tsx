'use client';

import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Définition unique du type SidebarView

export type SidebarView = 'PANIER' | 'FILTRES' | 'SELECTION_PLACES';

// Types unifiés
interface UIState {
  isSidebarOpen: boolean;
  displaySidebar: boolean;
  sidebarView: SidebarView;
  modalView: 'NONE' | 'BACK_IN_STOCK' | 'LOGIN' | 'REGISTER';
  isModalOpen: boolean;
  toastMessages: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>;
}

type UIAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'CLOSE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_VIEW'; view: SidebarView }
  | { type: 'OPEN_MODAL'; view: UIState['modalView'] }
  | { type: 'CLOSE_MODAL' }
  | {
      type: 'ADD_TOAST';
      message: string;
      messageType: 'success' | 'error' | 'info' | 'warning';
    }
  | { type: 'REMOVE_TOAST'; id: string };

interface UIContextType extends UIState {
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setSidebarView: (view: SidebarView) => void;
  openModal: (view: UIState['modalView']) => void;
  closeModal: () => void;
  addToast: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) => void;
  removeToast: (id: string) => void;
}

// État initial
const initialState: UIState = {
  isSidebarOpen: false,
  displaySidebar: false,
  sidebarView: 'PANIER',
  modalView: 'NONE',
  isModalOpen: false,
  toastMessages: [],
};

// Création du contexte
const UIContext = createContext<UIContextType | undefined>(undefined);

// Reducer pour gérer les états
const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
        displaySidebar: !state.displaySidebar,
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: false,
        displaySidebar: false,
      };
    case 'SET_SIDEBAR_VIEW':
      return {
        ...state,
        sidebarView: action.view,
      };
    case 'OPEN_MODAL':
      console.log('Opening modal with view:', action.view);
      return {
        ...state,
        modalView: action.view,
        isModalOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalView: 'NONE',
        isModalOpen: false,
      };
    case 'ADD_TOAST':
      return {
        ...state,
        toastMessages: [
          ...state.toastMessages,
          {
            id: Date.now().toString(),
            message: action.message,
            type: action.messageType,
          },
        ],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toastMessages: state.toastMessages.filter(
          (toast) => toast.id !== action.id
        ),
      };
    default:
      return state;
  }
};

// Provider Component
export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
  const setSidebarView = (view: UIState['sidebarView']) =>
    dispatch({ type: 'SET_SIDEBAR_VIEW', view });
  const openModal = (view: UIState['modalView']) =>
    dispatch({ type: 'OPEN_MODAL', view });
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });
  const addToast = (
    message: string,
    messageType: 'success' | 'error' | 'info' | 'warning'
  ) => dispatch({ type: 'ADD_TOAST', message, messageType });
  const removeToast = (id: string) => dispatch({ type: 'REMOVE_TOAST', id });

  const value = {
    ...state,
    toggleSidebar,
    closeSidebar,
    setSidebarView,
    openModal,
    closeModal,
    addToast,
    removeToast,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte UI
export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};

// Composant Toast pour afficher les notifications
export const Toast: React.FC = () => {
  const { toastMessages, removeToast } = useUI();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {toastMessages.map((toast) => (
        <div
          key={toast.id}
          className={`mb-2 p-4 rounded-lg shadow-lg ${
            toast.type === 'success'
              ? 'bg-green-500'
              : toast.type === 'error'
              ? 'bg-red-500'
              : toast.type === 'warning'
              ? 'bg-yellow-500'
              : 'bg-blue-500'
          } text-white`}
        >
          <div className="flex justify-between items-center">
            <p>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 hover:opacity-75"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
