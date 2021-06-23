package com.backend.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.models.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{

	  @Query(value = "select * from auth.adress WHERE tradesmen_id = ?1", nativeQuery = true)
	  Address findAdressOfTradesmen(Long tradesmenId);
	
}
