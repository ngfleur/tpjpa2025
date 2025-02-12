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

    
    public TicketDao(EntityManager manager) {
        this.manager = manager;
    }

    public List<Ticket> getAllTicket(){
        String s = "select e from Ticket as e";
        return EntityManagerHelper.getEntityManager().createQuery(s).getResultList();
    }
    
    public Ticket getTicketById(Long id){
            String s =  "select e from Ticket as e where e.id = :id";
            return EntityManagerHelper.getEntityManager().createQuery(s, Ticket.class).getSingleResult();
    }


    
    public void save (Double prixPaye, Utilisateur utilisateur, Place place, Evenement evenement){

        EntityTransaction tx = manager.getTransaction();
        try {
            //Début de la transaction
            tx.begin();

            // Création de l'objet
            Ticket t = new Ticket(prixPaye, utilisateur, place, evenement);

            manager.persist(t);

            // Validation de la transaction
            tx.commit();
        }
        catch(Exception e){
           if (tx.isActive()) {
               tx.rollback();
           }
           throw e;
        }
    }

    // A faire
    public void update(Long id, Double prixPaye, Utilisateur utilisateur, Place place, Evenement evenement){

        EntityTransaction tx = manager.getTransaction();

        try {
            tx.begin();

            // Récupération de l'entité existante grâce à son identifiant

            Ticket t = manager.find(Ticket.class, id);

            // Gestion dans le cas où aucun ticket n'a été trouvé
            if (t == null) {

                throw new EntityNotFoundException("Ticket non trouvé pour l'id : " +id);
            }

            // Mise à jour de l'objet
            t.setPrixPaye(prixPaye);
            t.setUtilisateur(utilisateur);
            t.setPlace(place);
            t.setEvenement(evenement);

            // Validation de la transaction
            tx.commit();
        }
        catch(Exception e){
            if (tx.isActive()) {
                tx.rollback();
            }
            throw e;
        }
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
