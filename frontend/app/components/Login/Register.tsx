'use client';

import {useUI} from '@app/components/Provider/UIContext';

export const Register = () => {
    const {openModal} = useUI();
    return (
        <div className="flex gap-4">
            <button
                onClick={() => openModal('REGISTRATION')}
                className="px-4 py-2 text-black hover:text-gray-600 transition-colors"
            >
                Inscription
            </button>
        </div>
    );
};


