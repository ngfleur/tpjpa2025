package dao;

import java.util.List;

import domain.Place;
import domain.Salle;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;
import jpa.EntityManagerHelper;

public class SalleDao {
	
private EntityManager manager;
	
	public SalleDao(EntityManager manager) {
		this.manager = manager;	
	}
	
	public List <Salle> getAllSalle(){
		
		String s = "select sa from Salle as u";
		return EntityManagerHelper.getEntityManager().createQuery(s).getResultList();
		
	}
	
	public Salle getSalleById(Long id) {
		
		String s = "select sa from Salle as sa where sa.id = :id";
		return EntityManagerHelper.getEntityManager().createQuery(s, Salle.class).getSingleResult();
	}
	
	
	// Pour récupérer la liste des Places par salle
	
	public List <Place> getPlacesBySalleId (Long id){
		
		EntityTransaction tx = manager.getTransaction();
		
		List<Place> places;
		
		try {
			
			tx.begin();
			
			
			TypedQuery<Place> query = manager.createQuery(
					"select p from Place as p where p.salle.id = :id",	
					
					Place.class		
					
					);
						
			query.setParameter("id", id);
			places = query.getResultList();
			
			tx.commit();
			
		} catch (Exception e) {
			if(tx.isActive()) {
				tx.rollback();
			}
			
			throw e;
		}
		
		return places;
	}
	
	
	public void save (String name, String adresseSalle) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			// Demarrer la transaction
			
			tx.begin();
			
			// Demarrer la transaction
			
			Salle salle = new Salle (name, adresseSalle);
			
			manager.persist(salle);
			
			//Fin de la transaction
			tx.commit();
			
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	public void update (Long id, String name, String adresseSalle) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			tx.begin();
			
			// Demarrer la transaction
			
			Salle salle = manager.find(Salle.class, id);
			
			if (salle == null) {
				throw new EntityNotFoundException("Salle non trouvé pour l'id : " +id);
            }
			
			
			salle.setName(name);
			salle.setAdresseSalle(adresseSalle);

			

			tx.commit();
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	
	public Salle read (Long id) {
		
		EntityTransaction tx =  manager.getTransaction();
    	
		Salle salle;
		try{
			
			tx.begin();
			
			salle = manager.find(Salle.class, id);
			
			if(salle == null) {
    			throw new EntityNotFoundException("Salle non trouvé pour l'id : " +id);

			}
			
			tx.commit();
		} catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
    		
    	return salle;
			
	}
	
	public void delete (Long id) {
		
	EntityTransaction tx = manager.getTransaction();
    	
    	try {
    		 
    		tx.begin();
    		
    		// Récupération de l'entité existante grâce à son identifiant
    		Salle salle = manager.find(Salle.class, id);
        	
        	if(salle == null) {
        		throw new EntityNotFoundException("Salle non trouvé pour l'id : " +id);
        	}
        	
        	manager.remove (salle);

            tx.commit();
    		
    	}catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
		
	}

}
