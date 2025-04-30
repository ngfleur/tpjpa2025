package domain;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Notification {
	
	private long id;

	


	private String contenu;
	
	private Evenement evenement;
	
	private List<Utilisateur> utilisateurs = new ArrayList<>();

	
		
	
	public Notification(String contenu, Evenement evenement) {
		this.contenu = contenu;
		this.evenement = evenement;
	}
	
	public Notification() {
	}
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getContenu() {
		return contenu;
	}
	public void setContenu(String contenu) {
		this.contenu = contenu;
	}
	
	
	
	@ManyToOne
	@JsonBackReference
	public Evenement getEvenement() {
		return evenement;
	}
	
	public void setEvenement(Evenement evenement) {
		this.evenement = evenement;
	}
	
	/**
	 * @return the utilisateurs
	 */
	@ManyToMany(mappedBy="notifs")
	public List<Utilisateur> getUtilisateurs() {
		return utilisateurs;
	}
	
	/**
	 * @param utilisateurs the utilisateurs to set
	 */
	public void setUtilisateurs(List<Utilisateur> utilisateurs) {
		this.utilisateurs = utilisateurs;
	}
	
	
 }
