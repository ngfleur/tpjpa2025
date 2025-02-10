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

@Entity
public class Evenement {

private long id;
private String nom;
private Date date;
private String lieu;
private int prix;
private String description;


private List<Artiste> artistes = new ArrayList<Artiste>();

private List<GenreMusical> genreMusicaux = new ArrayList<GenreMusical>();

private List<Notification> notifs = new ArrayList<Notification>();

private List<Ticket> tickets = new ArrayList<Ticket>();


public Evenement(String nom, Date date, String lieu, int prix, String description) {
	this.nom = nom;
	this.date = date;
	this.lieu = lieu;
	this.prix = prix;
	this.description = description;
}

public Evenement() {
	
}

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
	this.description =description;
}


@ManyToMany(mappedBy = "Evenement", cascade = CascadeType.PERSIST)
public List<Artiste> getArtistes() {
	return artistes;
}

public void setArtistes(List<Artiste> artistes) {
	this.artistes = artistes;
}


@ManyToMany(mappedBy = "Evenement", cascade = CascadeType.PERSIST)
public List<GenreMusical> getGenreMusicaux() {
	return genreMusicaux;
}

public void setGenreMusical(List<GenreMusical> genreMusicaux) {
	this.genreMusicaux = genreMusicaux;
}


@OneToMany(mappedBy = "Evenement", cascade = CascadeType.PERSIST)
public List<Notification> getNotifs() {
	return notifs;
}

public void setNotifs(List<Notification> notifs) {
	this.notifs = notifs;
}


@OneToMany(mappedBy = "Evenement", cascade = CascadeType.PERSIST)
public List<Ticket> getTickets() {
	return tickets;
}

public void setTickets(List<Ticket> tickets) {
	this.tickets = tickets;
}


}
