package com.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

	@Entity
	@Table(name = "adress")
	public class Address {

		@Id
		@Column(name = "tradesmen_id")
		private Long tradesmenId;
		@Column(name = "province")
		private String province;
		@Column(name = "district")
		private String district;
		@Column(name = "neighborhood")
		private String neighborhood;
		@Column(name = "street")
		private String street;
		@Column(name = "door_no")
		private String doorNo;
		
		
		
		
		public Address() {
			super();
		}
		
		
		
		
		
		public Address(Long tradesmenId, String province, String district, String neighborhood, String street, String doorNo) {
			super();
			this.tradesmenId = tradesmenId;
			this.province = province;
			this.district = district;
			this.neighborhood = neighborhood;
			this.street = street;
			this.doorNo = doorNo;
		}




		public Long getTradesmenId() {
			return tradesmenId;
		}
		public void setTradesmenId(Long tradesmenId) {
			this.tradesmenId = tradesmenId;
		}
		public String getProvince() {
			return province;
		}
		public void setProvince(String province) {
			this.province = province;
		}
		public String getDistrict() {
			return district;
		}
		public void setDistrict(String district) {
			this.district = district;
		}
		public String getNeighborhood() {
			return neighborhood;
		}
		public void setNeighborhood(String neighborhood) {
			this.neighborhood = neighborhood;
		}
		
		
		
		public String getStreet() {
			return street;
		}





		public void setStreet(String street) {
			this.street = street;
		}





		public String getDoorNo() {
			return doorNo;
		}
		public void setDoorNo(String doorNo) {
			this.doorNo = doorNo;
		}	
		
		
		
}
