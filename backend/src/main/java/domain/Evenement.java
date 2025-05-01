package domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Evenement {

    private long id;
    private String titre;
    private String description;
    private String lieu;
    private Date dateDebut;
    private Date dateFin;
    private double prix;
    private int capacite;
    private int inscrits;
    private Salle salle;
    private List<Artiste> artistes = new ArrayList<>();
    private List<GenreMusical> genreMusicaux = new ArrayList<>();
    private List<Notification> notifs = new ArrayList<>();
    private List<Ticket> tickets = new ArrayList<>();

    // Constructeur mis à jour
    public Evenement(String titre, Date dateDebut, Date dateFin, String lieu, Double prix, String description, int capacite) {
        this.titre = titre;
        this.description = description;
        this.lieu = lieu;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.prix = prix;
        this.capacite = capacite;
        this.inscrits = 0;
    }

    // Constructeur par défaut
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
    }

    // Méthode pour incrémenter le nombre d'inscrits et mettre à jour le statut
    public void incrementerInscrits() {
        if (inscrits < capacite) {
            inscrits++;
        }
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"evenements", "places", "hibernateLazyInitializer", "handler"})
    public Salle getSalle() {
        return salle;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonManagedReference
    public List<Artiste> getArtistes() {
        return artistes;
    }

    public void setArtistes(List<Artiste> artistes) {
        this.artistes = artistes;
    }


    @ManyToMany(fetch = FetchType.LAZY)
    @JsonManagedReference
    public List<GenreMusical> getGenreMusicaux() {
        return genreMusicaux;
    }

    public void setGenreMusicaux(List<GenreMusical> genreMusicaux) {
        this.genreMusicaux = genreMusicaux;
    }

    @OneToMany(mappedBy = "evenement", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    public List<Notification> getNotifs() {
        return notifs;
    }

    public void setNotifs(List<Notification> notifs) {
        this.notifs = notifs;
    }

    @OneToMany(mappedBy = "evenement", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("evenement")
    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
}
