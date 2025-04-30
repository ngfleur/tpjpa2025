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
  modalContent: ReactNode | null;
  modalTitle: string;
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
    | { type: 'OPEN_MODAL'; view: UIState['modalView']; content?: ReactNode; title?: string }
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
  openModal: (view: UIState['modalView'], content?: ReactNode, title?: string) => void;
  closeModal: () => void;
  addToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

// État initial
const initialState: UIState = {
  isSidebarOpen: false,
  displaySidebar: false,
  sidebarView: 'PANIER',
  modalView: 'NONE',
  isModalOpen: false,
  modalContent: null,
  modalTitle: '',
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
      console.log('Opening modal with view:', action.view, 'content:', action.content);
      return {
        ...state,
        modalView: action.view,
        isModalOpen: true,
        modalContent: action.content ?? null, // Utilisation de ?? pour garantir null si undefined
        modalTitle: action.title || '',
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalView: 'NONE',
        isModalOpen: false,
        modalContent: null,
        modalTitle: '',
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
        toastMessages: state.toastMessages.filter((toast) => toast.id !== action.id),
      };
    default:
      return state;
  }
};

// Composant de modale globale
const Modal: React.FC = () => {
  const { isModalOpen, modalView, modalContent, modalTitle, closeModal } = useUI();

  if (!isModalOpen) return null;

  console.log('Modal rendering - modalContent:', modalContent);

  // Déterminer le contenu à afficher
  let content: ReactNode;

  if (modalContent) {
    content = modalContent;
  } else if (modalView !== 'NONE') {
    switch (modalView) {
      case 'LOGIN':
        content = <div>Formulaire de connexion (à implémenter)</div>;
        break;
      case 'REGISTER':
        content = <div>Formulaire d'inscription (à implémenter)</div>;
        break;
      case 'BACK_IN_STOCK':
        content = <div>Notification de retour en stock (à implémenter)</div>;
        break;
      default:
        content = <div>Contenu non défini pour cette modale</div>;
    }
  } else {
    content = <div>Contenu non défini pour cette modale</div>;
  }

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-zinc-800 p-6 rounded-lg max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">{modalTitle || modalView}</h2>
            <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white focus:outline-none"
            >
              ✕
            </button>
          </div>
          <div>
            {content || <div>Erreur : contenu de la modale non défini</div>}
          </div>
        </div>
      </div>
  );
};

// Provider Component
export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
  const setSidebarView = (view: UIState['sidebarView']) =>
      dispatch({ type: 'SET_SIDEBAR_VIEW', view });
  const openModal = (view: UIState['modalView'], content?: ReactNode, title?: string) =>
      dispatch({ type: 'OPEN_MODAL', view, content, title });
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

  return (
      <UIContext.Provider value={value}>
        {children}
        <Modal />
        <Toast />
      </UIContext.Provider>
  );
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