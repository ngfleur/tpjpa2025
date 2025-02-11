package domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Ticket {
	
	private Long id;
	
	private Double prixPaye;
	
	private Utilisateur utilisateur;
	private Evenement evenement;
	
	private Place place;
	
	//Constructeur sans paramètre
	public Ticket() {
		
	}
	
	//Constructeur avec paramètre
	public Ticket(Double prixPaye, Utilisateur utilisateur, Place place, Evenement evenement) {
		this.prixPaye = prixPaye;
		this.utilisateur = utilisateur;
		this.place = place;
		this.evenement = evenement ;
	}

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getPrixPaye() {
		return prixPaye;
	}

	public void setPrixPaye(Double prixPaye) {
		this.prixPaye = prixPaye;
	}
	
	@ManyToOne
	public Utilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

	/**
	 * @return the place
	 */
	@ManyToOne
	public Place getPlace() {
		return place;
	}

	/**
	 * @param place the place to set
	 */
	public void setPlace(Place place) {
		this.place = place;
	}

	/**
	 * @return the evenement
	 */
	@ManyToOne
	public Evenement getEvenement() {
		return evenement;
	}

	/**
	 * @param evenement the evenement to set
	 */
	public void setEvenement(Evenement evenement) {
		this.evenement = evenement;
	}
}
