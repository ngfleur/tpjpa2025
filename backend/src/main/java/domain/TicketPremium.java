package domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PREMIUM")
public class TicketPremium extends Ticket{
	
	private boolean accesVip;
	private String cadeau;
	
	
	@Column(name = "acces_vip")

	public boolean isAccesVip() {
		return accesVip;
	}
	
	public void setAccesVip(boolean accesVip) {
		this.accesVip = accesVip;
	}

	public String getCadeau() {
		return cadeau;
	}

	public void setCadeau(String cadeau) {
		this.cadeau = cadeau;
	}
	

}
