package dao;

import java.util.List;

import domain.Artiste;
import domain.Evenement;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;
import jpa.EntityManagerHelper;

public class ArtisteDao {

	private EntityManager manager;
	
	public ArtisteDao(EntityManager manager) {
		this.manager = manager;	
	}
	
	public List <Artiste> getAllArtiste(){
		
		String s = "select a from Artiste as a";
		return EntityManagerHelper.getEntityManager().createQuery(s).getResultList();
		
	}
	
	public Artiste getArtisteById(Long id) {
		
		String s = "select a from Artiste as a where a.id = :id";
		return EntityManagerHelper.getEntityManager().createQuery(s, Artiste.class).getSingleResult();
	}
	
	
	// Pour récupérer la liste des evenements par artistes
	
	public List <Evenement> getEvenementsByArtisteId (Long id){
		
		EntityTransaction tx = manager.getTransaction();
		
		List<Evenement> events;
		
		try {
			
			tx.begin();
			
			// Utilisation d'une jointure , relation ManyToMany
			TypedQuery<Evenement> query = manager.createQuery(
					
	                "Select e from Evenement e JOIN e.artistes a where a.id = :id", 		
	                Evenement.class
					
					);
						
			query.setParameter("id", id);
			events = query.getResultList();
			
			tx.commit();
			
		} catch (Exception e) {
			if(tx.isActive()) {
				tx.rollback();
			}
			
			throw e;
		}
		
		return events;
	}
	
	
	public void save (String nom) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			// Demarrer la transaction
			
			tx.begin();
			
			// Demarrer la transaction
			
			Artiste artiste = new Artiste (nom);
			
			manager.persist(artiste);
			
			//Fin de la transaction
			tx.commit();
			
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	public void update (Long id, String nom) {
		
		EntityTransaction tx = manager.getTransaction();
		
		try {
			
			tx.begin();
			
			// Demarrer la transaction
			
			Artiste artiste = manager.find(Artiste.class, id);
			
			if (artiste == null) {
				throw new EntityNotFoundException("Artiste non trouvé pour l'id : " +id);
            }
			
			
			artiste.setNom(nom);

			tx.commit();
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	
	public Artiste read (Long id) {
		
		EntityTransaction tx =  manager.getTransaction();
    	
		Artiste artiste;
		
		try{
			
			tx.begin();
			
			artiste = manager.find(Artiste.class, id);
			
			if(artiste == null) {
    			throw new EntityNotFoundException("Artiste non trouvé pour l'id : " +id);

			}
			
			tx.commit();
		} catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
    		
    	return artiste;
			
	}
	
	public void delete (Long id) {
		
	EntityTransaction tx = manager.getTransaction();
    	
    	try {
    		 
    		tx.begin();
    		
    		// Récupération de l'entité existante grâce à son identifiant
    		Artiste artiste = manager.find(Artiste.class, id);
        	
        	if(artiste == null) {
        		throw new EntityNotFoundException("Artiste non trouvé pour l'id : " +id);
        	}
        	
        	manager.remove (artiste);

            tx.commit();
    		
    	}catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
		
	}


}
