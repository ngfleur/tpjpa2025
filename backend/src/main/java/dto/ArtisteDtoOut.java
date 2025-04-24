package dto;

import domain.Artiste;

public class ArtisteDtoOut {
    private Long id;
    private String nom;

    public ArtisteDtoOut(Artiste artiste) {
        this.id = artiste.getId();
        this.nom = artiste.getNom();
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }
}
