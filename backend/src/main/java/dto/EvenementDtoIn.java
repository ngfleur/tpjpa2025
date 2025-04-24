package dto;


import java.util.Date;

public class EvenementDtoIn {
    private String titre;
    private Date dateDebut;
    private Date dateFin;
    private String lieu;
    private double prix;
    private String description;
    private int capacite;

    // Getters & Setters
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public Date getDateDebut() { return dateDebut; }
    public void setDateDebut(Date dateDebut) { this.dateDebut = dateDebut; }

    public Date getDateFin() { return dateFin; }
    public void setDateFin(Date dateFin) { this.dateFin = dateFin; }

    public String getLieu() { return lieu; }
    public void setLieu(String lieu) { this.lieu = lieu; }

    public double getPrix() { return prix; }
    public void setPrix(double prix) { this.prix = prix; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getCapacite() { return capacite; }
    public void setCapacite(int capacite) { this.capacite = capacite; }
}

