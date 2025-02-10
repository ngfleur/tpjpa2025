package domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Salle {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String name;
	
	private String adresseSalle;
	
	private List<Place> places = new ArrayList<Place>();
	
	//Constructeur sans paramètre
	public Salle () {
		
	}
	//Constructeur 
	public Salle (String name, String adresseSalle) {
		this.name = name;
		this.adresseSalle = adresseSalle;
		
	}
	
	//getters
	public String getName() {
		return name;
	}
	
	//Setters
	public void setName(String name) {
		this.name = name;
	}
	
	@OneToMany(mappedBy="places")
	public List<Place> getPlaces() {
		return places;
	}
	public void setPlaces(List<Place> places) {
		this.places = places;
	}
	/**
	 * @return the adresseSalle
	 */
	public String getAdresseSalle() {
		return adresseSalle;
	}
	/**
	 * @param adresseSalle the adresseSalle to set
	 */
	public void setAdresseSalle(String adresseSalle) {
		this.adresseSalle = adresseSalle;
	}

}
