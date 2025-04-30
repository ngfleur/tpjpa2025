package domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import enums.StatutEvenement;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Evenement {

	private long id;
	private String titre;
	private Date dateDebut;
	private Date dateFin;
	private int capacite;
	private int inscrits;
	private StatutEvenement statut;

	private String lieu;
	private Double prix;
	private String description;

	private List<Artiste> artistes = new ArrayList<>();
	private List<GenreMusical> genreMusicaux = new ArrayList<>();
	private List<Notification> notifs = new ArrayList<>();
	private List<Ticket> tickets = new ArrayList<>();

	// Constructeur mis à jour
	public Evenement(String titre, Date dateDebut, Date dateFin, String lieu, Double prix, String description, int capacite) {
		this.titre = titre;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.lieu = lieu;
		this.prix = prix;
		this.description = description;
		this.capacite = capacite;
		this.inscrits = 0;
		this.statut = StatutEvenement.OUVERT; // Par défaut, l'événement est "ouvert"
	}

	public Evenement() {
		// Constructeur par défaut
	}

	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public Double getPrix() {
		return prix;
	}

	public void setPrix(Double prix) {
		this.prix = prix;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getCapacite() {
		return capacite;
	}

	public void setCapacite(int capacite) {
		this.capacite = capacite;
	}

	public int getInscrits() {
		return inscrits;
	}

	public void setInscrits(int inscrits) {
		this.inscrits = inscrits;
		mettreAJourStatut();  // Mise à jour du statut quand le nombre d'inscrits change
	}

	public StatutEvenement getStatut() {
		return statut;
	}

	public void setStatut(StatutEvenement statut) {
		this.statut = statut;
	}

	// Méthode pour mettre à jour le statut en fonction des inscriptions
	public void mettreAJourStatut() {
		if (this.statut == StatutEvenement.ANNULE || this.statut == StatutEvenement.TERMINE) {
			return; // Ne pas changer si l'événement est déjà annulé ou terminé
		}

		if (inscrits >= capacite) {
			this.statut = StatutEvenement.COMPLET;
		} else if (this.statut != StatutEvenement.EN_COURS && new Date().before(dateDebut)) {
			this.statut = StatutEvenement.OUVERT;  // L'événement est ouvert avant la date de début
		} else if (this.statut != StatutEvenement.EN_COURS && new Date().after(dateFin)) {
			this.statut = StatutEvenement.TERMINE; // L'événement est terminé après la date de fin
		}
	}

	// Méthode pour incrémenter le nombre d'inscrits et mettre à jour le statut
	public void incrementerInscrits() {
		if (inscrits < capacite) {
			inscrits++;
		}
		mettreAJourStatut(); // Actualiser le statut à chaque inscription
	}

	@ManyToMany
	@JsonManagedReference
	public List<Artiste> getArtistes() {
		return artistes;
	}

	public void setArtistes(List<Artiste> artistes) {
		this.artistes = artistes;
	}


	@ManyToMany
	@JsonManagedReference
	public List<GenreMusical> getGenreMusicaux() {
		return genreMusicaux;
	}

	public void setGenreMusicaux(List<GenreMusical> genreMusicaux) {
		this.genreMusicaux = genreMusicaux;
	}

	@OneToMany(mappedBy = "evenement", cascade = CascadeType.PERSIST)
	public List<Notification> getNotifs() {
		return notifs;
	}

	public void setNotifs(List<Notification> notifs) {
		this.notifs = notifs;
	}

	@OneToMany(mappedBy = "evenement", cascade = CascadeType.PERSIST)
	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}
}
