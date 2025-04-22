package dto;

public class SalleDtoIn {
    private String name;
    private String adresseSalle;

    // Constructeurs
    public SalleDtoIn() {}

    public SalleDtoIn(String name, String adresseSalle) {
        this.name = name;
        this.adresseSalle = adresseSalle;
    }

    // Getters & Setters
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
