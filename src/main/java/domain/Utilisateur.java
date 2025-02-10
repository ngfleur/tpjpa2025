package domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Utilisateur {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String name;
	
	private String firstName;
	
	private String email;
	
	// Liste des tickets achétés par un utilisateur
	private List <Ticket> tickets = new ArrayList <Ticket>(); 
	
	//Constructeur sans paramètre
	public Utilisateur() {
		
		
	}
	
	//Constructeur paramétré
	public Utilisateur(String name, String firstName, String email) {
		this.name = name;
		this.firstName = firstName;
		this.email = email;
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


	// Getters pour la liste de tickets
	@OneToMany(mappedBy="tickets")
	public List <Ticket> getTickets() {
		return tickets;
	}

	// Setters pour la liste de tickets
	public void setTickets(List <Ticket> tickets) {
		this.tickets = tickets;
	}
	

}
