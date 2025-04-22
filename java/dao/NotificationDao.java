package dao;

import java.util.Date;
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
	
	public List <Notification> getAllNotification(){
		
		String s = "select n from Notification as n";
		return EntityManagerHelper.getEntityManager().createQuery(s).getResultList();
		
	}
	
	public Notification getNotificationById(Long id) {
		
		String s = "select n from Notification as n where n.id = :id";
		return EntityManagerHelper.getEntityManager().createQuery(s, Notification.class).getSingleResult();
	}
	
	
	// Pour récupérer la liste des utilisateurs par notification
	
	public List <Utilisateur> getUtilisateursByNotificationId (Long id){
		
		EntityTransaction tx = manager.getTransaction();
		
		List<Utilisateur> utilisateurs;
		
		try {
			
			tx.begin();
			
			
			// Utilisation d'une jointure , relation ManyToMany
			TypedQuery<Utilisateur> query = manager.createQuery(
	                "Select u from Utilisateur u JOIN u.notifs n where n.id = :id", 
					
					Utilisateur.class
					
					);
			
			query.setParameter("id", id);
			utilisateurs= query.getResultList();
			
			tx.commit();
			
		} catch (Exception e) {
			if(tx.isActive()) {
				tx.rollback();
			}
			
			throw e;
		}
		
		return utilisateurs;
	}
	
	
	
	
	
	
	public void save (String contenu, Evenement evenement) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			// Demarrer la transaction
			
			tx.begin();
			
			// Demarrer la transaction
			
			Notification notification = new Notification (contenu, evenement);
			
			manager.persist(notification);
			
			//Fin de la transaction
			tx.commit();
			
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	public void update (Long id, String contenu, Evenement evenement) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			tx.begin();
			
			// Demarrer la transaction
			
			Notification notification = manager.find(Notification.class, id);
			
			if (notification == null) {
				throw new EntityNotFoundException("Notification non trouvé pour l'id : " +id);
            }
			
			
			notification.setContenu(contenu);
			notification.setEvenement(evenement);
			

			tx.commit();
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	
	public Notification read (Long id) {
		
		EntityTransaction tx =  manager.getTransaction();
    	
		Notification notification;
		try{
			
			tx.begin();
			
			notification = manager.find(Notification.class, id);
			
			if(notification == null) {
    			throw new EntityNotFoundException("Notification non trouvé pour l'id : " +id);

			}
			
			tx.commit();
		} catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
    		
    	return notification;
			
	}
	
	public void delete (Long id) {
		
	EntityTransaction tx = manager.getTransaction();
    	
    	try {
    		 
    		tx.begin();
    		
    		// Récupération de l'entité existante grâce à son identifiant
    		Notification notification = manager.find(Notification.class, id);
        	
        	if(notification == null) {
        		throw new EntityNotFoundException("Notification non trouvé pour l'id : " +id);
        	}
        	
        	manager.remove (notification);

            tx.commit();
    		
    	}catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
		
	}


}
