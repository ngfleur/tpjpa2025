package dao;

import domain.Artiste;
import domain.Evenement;
import domain.GenreMusical;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jpa.EntityManagerHelper;

import java.util.List;

public class EvenementDao {

    private final EntityManager manager;

    public EvenementDao() {
        this.manager = EntityManagerHelper.getEntityManager();
    }

    public List<Evenement> getAllEvenement() {
        return manager.createQuery("SELECT e FROM Evenement e", Evenement.class).getResultList();
    }

    public Evenement getEvenementById(Long id) {
        return manager.find(Evenement.class, id);
    }

    public List<Evenement> getEvenementsByOrganisateurId(Long organisateurId) {
        return manager.createQuery("SELECT e FROM Evenement e WHERE", Evenement.class).getResultList();
    }

    public void save(Evenement event) {
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            manager.persist(event);
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
    }

    public void update(Evenement updatedEvent) {
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            manager.merge(updatedEvent); // merge suffit ici
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
    }

    public void delete(Long id) {
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            Evenement event = manager.find(Evenement.class, id);
            if (event == null) throw new EntityNotFoundException("Événement introuvable avec l'id : " + id);
            manager.remove(event);
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
    }

    public boolean artisteExists(Long id) {
        return manager.find(Artiste.class, id) != null;
    }

    public boolean genreMusicalExists(Long id) {
        return manager.find(GenreMusical.class, id) != null;
    }

    // Les méthodes pour artistes, genres, notifs et tickets restent inchangées
}
