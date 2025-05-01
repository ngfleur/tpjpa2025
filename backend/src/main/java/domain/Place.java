package domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Place {

    private Long id;

    private String numeroEmplacement;

    private List<Ticket> tickets = new ArrayList<Ticket>();

    private Salle salle;

    //Constructeur sans paramètre
    public Place() {

    }

    //Constructeur
    public Place(String numeroEmplacement, Salle salle) {
        this.numeroEmplacement = numeroEmplacement;
        this.salle = salle;
    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroEmplacement() {
        return numeroEmplacement;
    }

    public void setNumeroEmplacement(String emplacement) {
        this.numeroEmplacement = emplacement;
    }

    @OneToMany(mappedBy = "place")
    @JsonIgnoreProperties("place")
    public List<Ticket> getTickets() {
        return tickets;
    }

    /**
     * @param tickets the tickets to set
     */
    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    /**
     * @return the salle
     */
    @ManyToOne
    @JsonIgnoreProperties("places")
    public Salle getSalle() {
        return salle;
    }

    /**
     * @param salle the salle to set
     */
    public void setSalle(Salle salle) {
        this.salle = salle;
    }

}
