import './globals.css';
import Footer from '@app/components/Layout/Footer';
import Header from '@app/components/Layout/Header';
import { ReactNode } from 'react';
import { Toast, UIProvider } from '@app/components/Provider/UIContext';
import { LoginModal } from '@app/components/Modal/LoginModal';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
    <body>
    <UIProvider>
      <div className="min-h-screen flex flex-col pt-16">
        <Header />
        <main className="flex-1">{children}</main>
        <LoginModal />
        <Footer />
        <Toast />
      </div>
    </UIProvider>
    </body>
    </html>
  );
}
