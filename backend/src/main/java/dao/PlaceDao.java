package dao;

import java.util.List;
import domain.Place;
import domain.Salle;
import domain.Ticket;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;
import jpa.EntityManagerHelper;

public class PlaceDao {

    private EntityManager manager;

    public PlaceDao() {
        this.manager = EntityManagerHelper.getEntityManager();
    }

    public List<Place> getAllPlaces() {
        String s = "select p from Place as p";
        return manager.createQuery(s, Place.class).getResultList();
    }

    public Place getPlaceById(Long id) {
        Place place = manager.find(Place.class, id);
        if (place == null) {
            throw new EntityNotFoundException("Place non trouvée pour l'id : " + id);
        }
        return place;
    }

    public List<Ticket> getTicketsByPlaceId(Long id) {
        Place place = getPlaceById(id); // déjà gère l'exception si pas trouvé
        return place.getTickets(); // plus besoin de requête JPQL, la relation est déjà là
    }

    public Salle getSalleByPlaceId(Long id) {
        Place place = getPlaceById(id);
        return place.getSalle();
    }

    public Salle getSalleById(Long salleId) {
        Salle salle = manager.find(Salle.class, salleId);
        if (salle == null) {
            throw new EntityNotFoundException("Salle non trouvée pour l'id : " + salleId);
        }
        return salle;
    }

    public void save(Place place) {
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            Salle salle = manager.find(Salle.class, place.getSalle().getId());
            if (salle == null) throw new EntityNotFoundException("Salle non trouvée pour l'id : " + place.getSalle().getId());
            place.setSalle(salle);
            manager.persist(place);
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
    }

    public void update(Long id, String numeroEmplacement, Salle salle) {
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            Place place = manager.find(Place.class, id);
            if (place == null) throw new EntityNotFoundException("Place non trouvée pour l'id : " + id);
            place.setNumeroEmplacement(numeroEmplacement);
            place.setSalle(salle);
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
            Place place = manager.find(Place.class, id);
            if (place == null) throw new EntityNotFoundException("Place non trouvée pour l'id : " + id);
            manager.remove(place);
            tx.commit();
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        }
    }
}

