'use client';
import {NavLink} from './NavLink';
import {useState} from 'react';
import type {LinkProps} from 'next/link';
import {usePathname} from 'next/navigation';
import Image from 'next/image';

interface NavBarItem {
    ref: string,
    label: string
}

const navbarMainItems: NavBarItem[] = [
    {ref: '/', label: 'ACCUEIL'},
    {ref: '/event', label: 'EVENEMENTS'},

];

const navbarSecondrayItems: NavBarItem[] = [];

const StyledNavLink = ({
                           isActive,
                           className,
                           ...linkProps
                       }: LinkProps & {
    isActive: boolean;
    children: React.ReactNode;
    className?: string;
}) => (
    <NavLink
        className={`${className ?? ''} ${
            isActive ? 'text-purple-300' : 'hover:text-gray-400'
        }`}
        {...linkProps}
    />
);

export function NavBar() {
    const [isMenuShown, setIsMenuShown] = useState(false);
    const pathname = usePathname();
    const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname!);


    const closeMenu = () => {
        setIsMenuShown(false);
    };

    return (
        <div className="relative">
            <button
                className="relative p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsMenuShown(!isMenuShown)}
                aria-label="Menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            </button>

            {/* Overlay sombre */}
            {isMenuShown && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeMenu}
                />
            )}

            {/* Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-80 bg-black transform transition-transform duration-300 ease-in-out z-50 ${
                    isMenuShown ? 'translate-x-0' : 'translate-x-full'
                }`}>

                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-end">
                        <button
                            onClick={closeMenu}
                            className="text-white p-2"
                            aria-label="Fermer le menu"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-40 h-40 relative mb-8">
                            <Image
                                src="https://static.wixstatic.com/media/503ea4_cb7ebc8a601749f098164d92ec7aa441~mv2.jpg/v1/fill/w_480,h_622,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/503ea4_cb7ebc8a601749f098164d92ec7aa441~mv2.jpg"
                                alt="Logo"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-8">EV$NTIX</h2>

                        <nav className="w-full">
                            <ul className="space-y-4">
                                {navbarMainItems.map(({ref, label}) => (
                                    <li key={ref} className="text-center">
                                        <StyledNavLink
                                            href={ref}
                                            isActive={ref === linkRef}
                                            className="text-xl text-white hover:text-purple-300 transition-colors"
                                            onClick={(e) => {
                                                setLinkRef(ref);
                                                closeMenu();
                                            }}
                                        >
                                            {label}
                                        </StyledNavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="mt-8">
                            <ul className="space-y-2">
                                {navbarSecondrayItems.map(({ref, label}) => (
                                    <li key={ref} className="text-center">
                                        <StyledNavLink
                                            href={ref}
                                            isActive={ref === linkRef}
                                            className="text-sm text-gray-400 hover:text-white transition-colors"
                                            onClick={() => {
                                                setLinkRef(ref);
                                                closeMenu();
                                            }}
                                        >
                                            {label}
                                        </StyledNavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}