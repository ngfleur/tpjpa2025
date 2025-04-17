package dto;

import domain.GenreMusical;

public class GenreMusicalDtoOut {
    private Long id;
    private String nom;

    public GenreMusicalDtoOut(GenreMusical genre) {
        this.id = genre.getId();
        this.nom = genre.getNom();
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }
}
