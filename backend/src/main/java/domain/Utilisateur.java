package domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import enums.RoleUtilisateur;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Utilisateur {

    private Long id;

    private String name;

    private String firstName;

    private String email;

    private String mdp;


    //role: admin, organisateur, participant
    private RoleUtilisateur role;

    private List<Evenement> evenements = new ArrayList<Evenement>();

    // Liste des tickets achétés par un utilisateur
    private List<Ticket> tickets = new ArrayList<Ticket>();


    // Collection des notifications recus par un utilisateur
    private List<Notification> notifs = new ArrayList<>();

    //Constructeur sans paramètre
    public Utilisateur() {
    }

    //Constructeur paramétré
    public Utilisateur(String name, String firstName, String email, String mdp, RoleUtilisateur role) {
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.mdp = mdp;
        this.role = role;
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

    public RoleUtilisateur getRole() {
        return role;
    }

    public void setRole(RoleUtilisateur role) {
        this.role = role;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    // Getters pour la liste de tickets
    @OneToMany(mappedBy = "utilisateur")
    public List<Ticket> getTickets() {
        return tickets;
    }

    // Setters pour la liste de tickets
    public void setTickets(List<Ticket> tickets) {
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

    @OneToMany(mappedBy = "organisateur")
    @JsonIgnoreProperties("organisateur")
    public List<Evenement> getEvenements() {
        return evenements;
    }

    public void setEvenements(List<Evenement> evenements) {
        this.evenements = evenements;
    }
}