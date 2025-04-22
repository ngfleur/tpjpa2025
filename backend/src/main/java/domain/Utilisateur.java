package domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Utilisateur {
	
	private Long id;
	
	private String name;
	
	private String firstName;
	
	private String email;
	
	private String motDePasse;

	
	// Liste des tickets achétés par un utilisateur
	private List <Ticket> tickets = new ArrayList <Ticket>(); 
	
	
	// Collection des notifications recus par un utilisateur
	private List<Notification> notifs = new ArrayList<>();
	
	//Constructeur sans paramètre
	public Utilisateur() {
		
		
	}
	
	//Constructeur paramétré
	public Utilisateur(String name, String firstName, String email) {
		this.name = name;
		this.firstName = firstName;
		this.email = email;
	}
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonIgnore // Pour pas qu'on retourne le mot de passe
	public String getMotDePasse() {
		return motDePasse;
	}
	
	public void setMotDePasse(String motDePasse) {
		this.motDePasse = motDePasse;
	}

	// Getters pour la liste de tickets
	@OneToMany(mappedBy="utilisateur")
	public List <Ticket> getTickets() {
		return tickets;
	}

	// Setters pour la liste de tickets
	public void setTickets(List <Ticket> tickets) {
		this.tickets = tickets;
	}

	/**
	 * @return the notifs
	 */
	 @ManyToMany
	public List<Notification> getNotifs() {
		return notifs;
	}

	/**
	 * @param notifs the notifs to set
	 */
	public void setNotifs(List<Notification> notifs) {
		this.notifs = notifs;
	}
	

}
