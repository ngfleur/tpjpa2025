package domain;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Artiste {
	
	private long id;
	private String nom;
	private List<Evenement> evenements = new ArrayList<Evenement>();

	
public Artiste() {
		
}

public Artiste(String nom) {
	this.nom = nom;
}

@Id
@GeneratedValue
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}

public String getNom() {
	return nom;
}
public void setNom(String nom) {
	this.nom = nom;
}



@ManyToMany(mappedBy = "artistes", cascade = CascadeType.PERSIST)
@JsonBackReference
public List<Evenement> getEvenements() {
	return evenements;
}

public void setEvenements(List<Evenement> evenements) {
	this.evenements = evenements;
}

}
