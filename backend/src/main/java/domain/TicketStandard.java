package domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("STANDARD")
public class TicketStandard extends Ticket{
	
	private boolean placeAssise;
	private String zone;
	
	@Column(name = "place_assise")
	public boolean isPlaceAssise() {
		return placeAssise;
	}
	
	public void setPlaceAssise(boolean placeAssise) {
		this.placeAssise = placeAssise;
	}
	
	public String getZone() {
	    return zone;
	}

	public void setZone(String zone) {
	    this.zone = zone;
	}
}
