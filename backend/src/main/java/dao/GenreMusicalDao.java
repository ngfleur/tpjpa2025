package dao;

import java.util.List;

import domain.Artiste;
import domain.Evenement;
import domain.GenreMusical;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;
import jpa.EntityManagerHelper;

public class GenreMusicalDao {


	private EntityManager manager;
	
	public GenreMusicalDao(EntityManager manager) {
		this.manager = manager;	
	}
	
	public List <GenreMusical> getAllGenreMusical(){
		
		String s = "select g from GenreMusical as g";
		return EntityManagerHelper.getEntityManager().createQuery(s).getResultList();
		
	}
	
	public GenreMusical getGenreMusicalById(Long id) {
		
		String s = "select g from GenreMusical as g where g.id = :id";
		return EntityManagerHelper.getEntityManager().createQuery(s, GenreMusical.class).getSingleResult();
	}
	
	
	// Pour récupérer la liste des evenements par GenreMusical
	
	public List <Evenement> getEvenementsByGenreMusicalId (Long id){
		
		EntityTransaction tx = manager.getTransaction();
		
		List<Evenement> events;
		
		try {
			
			tx.begin();
			
			// Utilisation d'une jointure , relation ManyToMany
			TypedQuery<Evenement> query = manager.createQuery(
					
	                "Select e from Evenement e JOIN e.genreMusicaux g where g.id = :id", 		
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
			
			GenreMusical genreMusical = new GenreMusical (nom);
			
			manager.persist(genreMusical);
			
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
			
			GenreMusical genreMusical = manager.find(GenreMusical.class, id);
			
			if (genreMusical == null) {
				throw new EntityNotFoundException("GenreMusical non trouvé pour l'id : " +id);
            }
			
			
			genreMusical.setNom(nom);

			tx.commit();
			} catch(Exception e) {
				
				if(tx.isActive()) {
					tx.rollback();
				}
				throw e;
		}
		
	}
	
	
	public GenreMusical read (Long id) {
		
		EntityTransaction tx =  manager.getTransaction();
    	
		GenreMusical genreMusical;
		
		try{
			
			tx.begin();
			
			genreMusical = manager.find(GenreMusical.class, id);
			
			if(genreMusical == null) {
    			throw new EntityNotFoundException("GenreMusical non trouvé pour l'id : " +id);

			}
			
			tx.commit();
		} catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
    		
    	return genreMusical;
			
	}
	
	public void delete (Long id) {
		
	EntityTransaction tx = manager.getTransaction();
    	
    	try {
    		 
    		tx.begin();
    		
    		// Récupération de l'entité existante grâce à son identifiant
    		GenreMusical genreMusical = manager.find(GenreMusical.class, id);
        	
        	if(genreMusical == null) {
        		throw new EntityNotFoundException("GenreMusical non trouvé pour l'id : " +id);
        	}
        	
        	manager.remove (genreMusical);

            tx.commit();
    		
    	}catch(Exception e) {
    		
    		if(tx.isActive()) {
    			tx.rollback();			
    		}
    		
    		throw e;
    	}
		
	}

}
