import React, { useState, useEffect} from 'react';
import { EvenementInput } from '@app/types/evenement';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import { useUI } from '@app/components/Provider/UIContext';

interface EvenementFormProps {
  onSubmit: (evenement: EvenementInput) => void;
  initialValues?: Partial<EvenementInput>;
}

export const EvenementForm: React.FC<EvenementFormProps> = ({ onSubmit, initialValues = {} }) => {
  const { addToast } = useUI();
  const [formData, setFormData] = useState<EvenementInput>({
    titre: initialValues.titre || '',
    dateDebut: initialValues.dateDebut || new Date(),
    dateFin: initialValues.dateFin || new Date(),
    lieu: initialValues.lieu || '',
    prix: initialValues.prix || 0,
    description: initialValues.description || '',
    capacite: initialValues.capacite || 0,
    artistes: initialValues.artistes || [],
    genreMusicaux: initialValues.genreMusicaux || [],
  });

  // Listes d'artistes et de genres musicaux (simulées pour l'instant)
  const [artistesDisponibles, setArtistesDisponibles] = useState<{ id: number; nom: string }[]>([
    { id: 1, nom: 'Rock Band' },
    { id: 2, nom: 'Guitar Heroes' },
  ]);
  const [genresDisponibles, setGenresDisponibles] = useState<{ id: number; nom: string }[]>([
    { id: 1, nom: 'Rock' },
    { id: 2, nom: 'Metal' },
    { id: 3, nom: 'Jazz' },
  ]);

  // Charger les artistes et genres musicaux (simulé, à remplacer par un appel API)
  useEffect(() => {
    // Exemple d'appel API pour charger les artistes et genres (à implémenter dans ton backend)
    const fetchArtistes = async () => {
      try {
        const response = await fetch('http://localhost:8080/artiste');
        if (!response.ok) throw new Error('Erreur lors du chargement des artistes');
        const data = await response.json();
        setArtistesDisponibles(data);
      } catch (error: any) {
        addToast(error.message || 'Erreur lors du chargement des artistes', 'error');
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:8080/genreMusical');
        if (!response.ok) throw new Error('Erreur lors du chargement des genres');
        const data = await response.json();
        setGenresDisponibles(data);
      } catch (error: any) {
        addToast(error.message || 'Erreur lors du chargement des genres', 'error');
      }
    };

    // Décommente ces lignes une fois les endpoints implémentés
     //fetchArtistes();
     //fetchGenres();
  }, [addToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'prix' || name === 'capacite' ? (value ? parseFloat(value) : 0) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: new Date(value),
    }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: 'artistes' | 'genreMusicaux') => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => ({
      id: parseInt(option.value),
    }));
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!formData.titre || !formData.dateDebut || !formData.dateFin) {
      addToast('Titre, date de début et date de fin sont requis', 'error');
      return;
    }

    // Préparer les données pour l'API
    const dataToSend= {
      titre: formData.titre,
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
      lieu: formData.lieu,
      prix: formData.prix,
      description: formData.description,
      capacite: formData.capacite,
      artistes: formData.artistes && formData.artistes.length > 0 ? formData.artistes : undefined,
      genreMusicaux: formData.genreMusicaux && formData.genreMusicaux.length > 0 ? formData.genreMusicaux : undefined,
    };

    // Préparer les données pour onSubmit (même format mais avec Date au lieu de string ISO)
    const eventData: EvenementInput = {
      titre: formData.titre,
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
      lieu: formData.lieu,
      prix: formData.prix,
      description: formData.description,
      capacite: formData.capacite,
      artistes: formData.artistes && formData.artistes.length > 0 ? formData.artistes : undefined,
      genreMusicaux: formData.genreMusicaux && formData.genreMusicaux.length > 0 ? formData.genreMusicaux : undefined,
    };

    // Récupérer le token d'authentification
    let token = Cookies.get('auth-token') || localStorage.getItem('authToken');
    if (!token) {
      addToast('Vous devez être connecté pour créer un événement', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/evenement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Échec de la création de l\'événement');
      }

      const createdEvent = await response.json();
      addToast('Événement créé avec succès !', 'success');

      // Réinitialiser le formulaire
      setFormData({
        titre: '',
        dateDebut: new Date(),
        dateFin: new Date(),
        lieu: '',
        prix: 0,
        description: '',
        capacite: 0,
        artistes: [],
        genreMusicaux: [],
      });

      // Appeler onSubmit pour mettre à jour la liste côté parent
     // onSubmit(eventData as EvenementInput);
      onSubmit(eventData as EvenementInput);
    } catch (error: any) {
      addToast(error.message || 'Erreur lors de la création de l\'événement', 'error');
    }
     // onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="titre" className="block text-sm font-medium">Titre *</label>
        <input
          type="text"
          id="titre"
          name= "titre"
          value={formData.titre}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateDebut" className="block text-sm font-medium">Date de début *</label>
          <input
              type="datetime-local"
              id="dateDebut"
              name="dateDebut"
              value={format(formData.dateDebut, "yyyy-MM-dd'T'HH:mm")}
              onChange={handleDateChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
          />
        </div>

        <div>
          <label htmlFor="dateFin" className="block text-sm font-medium">Date de fin *</label>
          <input
              type="datetime-local"
              id="dateFin"
              name="dateFin"
              value={format(formData.dateFin, "yyyy-MM-dd'T'HH:mm")}
              onChange={handleDateChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
          />
        </div>

        <div>
          <label htmlFor="lieu" className="block text-sm font-medium text-white">Lieu *</label>
          <input
              type="text"
              id="lieu"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-zinc-700 text-white border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="prix" className="block text-sm font-medium text-white">Prix (€) *</label>
          <input
              type="number"
              id="prix"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-zinc-700 text-white border-gray-300 shadow-sm p-2"
              step="0.01"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
          <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-zinc-700 text-white border-gray-300 shadow-sm p-2"
              rows={4}
          />
        </div>

        <div>
          <label htmlFor="capacite" className="block text-sm font-medium text-white">Capacité</label>
          <input
              type="number"
              id="capacite"
              name="capacite"
              value={formData.capacite}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-zinc-700 text-white border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="artistes" className="block text-sm font-medium text-white">Artistes</label>
          <select
              id="artistes"
              name="artistes"
              multiple
              value={(formData.artistes ?? []).map((artiste) => artiste.id.toString())}
              onChange={(e) => handleMultiSelectChange(e, 'artistes')}
              className="mt-1 block w-full rounded-md bg-zinc-700 text-white border-gray-300 shadow-sm p-2"
          >
            {artistesDisponibles.map((artiste) => (
                <option key={artiste.id} value={artiste.id}>
                  {artiste.nom}
                </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="genreMusicaux" className="block text-sm font-medium text-white">Genres musicaux</label>
          <select
              id="genreMusicaux"
              name="genreMusicaux"
              multiple
              value={(formData.genreMusicaux ?? []).map((genre) => genre.id.toString())}
              onChange={(e) => handleMultiSelectChange(e, 'genreMusicaux')}
              className="mt-1 block w-full rounded-md bg-zinc-700 text-white border-gray-300 shadow-sm p-2"
          >
            {genresDisponibles.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.nom}
                </option>
            ))}
          </select>
        </div>

      </div>

      {/* Autres champs du formulaire */}

      <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer
      </button>
    </form>
  );
};