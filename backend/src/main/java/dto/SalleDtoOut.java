package dto;

public class SalleDtoOut {
    private Long id;
    private String name;
    private String adresseSalle;

    // Constructeurs
    public SalleDtoOut() {}

    public SalleDtoOut(Long id, String name, String adresseSalle) {
        this.id = id;
        this.name = name;
        this.adresseSalle = adresseSalle;
    }

    // Getters & Setters
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

    public String getAdresseSalle() {
        return adresseSalle;
    }

    public void setAdresseSalle(String adresseSalle) {
        this.adresseSalle = adresseSalle;
    }
}
