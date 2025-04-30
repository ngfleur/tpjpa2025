import './globals.css';
import Footer from '@app/components/Layout/Footer';
import Header from '@app/components/Layout/Header';
import {ReactNode} from 'react';
import {UIProvider} from '@app/components/Provider/UIContext';
import {LoginModal} from '@app/components/Modal/LoginModal';
import {RegistrationModal} from "@components/Modal/RegistrationModal";
import {Toaster} from "sonner";

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: LayoutProps) {
    return (
        <html>
        <body>
        <UIProvider>
            <div className="min-h-screen flex flex-col pt-16">
                <Header/>
                <main className="flex-1">{children}</main>
                <LoginModal/>
                <RegistrationModal/>
                <Footer/>
                <Toaster
                    richColors
                    position="top-left"
                />
            </div>
        </UIProvider>
        </body>
        </html>
    );
}
