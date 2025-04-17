package dao;

import domain.Evenement;
import domain.Place;
import domain.Ticket;
import domain.Utilisateur;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jpa.EntityManagerHelper;

import java.util.List;

public class TicketDao {

    private EntityManager manager;

    
    public TicketDao() {
        this.manager = EntityManagerHelper.getEntityManager();
    }

    public List<Ticket> getAllTicket(){
        String s = "select e from Ticket as e";
        return manager.createQuery(s).getResultList();
    }
    
    public Ticket getTicketById(Long id){
            String s =  "select e from Ticket as e where e.id = :id";
            return manager.createQuery(s, Ticket.class).setParameter("id", id).getSingleResult();
    }


    
    public Ticket save (Ticket ticket, Utilisateur utilisateur, Place place, Evenement evenement){

        EntityTransaction tx = manager.getTransaction();
        try {
            //Début de la transaction
            tx.begin();

            // Création de l'objet
           // Ticket t = new Ticket(prixPaye, utilisateur, place, evenement);

            manager.persist(ticket);

            // Validation de la transaction
            tx.commit();
        }
        catch(Exception e){
           if (tx.isActive()) {
               tx.rollback();
           }
           throw e;
        }
        
        return ticket;
    }

  
    public Ticket update(Ticket ticket, Utilisateur utilisateur, Place place, Evenement evenement){

        EntityTransaction tx = manager.getTransaction();

        try {
            tx.begin();

            // Récupération de l'entité existante grâce à son identifiant

            Ticket oldTicket = manager.find(Ticket.class, ticket.getId());

            // Gestion dans le cas où aucun ticket n'a été trouvé
            if (oldTicket == null) {

                throw new EntityNotFoundException("Ticket non trouvé pour l'id : " +ticket.getId());
            }

            // Mise à jour de l'objet
            oldTicket.setPrixPaye(ticket.getPrixPaye());
            oldTicket.setUtilisateur(ticket.getUtilisateur());
            oldTicket.setPlace(ticket.getPlace());
            oldTicket.setEvenement(ticket.getEvenement());

            // Validation de la transaction
            tx.commit();
        }
        catch(Exception e){
            if (tx.isActive()) {
                tx.rollback();
            }
            throw e;
        }
        
        return ticket;
    }
    
    
    public Ticket read(Long id) {
    	
    	EntityTransaction tx =  manager.getTransaction();
    	
    	Ticket t;
    	
    	try {
    		
    		tx.begin();
    		
    		 t = manager.find(Ticket.class, id);
    		
    		if( t == null) {
    			throw new EntityNotFoundException("Ticket non trouvé pour l'id : " +id);
    		}
    		
    		    		
    		tx.commit();
    		
    	} catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();
    		}
    		
    		throw e;
    	}
    	
    	
    	return t;
    }
    
   
    public void delete(Long id){
    	
    	EntityTransaction tx = manager.getTransaction();
    	
    	try {
    		 
    		tx.begin();
    		
    		// Récupération de l'entité existante grâce à son identifiant
        	Ticket t = manager.find(Ticket.class, id);
        	
        	if(t == null) {
        		throw new EntityNotFoundException("Ticket non trouvé pour l'id : " +id);
        	}
        	
        	manager.remove (t);

            tx.commit();
    		
    	}catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}

    }
}
