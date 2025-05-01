package domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;


@Entity
public class Salle {

    private Long id;

    private String name;

    private String adresseSalle;

    private List<Evenement> evenements = new ArrayList<Evenement>();
    private List<Place> places = new ArrayList<Place>();

    //Constructeur sans paramètre
    public Salle() {

    }

    //Constructeur
    public Salle(String name, String adresseSalle) {
        this.name = name;
        this.adresseSalle = adresseSalle;

    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    //getters
    public String getName() {
        return name;
    }

    //Setters
    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy = "salle")
    @JsonIgnoreProperties("salle")
    public List<Evenement> getEvenements() {
        return evenements;
    }

    public void setEvenements(List<Evenement> evenements) {
        this.evenements = evenements;
    }

    @OneToMany(mappedBy = "salle")
    @JsonIgnoreProperties("salle")
    public List<Place> getPlaces() {
        return places;
    }

    public void setPlaces(List<Place> places) {
        this.places = places;
    }

    /**
     * @return the adresseSalle
     */
    public String getAdresseSalle() {
        return adresseSalle;
    }

    /**
     * @param adresseSalle the adresseSalle to set
     */
    public void setAdresseSalle(String adresseSalle) {
        this.adresseSalle = adresseSalle;
    }

}
