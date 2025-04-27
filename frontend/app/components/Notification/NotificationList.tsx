import React from 'react';
import { Notification } from '@app/types/notification';

interface NotificationListProps {
  notifications: Notification[];
  onDismiss?: (id: number) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications,
  onDismiss 
}) => {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className="bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm flex justify-between items-center"
        >
          <div className="flex-1">
            <p className="text-gray-700">{notification.contenu}</p>
            <p className="text-sm text-gray-500">
              ID Événement: {notification.evenementId}
            </p>
          </div>
          {onDismiss && (
            <button
              onClick={() => onDismiss(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Fermer</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};