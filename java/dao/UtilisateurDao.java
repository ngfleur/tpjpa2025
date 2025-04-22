package dao;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;

import domain.Notification;
import domain.Ticket;
import domain.Utilisateur;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import jpa.EntityManagerHelper;

public class UtilisateurDao {
	


	private EntityManager manager;
	
	public UtilisateurDao() {
		this.manager = EntityManagerHelper.getEntityManager();
	}
	
	/*public UtilisateurDao(EntityManager manager) {
		this.manager = manager;	
	}
	*/
	public List <Utilisateur> getAllUtilisateur(){
		
		String s = "select u from Utilisateur as u";
		return manager.createQuery(s).getResultList();
		
	}
	
	public Utilisateur getUtilisateurById(Long id) {
		String s = "select u from Utilisateur as u where u.id = :id";
		return EntityManagerHelper.getEntityManager().createQuery(s, Utilisateur.class).setParameter("id", id).getSingleResult();
	}
	
	
	// Pour récupérer la liste des Tickets par utilisateur
	
	public List <Ticket> getTicketsByUtilisateurId (Long id){
		
		EntityTransaction tx = manager.getTransaction();
		
		List<Ticket> tickets;
		
		try {
			
			tx.begin();
			
			
			TypedQuery<Ticket> query = manager.createQuery(
					"select t from Ticket as t where t.utilisateur.id = :id",	
					
					Ticket.class		
					
					);
						
			query.setParameter("id", id);
			tickets = query.getResultList();
			
			tx.commit();
			
		} catch (Exception e) {
			if(tx.isActive()) {
				tx.rollback();
			}
			
			throw e;
		}
		
		return tickets;
	}
	
	// Pour récupérer la liste des notifications par utilisateur
	
		public List <Notification> getNotificationsByUtilisateurId (Long id){
			
			EntityTransaction tx = manager.getTransaction();
			
			List<Notification> notifs;
			
			try {
				
				tx.begin();
				
				
				TypedQuery<Notification> query = manager.createQuery(
		                "Select n from Notification n JOIN n.notifs u where u.id = :id", 
						
		                Notification.class
						
						);
				
				query.setParameter("id", id);
				notifs = query.getResultList();
				
				tx.commit();
				
			} catch (Exception e) {
				if(tx.isActive()) {
					tx.rollback();
				}
				
				throw e;
			}
			
			return notifs;
		}
	
	
	
	public Utilisateur save (Utilisateur utilisateur) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			// Demarrer la transaction
			
			tx.begin();
			
			 // Hasher le mot de passe avant de le sauvegarder
	        String hashed = BCrypt.hashpw(utilisateur.getMotDePasse(), BCrypt.gensalt());
	        utilisateur.setMotDePasse(hashed);
			
			manager.persist(utilisateur);
			
			//Fin de la transaction
			tx.commit();
			
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		return utilisateur;
		
	}
	
	public Utilisateur update (Utilisateur utilisateur) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			// Demarrer la transaction
			tx.begin();
			
			
			
			Utilisateur oldUtilisateur = manager.find(Utilisateur.class, utilisateur.getId());
			
			if (oldUtilisateur == null) {
				throw new EntityNotFoundException("Utilisateur non trouvé pour l'id : " +utilisateur.getId());
            }
			
			
			oldUtilisateur.setName(utilisateur.getName());
			oldUtilisateur.setFirstName(utilisateur.getFirstName());
			oldUtilisateur.setEmail(utilisateur.getEmail());

			

			tx.commit();
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
		return utilisateur;
		
	}
	
	
	public Utilisateur read (Long id) {
		
		EntityTransaction tx =  manager.getTransaction();
    	
		Utilisateur utilisateur;
		try{
			
			tx.begin();
			
			utilisateur = manager.find(Utilisateur.class, id);
			
			if(utilisateur == null) {
    			throw new EntityNotFoundException("Utilisateur non trouvé pour l'id : " +id);

			}
			
			tx.commit();
		} catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
    		
    	return utilisateur;
			
	}
	
	public void delete (Long id) {
		
	EntityTransaction tx = manager.getTransaction();
    	
    	try {
    		 
    		tx.begin();
    		
    		// Récupération de l'entité existante grâce à son identifiant
    		Utilisateur utilisateur = manager.find(Utilisateur.class, id);
        	
        	if(utilisateur == null) {
        		throw new EntityNotFoundException("Utilisateur non trouvé pour l'id : " +id);
        	}
        	
        	manager.remove (utilisateur);

            tx.commit();
    		
    	}catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
		
	}
	
	public Utilisateur seConnecter(String email, String motDePasse) {
	    try {
	        TypedQuery<Utilisateur> query = manager.createQuery(
	            "SELECT u FROM Utilisateur u WHERE u.email = :email AND u.motDePasse = :mdp", Utilisateur.class
	        );
	        query.setParameter("email", email);
	        query.setParameter("mdp", motDePasse);

	        return query.getSingleResult();
	    } catch (NoResultException e) {
	        return null; // mauvais identifiants
	    }
	}



}
