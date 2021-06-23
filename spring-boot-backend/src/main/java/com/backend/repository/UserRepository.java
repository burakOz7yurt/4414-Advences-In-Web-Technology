package com.backend.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.models.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	
	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
	
	ArrayList<User> findAll();

	  @Query(value = "select * from auth.users WHERE category LIKE %?1%", nativeQuery = true)
	  ArrayList<User> searchByCategoryContain( String contain);
	
}
