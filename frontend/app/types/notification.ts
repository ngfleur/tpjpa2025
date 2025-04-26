export interface Notification {
  id: number;
  contenu: string;
  evenementId: number;
}

export interface NotificationInput {
  contenu: string;
  evenementId: number;
}