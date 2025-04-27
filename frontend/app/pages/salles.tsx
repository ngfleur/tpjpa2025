import React, { useState } from 'react';
import { SalleList } from '@app/components/Salle/SalleList';
import { SalleForm } from '@app/components/Salle/SalleForm';
import { SalleDetail } from '@app/components/Salle/SalleDetail';
import { Salle } from '@app/types/salle';

export default function SallesPage() {
  const [selectedSalle, setSelectedSalle] = useState<Salle | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des salles</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Ajouter une salle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalleList
            salles={[]} // À remplir avec vos données
            onSelect={setSelectedSalle}
          />
        </div>
        <div>
          {selectedSalle && (
            <SalleDetail salle={selectedSalle} />
          )}
        </div>
      </div>

      {/* Modal pour le formulaire */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <SalleForm
              onSubmit={(data) => {
                // Gérer la soumission
                setIsFormOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}