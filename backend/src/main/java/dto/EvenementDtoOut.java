package dto;

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

    // Constructeur pour remplir depuis une entité
    public EvenementDtoOut(domain.Evenement evt) {
        this.id = evt.getId();
        this.titre = evt.getTitre();
        this.dateDebut = evt.getDateDebut();
        this.dateFin = evt.getDateFin();
        this.lieu = evt.getLieu();
        this.prix = evt.getPrix();
        this.description = evt.getDescription();
        this.capacite = evt.getCapacite();
    }

    // Getters
    public Long getId() { return id; }
    public String getTitre() { return titre; }
    public Date getDateDebut() { return dateDebut; }
    public Date getDateFin() { return dateFin; }
    public String getLieu() { return lieu; }
    public double getPrix() { return prix; }
    public String getDescription() { return description; }
    public int getCapacite() { return capacite; }
}
