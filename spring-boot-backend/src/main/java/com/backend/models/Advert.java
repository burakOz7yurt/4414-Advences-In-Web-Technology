package com.backend.models;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "advert")
public class Advert {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;


	@Column(name = "tradesmenId")
	private Long tradesmenId;
	@Column(name = "advert_name")
	private String advertName;
	@Column(name = "advert_category")
	private String advertCategory;
	@Column(name = "advert_desc")
	private String advertDesc;	
	
	
	
	public Advert() {
		super();
	}

	
	
	public Advert(Long tradesmenId, String advertName, String advertCategory, String advertDesc) {
		super();
		this.tradesmenId = tradesmenId;
		this.advertName = advertName;
		this.advertCategory = advertCategory;
		this.advertDesc = advertDesc;

	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return advertName;
	}

	public void setName(String advertName) {
		this.advertName = advertName;
	}

	public Long getTradesmenId() {
		return tradesmenId;
	}

	public void setTradesmenId(Long tradesmenId) {
		this.tradesmenId = tradesmenId;
	}

	public String getAdvertName() {
		return advertName;
	}

	public void setAdvertName(String advertName) {
		this.advertName = advertName;
	}

	public String getAdvertCategory() {
		return advertCategory;
	}

	public void setAdvertCategory(String advertCategory) {
		this.advertCategory = advertCategory;
	}

	public String getAdvertDesc() {
		return advertDesc;
	}

	public void setAdvertDesc(String advertDesc) {
		this.advertDesc = advertDesc;
	}

	

	
	
}