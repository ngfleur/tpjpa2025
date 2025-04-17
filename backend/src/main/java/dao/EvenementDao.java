package dao;

import java.util.List;

import domain.*;
import jakarta.persistence.*;
import jpa.EntityManagerHelper;

public class EvenementDao {

	private EntityManager manager;

	public EvenementDao() {
		this.manager = EntityManagerHelper.getEntityManager();
	}

	public List<Evenement> getAllEvenement() {
		return manager.createQuery("SELECT e FROM Evenement e", Evenement.class).getResultList();
	}

	public Evenement getEvenementById(Long id) {
		return manager.find(Evenement.class, id);
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

	// Les méthodes pour artistes, genres, notifs et tickets restent inchangées
}
