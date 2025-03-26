package domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class Evenement {

	private long id;
	private String nom;
	private Date date;
	private String lieu;
	private int prix;
	private String description;

	private List<Artiste> artistes = new ArrayList<>();
	private List<GenreMusical> genreMusicaux = new ArrayList<>();
	private List<Notification> notifs = new ArrayList<>();
	private List<Ticket> tickets = new ArrayList<>();
	private Salle salle;

	public Evenement(String nom, Date date, String lieu, int prix, String description) {
		this.nom = nom;
		this.date = date;
		this.lieu = lieu;
		this.prix = prix;
		this.description = description;
	}

	public Evenement() {}

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public int getPrix() {
		return prix;
	}

	public void setPrix(int prix) {
		this.prix = prix;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@ManyToMany(mappedBy = "evenements", cascade = CascadeType.PERSIST)
	public List<Artiste> getArtistes() {
		return artistes;
	}

	public void setArtistes(List<Artiste> artistes) {
		this.artistes = artistes;
	}

	@ManyToMany(mappedBy = "evenements", cascade = CascadeType.PERSIST)
	public List<GenreMusical> getGenreMusicaux() {
		return genreMusicaux;
	}

	public void setGenreMusicaux(List<GenreMusical> genreMusicaux) {
		this.genreMusicaux = genreMusicaux;
	}

	@OneToMany(mappedBy = "evenement", cascade = CascadeType.PERSIST)
	public List<Notification> getNotification() {
		return notifs;
	}

	public void setNotification(List<Notification> notifs) {
		this.notifs = notifs;
	}

	@OneToMany(mappedBy = "evenement", cascade = CascadeType.PERSIST)
	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	@ManyToOne
	@JoinColumn(name = "salle_id")  // JoinColumn to define the foreign key in the Evenement table
	public Salle getSalle() {
		return salle;
	}

	public void setSalle(Salle salle) {
		this.salle = salle;
	}
}
