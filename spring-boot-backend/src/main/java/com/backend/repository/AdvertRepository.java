package com.backend.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.models.Advert;

@Repository
public interface AdvertRepository extends JpaRepository<Advert, Long>{

	ArrayList<Advert> findAll();


	  @Query(value = "select * from auth.advert WHERE tradesmen_id = ?1", nativeQuery = true)
	  ArrayList<Advert> findAllAdvertsOfTradesmen(Long tradesmenId);
	  
	  @Query(value = "select * from auth.advert WHERE tradesmen_id = ?1", nativeQuery = true)
	  ArrayList<Advert> deleteWithId(Long tradesmenId);
	  
	  @Query(value = "select * from auth.advert WHERE advert_category LIKE %?1%", nativeQuery = true)
	  ArrayList<Advert> searchByCategoryContain( String contain);
	  

	  
}
