package domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class GenreMusical {
	
	private long id;
	private String nom;
	private List<Evenement> evenements = new ArrayList<Evenement>();

	

public GenreMusical(String nom) {
	this.nom = nom;
}

public GenreMusical() {
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



@ManyToMany(mappedBy = "genreMusicaux", cascade = CascadeType.PERSIST)
@JsonBackReference
public List<Evenement> getEvenements() {
	return evenements;
}

public void setEvenements(List<Evenement> evenements) {
	this.evenements = evenements;
}


}
