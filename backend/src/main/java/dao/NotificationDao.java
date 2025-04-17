package dao;

import java.util.List;

import domain.Evenement;
import domain.Notification;
import domain.Utilisateur;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;
import jpa.EntityManagerHelper;

public class NotificationDao {

	private EntityManager manager;

	public NotificationDao(EntityManager manager) {
		this.manager = manager;
	}

	public List<Notification> getAllNotification() {
		String s = "select n from Notification as n";
		return manager.createQuery(s, Notification.class).getResultList();
	}

	public Notification getNotificationById(Long id) {
		String s = "select n from Notification as n where n.id = :id";
		TypedQuery<Notification> query = manager.createQuery(s, Notification.class);
		query.setParameter("id", id);
		return query.getSingleResult();
	}

	public List<Utilisateur> getUtilisateursByNotificationId(Long id) {
		EntityTransaction tx = manager.getTransaction();
		List<Utilisateur> utilisateurs;

		try {
			tx.begin();

			TypedQuery<Utilisateur> query = manager.createQuery(
					"SELECT u FROM Utilisateur u JOIN u.notifs n WHERE n.id = :id",
					Utilisateur.class
			);
			query.setParameter("id", id);
			utilisateurs = query.getResultList();

			tx.commit();
		} catch (Exception e) {
			if (tx.isActive()) {
				tx.rollback();
			}
			throw e;
		}

		return utilisateurs;
	}

	public void save(Notification notification) {
		EntityTransaction tx = manager.getTransaction();

		try {
			tx.begin();
			manager.persist(notification);
			tx.commit();
		} catch (Exception e) {
			if (tx.isActive()) {
				tx.rollback();
			}
			throw e;
		}
	}

	public void save(String contenu, Evenement evenement) {
		save(new Notification(contenu, evenement));
	}

	public void update(Long id, String contenu, Evenement evenement) {
		EntityTransaction tx = manager.getTransaction();

		try {
			tx.begin();
			Notification notification = manager.find(Notification.class, id);
			if (notification == null) {
				throw new EntityNotFoundException("Notification non trouvée pour l'id : " + id);
			}
			notification.setContenu(contenu);
			notification.setEvenement(evenement);
			tx.commit();
		} catch (Exception e) {
			if (tx.isActive()) {
				tx.rollback();
			}
			throw e;
		}
	}

	public void update(Notification notification) {
		EntityTransaction tx = manager.getTransaction();

		try {
			tx.begin();
			manager.merge(notification);
			tx.commit();
		} catch (Exception e) {
			if (tx.isActive()) {
				tx.rollback();
			}
			throw e;
		}
	}

	public Notification read(Long id) {
		EntityTransaction tx = manager.getTransaction();
		Notification notification;

		try {
			tx.begin();
			notification = manager.find(Notification.class, id);
			if (notification == null) {
				throw new EntityNotFoundException("Notification non trouvée pour l'id : " + id);
			}
			tx.commit();
		} catch (Exception e) {
			if (tx.isActive()) {
				tx.rollback();
			}
			throw e;
		}

		return notification;
	}

	public void delete(Long id) {
		EntityTransaction tx = manager.getTransaction();

		try {
			tx.begin();
			Notification notification = manager.find(Notification.class, id);
			if (notification == null) {
				throw new EntityNotFoundException("Notification non trouvée pour l'id : " + id);
			}
			manager.remove(notification);
			tx.commit();
		} catch (Exception e) {
			if (tx.isActive()) {
				tx.rollback();
			}
			throw e;
		}
	}
}
