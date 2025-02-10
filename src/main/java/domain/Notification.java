package domain;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Notification {
	
	private long id;
	private String contenu;
	private Evenement event;

	
	

public Notification(String contenu) {
	this.contenu = contenu;
}

public Notification() {
}

@Id
@GeneratedValue
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}

public String getContenu() {
	return contenu;
}
public void setNom(String contenu) {
	this.contenu = contenu;
}



@ManyToOne
public Evenement getEvent() {
	return event;
}

public void setEvent(Evenement event) {
	this.event = event;
}


}
