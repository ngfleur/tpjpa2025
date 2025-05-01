'use client';

import {useUI} from '@app/components/Provider/UIContext';

export const Login = () => {
    const {openModal, isModalOpen, modalView, closeModal} = useUI();

    return (
        <div>
            {!localStorage.getItem('authToken') ? (
                <button
                    onClick={() => openModal('LOGIN')}
                    className="px-4 py-2 text-black hover:text-gray-600 transition-colors"
                >
                    Connexion
                </button>
            ) : (
                <button
                    onClick={() => localStorage.removeItem('authToken')}
                    className="px-4 py-2 text-black hover:text-gray-600 transition-colors"
                >
                    Déconnexion
                </button>
            )}
        </div>
    );
};