'use client';
import React from 'react';
import { Sidebar } from './Sidebar';
import { useUI } from '@app/components/Provider/UIContext';
import { PanierView } from '@app/components/Panier/PanierView';

export const SidebarUI: React.FC = () => {
  const { displaySidebar, closeSidebar } = useUI();

  return displaySidebar ? (
    <Sidebar
      onClose={closeSidebar}
    >
      <PanierView/>
    </Sidebar>
  ) : null;
};