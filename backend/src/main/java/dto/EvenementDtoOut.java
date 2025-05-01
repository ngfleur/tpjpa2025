package dto;

import domain.Evenement;

import java.util.Date;

public class EvenementDtoOut {
    private Long id;
    private String titre;
    private Date dateDebut;
    private Date dateFin;
    private String lieu;
    private double prix;
    private String description;
    private int capacite;
    private int inscrits;
    private Long salleId;

    // Constructeur pour remplir depuis une entité
    public EvenementDtoOut(Evenement evt) {
        this.id = evt.getId();
        this.titre = evt.getTitre();
        this.dateDebut = evt.getDateDebut();
        this.dateFin = evt.getDateFin();
        this.lieu = evt.getLieu();
        this.prix = evt.getPrix();
        this.description = evt.getDescription();
        this.capacite = evt.getCapacite();
        this.inscrits = evt.getInscrits();
        this.salleId = evt.getSalle() != null ? evt.getSalle().getId() : null;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public String getLieu() {
        return lieu;
    }

    public double getPrix() {
        return prix;
    }

    public String getDescription() {
        return description;
    }

    public int getCapacite() {
        return capacite;
    }

    public int getInscrits() {
        return inscrits;
    }

    public Long getSalleId() {
        return salleId;
    }
}
