package dto;

import domain.Utilisateur;
import enums.RoleUtilisateur;

public class UtilisateurDtoOut {
    private Long id;
    private String name;
    private String firstName;
    private String email;
    private RoleUtilisateur role;

    public UtilisateurDtoOut(Utilisateur utilisateur) {
        this.id = utilisateur.getId();
        this.name = utilisateur.getName();
        this.firstName = utilisateur.getFirstName();
        this.email = utilisateur.getEmail();
        this.role = utilisateur.getRole();
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getFirstName() { return firstName; }
    public String getEmail() { return email; }
    public RoleUtilisateur getRole() { return role; }
}
