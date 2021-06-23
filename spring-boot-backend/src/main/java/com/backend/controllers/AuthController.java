package com.backend.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.models.Address;
import com.backend.models.Advert;
import com.backend.models.ERole;
import com.backend.models.Role;
import com.backend.models.User;
import com.backend.repository.AddressRepository;
import com.backend.repository.AdvertRepository;
import com.backend.repository.RoleRepository;
import com.backend.repository.UserRepository;
import com.backend.request.LoginRequest;
import com.backend.request.SignupRequest;
import com.backend.response.JwtResponse;
import com.backend.response.MessageResponse;
import com.backend.security.jwt.JwtUtils;
import com.backend.security.services.UserDetailsImpl;


@CrossOrigin(origins = "*", maxAge = 3600)
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	AddressRepository adressRepository;
	
	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	
	@Autowired
	AdvertRepository advertRepository;
	
	//create advert
	@PostMapping("/ekrek")
	public Advert addAdvert(@RequestBody Advert advertToAdd){
	
		return advertRepository.save(advertToAdd);
	}
	
	//update employee rest api
		@PutMapping("/updaterek/{id}")
		public Advert updateAdvert(@PathVariable Long id,@RequestBody Advert advertDetail){
			
			Advert addToAdvert = new Advert(advertDetail.getTradesmenId(),advertDetail.getAdvertName(),
					advertDetail.getAdvertCategory(),advertDetail.getAdvertDesc());
			addToAdvert.setId(id);
			
			return	advertRepository.save(addToAdvert);
		}
	
	//delete advert
	@DeleteMapping("/deleterek/{id}")
	public void deleteAdvert(@PathVariable Long id){
		advertRepository.deleteById(id);
	}

	
	//create advert
	@PostMapping("/adresek")
	public Address addAddress(@RequestBody Address adressToAdd){

		return adressRepository.save(adressToAdd);
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(),
												 userDetails.getTelNo(),
												 userDetails.getCategory(),
												 roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),
							 signUpRequest.getTelNo(),
							 signUpRequest.getCategory());

		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
