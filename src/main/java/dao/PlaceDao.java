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

    
    public PlaceDao(EntityManager manager) {
        this.manager = manager;
    }

    public List<Place> getAllTicket(){
        String s = "select p from Place as p";
        return EntityManagerHelper.getEntityManager().createQuery(s).getResultList();
    }
    
    public Ticket getPlaceById(Long id){
            String s =  "select p from Place as p where p.id = :id";
            return EntityManagerHelper.getEntityManager().createQuery(s, Ticket.class).getSingleResult();
    }
    
    
    // La liste des tickets par place
    
    public List <Ticket> getTicketsByPlaceId (Long id){
		
		EntityTransaction tx = manager.getTransaction();
		
		List<Ticket> tickets;
		
		try {
			
			tx.begin();
			
			TypedQuery<Ticket> query = manager.createQuery(
					"select t from Ticket as t where t.place.id = :id",		
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


    
    public void save (String numeroEmplacement, Salle salle){

        EntityTransaction tx = manager.getTransaction();
        try {
            //Début de la transaction
            tx.begin();

            // Création de l'objet
            Place place = new Place(numeroEmplacement, salle);

            manager.persist(place);

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

    
    public void update(Long id, String numeroEmplacement, Salle salle){

        EntityTransaction tx = manager.getTransaction();

        try {
            tx.begin();

            // Récupération de l'entité existante grâce à son identifiant

            Place place = manager.find(Place.class, id);

            // Gestion dans le cas où aucun ticket n'a été trouvé
            if (place == null) {

                throw new EntityNotFoundException("Place non trouvé pour l'id : " +id);
            }

            // Mise à jour de l'objet
            place.setNumeroEmplacement(numeroEmplacement);
            place.setSalle(salle);
          

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
    
    
    public Place read(Long id) {
    	
    	EntityTransaction tx =  manager.getTransaction();
    	
    	Place place;
    	
    	try {
    		
    		tx.begin();
    		
    		 place = manager.find(Place.class, id);
    		
    		if( place == null) {
    			throw new EntityNotFoundException("Place non trouvé pour l'id : " +id);
    		}
    		
    		    		
    		tx.commit();
    		
    	} catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();
    		}
    		
    		throw e;
    	}
    	
    	
    	return place;
    }
    
   
    public void delete(Long id){
    	
    	EntityTransaction tx = manager.getTransaction();
    	
    	try {
    		 
    		tx.begin();
    		
    		// Récupération de l'entité existante grâce à son identifiant
        	Place place = manager.find(Place.class, id);
        	
        	if(place == null) {
        		throw new EntityNotFoundException("Place non trouvé pour l'id : " +id);
        	}
        	
        	manager.remove (place);

            tx.commit();
    		
    	}catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}

    }

}
