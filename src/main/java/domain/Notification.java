package domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Notification {

	private long id;
	private String message;
	private List<Utilisateur> utilisateurs;
	private Evenement evenement;

	@Id
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@ManyToMany(mappedBy = "notifications", cascade = CascadeType.PERSIST)
	public List<Utilisateur> getUtilisateurs() {
		return utilisateurs;
	}

	public void setUtilisateurs(List<Utilisateur> utilisateurs) {
		this.utilisateurs = utilisateurs;
	}

	@ManyToOne
	@JoinColumn(name = "evenement_id")  // Foreign key to Evenement table
	public Evenement getEvenement() {
		return evenement;
	}

	public void setEvenement(Evenement evenement) {
		this.evenement = evenement;
	}
}
