'use client'

import {useState} from 'react';
import {RoleUtilisateur} from '@app/utils/enums';

interface RegistrationFormData {
    name: string;
    firstName: string;
    email: string;
    password: string;
    role: RoleUtilisateur;
}

export default function ProfilePage() {
    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        firstName: '',
        email: '',
        password: '',
        role: RoleUtilisateur.PARTICIPANT,
    });

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 p-2 border rounded-md w-full">{formData.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <p className="mt-1 p-2 border rounded-md w-full">{formData.firstName}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 p-2 border rounded-md w-full">{formData.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <p className="mt-1 p-2 border rounded-md w-full">{formData.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}