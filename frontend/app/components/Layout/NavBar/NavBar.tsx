'use client';
import { NavLink } from './NavLink';
import { useCallback, useState } from 'react';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navbarMainItems = [
  { ref: '/', label: 'ACCUEIL' },
  { ref: '/shop', label: 'EVENEMENTS' },
];

const navbarSecondrayItems = [
  { ref: '/terms', label: 'CONDITIONS GÉNÉRALES' },
  { ref: '/shipping', label: 'LIVRAISON & RETOURS' },
  { ref: '/faq', label: 'FOIRE AUX QUESTIONS' },
];

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

  return (
    <div className="relative">
      <button
        className="relative p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setIsMenuShown(!isMenuShown)}
        aria-label="Menu"
      >
        <div className="w-6 h-6 flex flex-col justify-between">
          <span className={`block h-0.5 w-full bg-black transition-transform duration-300 ${
            isMenuShown ? 'rotate-45 translate-y-2.5' : ''
          }`} />
          <span className={`block h-0.5 w-full bg-black transition-opacity duration-300 ${
            isMenuShown ? 'opacity-0' : ''
          }`} />
          <span className={`block h-0.5 w-full bg-black transition-transform duration-300 ${
            isMenuShown ? '-rotate-45 -translate-y-2.5' : ''
          }`} />
        </div>
      </button>

      {/* Overlay sombre */}
      {isMenuShown && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuShown(false)}
        />
      )}

      {/* Menu */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-80 bg-black transform transition-transform duration-300 ease-in-out z-50 ${
        isMenuShown ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMenuShown(false)}
              className="text-white p-2"
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                {navbarMainItems.map(({ ref, label }) => (
                  <li key={ref} className="text-center">
                    <StyledNavLink
                      href={ref}
                      isActive={ref === linkRef}
                      className="text-xl text-white hover:text-purple-300 transition-colors"
                      onClick={() => {
                        setLinkRef(ref);
                        setIsMenuShown(false);
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
                {navbarSecondrayItems.map(({ ref, label }) => (
                  <li key={ref} className="text-center">
                    <StyledNavLink
                      href={ref}
                      isActive={ref === linkRef}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                      onClick={() => {
                        setLinkRef(ref);
                        setIsMenuShown(false);
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