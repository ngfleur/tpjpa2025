package dao;

import java.util.Date;
import java.util.List;

import domain.Artiste;
import domain.Evenement;
import domain.GenreMusical;
import domain.Notification;
import domain.Ticket;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;
import jpa.EntityManagerHelper;
import jakarta.persistence.EntityNotFoundException;

public class EvenementDao {
	
	private EntityManager manager;
	
	public EvenementDao(EntityManager manager) {
		this.manager = manager;	
	}
	
	public List <Evenement> getAllEvenement(){
		
		String s = "select e from Evenement as e";
		return EntityManagerHelper.getEntityManager().createQuery(s).getResultList();
		
	}
	
	public Evenement getEvenementById(Long id) {
		
		String s = "select e from Evenement as e where e.id = :id";
		return EntityManagerHelper.getEntityManager().createQuery(s, Evenement.class).getSingleResult();
	}
	
	
	// Pour récupérer la liste des artistes par evenement
	
	public List <Artiste> getArtistesByEvenementId (Long id){
		
		EntityTransaction tx = manager.getTransaction();
		
		List<Artiste> artistes;
		
		try {
			
			tx.begin();
			
			
			// Utilisation d'une jointure , relation ManyToMany
			TypedQuery<Artiste> query = manager.createQuery(
	                "Select a from Artiste a JOIN a.evenements e where e.id = :id", 
					
					Artiste.class
					
					);
			
			query.setParameter("id", id);
			artistes= query.getResultList();
			
			tx.commit();
			
		} catch (Exception e) {
			if(tx.isActive()) {
				tx.rollback();
			}
			
			throw e;
		}
		
		return artistes;
	}
	
	
	// Pour récupérer la liste des Genres Musicaux par evenement
	
		public List <GenreMusical> getGenresByEvenementId (Long id){
			
			EntityTransaction tx = manager.getTransaction();
			
			List<GenreMusical> genreMusicaux;
			
			try {
				
				tx.begin();
				
				// Utilisation d'une jointure , relation ManyToMany
				TypedQuery<GenreMusical> query = manager.createQuery(
						
		                "Select g from Evenement e JOIN e.genreMusicaux g where e.id = :id", 		
						GenreMusical.class
						
						);
				
				query.setParameter("id", id);
				genreMusicaux = query.getResultList();
				
				tx.commit();
				
			} catch (Exception e) {
				if(tx.isActive()) {
					tx.rollback();
				}
				
				throw e;
			}
			
			return genreMusicaux;
		}
		
		
		// Pour récupérer la liste des Notifications par evenement
		
			public List <Notification> getNotifsByEvenementId (Long id){
				
				EntityTransaction tx = manager.getTransaction();
				
				List<Notification> notifs;
				
				try {
					
					tx.begin();
					
					TypedQuery<Notification> query = manager.createQuery(
							"select n from Notification as n where n.evenement.id = :id",		
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
	
	// Pour recupérer la liste des tickets par evenement
	public List<Ticket> getTicketsByEvenementId(Long id){
		
		EntityTransaction tx = manager.getTransaction();
		
		List<Ticket> tickets;
		
		try {
			
			tx.begin();
			
			
			TypedQuery <Ticket> query = manager.createQuery(

					"Select t from Ticket as t where t.evenement.id = :id", // id de l'evenement
					Ticket.class
					
					);
			
			query.setParameter("id", id); // evenement id , attribution de la valeur contenue dans la variable id au paramètre
			
			
			tickets = query.getResultList();
			
			// Fin de la transaction
			tx.commit();
			
		} catch(Exception e) {
			if(tx.isActive()) {
				tx.rollback();
			}
			
			throw e;
		}
		
		return tickets;
	}
	
	
	public void save (String nom, Date date, String lieu, Double prix, String description) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			// Demarrer la transaction
			
			tx.begin();
			
			// Demarrer la transaction
			
			Evenement event = new Evenement(nom, date, lieu, prix, description);
			
			manager.persist(event);
			
			//Fin de la transaction
			tx.commit();
			
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	public void update (Long id, String nom, Date date, String lieu, Double prix, String description) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			tx.begin();
			
			// Demarrer la transaction
			
			Evenement event = manager.find(Evenement.class, id);
			
			if (event == null) {
				throw new EntityNotFoundException("Evenement non trouvé pour l'id : " +id);
            }
			
			
			event.setNom(nom);
			event.setDate(date);
			event.setLieu(lieu);
			event.setPrix(prix);
			event.setDescription(description);

			tx.commit();
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	
	public Evenement read (Long id) {
		
		EntityTransaction tx =  manager.getTransaction();
    	
		Evenement event;
		try{
			
			tx.begin();
			
			event = manager.find(Evenement.class, id);
			
			if(event == null) {
    			throw new EntityNotFoundException("Evenement non trouvé pour l'id : " +id);

			}
			
			tx.commit();
		} catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
    		
    	return event;
			
	}
	
	public void delete (Long id) {
		
	EntityTransaction tx = manager.getTransaction();
    	
    	try {
    		 
    		tx.begin();
    		
    		// Récupération de l'entité existante grâce à son identifiant
        	Evenement event = manager.find(Evenement.class, id);
        	
        	if(event == null) {
        		throw new EntityNotFoundException("Ticket non trouvé pour l'id : " +id);
        	}
        	
        	manager.remove (event);

            tx.commit();
    		
    	}catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
		
	}

}
