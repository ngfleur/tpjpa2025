package dto;

import enums.RoleUtilisateur;

public class UtilisateurDtoIn {
    private String name;
    private String firstName;
    private String email;
    private RoleUtilisateur role;
    private String mdp;


    // Getters & Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public RoleUtilisateur getRole() { return role; }
    public void setRole(RoleUtilisateur role) { this.role = role; }

    public String getMdp() { return mdp; }
    public void setMdp(String mdp) { this.mdp = mdp; }
}

