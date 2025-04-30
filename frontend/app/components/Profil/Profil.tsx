'use client';

import React, {useEffect, useState} from 'react';
import {useUI} from '@app/components/Provider/UIContext';

export const ProfilIcon = () => {
    const {openModal} = useUI();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            setIsAuthenticated(!!token);
        };

        checkAuth();

        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleClick = () => {
        if (!isAuthenticated) {
            openModal('LOGIN');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        window.location.reload();
    };

    return (
        <div className="relative">
            {isAuthenticated ? (
                <div className="flex items-center">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2"
                    >
                        <img
                            src="/default-avatar.png"
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleClick}
                    className="flex items-center space-x-2"
                >
                    <svg
                        className="w-8 h-8 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};