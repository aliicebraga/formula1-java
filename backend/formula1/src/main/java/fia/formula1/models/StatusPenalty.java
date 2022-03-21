package fia.formula1.models;

public enum StatusPenalty {
	
	PENDING("Pending"),
	REVIEW("Review"),
	COMPLETE("complete"),
	CANCELED("Canceled");
	
	private String description;
	
	StatusPenalty(String description){
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
