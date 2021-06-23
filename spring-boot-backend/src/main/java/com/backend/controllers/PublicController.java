package com.backend.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.models.Address;
import com.backend.models.Advert;
import com.backend.models.User;
import com.backend.repository.AddressRepository;
import com.backend.repository.AdvertRepository;
import com.backend.repository.UserRepository;




@CrossOrigin(origins = "*", maxAge = 3600)
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/test")
public class PublicController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AdvertRepository advertRepository;
	
	@Autowired
	AddressRepository adressRepository;
	
		@GetMapping("/kur")
	public String kurBilgileri() {


		String url = "https://www.bloomberght.com/doviz/dolar";
			try {
				String returnStr="";
				int counter=0;
				double dolar=0;
				Document doc = Jsoup.connect(url).get();
				Elements elements= doc.getElementsByClass("value LastPrice");//burada ilan sayısı çekiliyor
				for (Element element : elements) {
					  System.out.println( element.text().toString());
					  if(counter==1)
					  {
						  returnStr+="Dolar:"+element.text().toString();
						  String str[]=element.text().toString().split(",");
						   dolar = Double.parseDouble(str[0]+str[1]);
						   dolar=dolar/10000;
					  }
					  else if(counter==2)
					  {
						  returnStr+=" Euro:"+element.text().toString();

					  }
					  else if(counter==5)
					  {
						  String str[]=element.text().toString().split(",");
						  double ons = Double.parseDouble(str[0]);
						  ons=ons*1000;
						  double gold=(ons*dolar)/31.10;
						  String strGold=""; 
						  String strG=String.valueOf(gold);  

						  for (int i = 0; i < 8; i++) {
							if(strG.charAt(i)=='.')
								strGold+=",";
							else
								strGold+=strG.charAt(i);
						  }

						  returnStr+=" Altın:"+strGold;
					  }
					  counter++;
				}
				
				System.out.println(returnStr);
				return returnStr;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			  System.out.println( "burak");

	
			  return "geldi";
	}
	
	@GetMapping("/allrekscontain/{contain}")
	public ArrayList<Advert> getAllAdvertContain(@PathVariable String contain)
	{
	return (ArrayList<Advert>)advertRepository.searchByCategoryContain(contain);
	}
	
	@GetMapping("/alluserscontain/{contain}")
	public ArrayList<User> getAllUserContain(@PathVariable String contain)
	{
	return (ArrayList<User>)userRepository.searchByCategoryContain(contain);
	}
	
	@GetMapping("/allreks")
	public ArrayList<Advert> getAllAdverts()
	{
		
		return (ArrayList<Advert>)advertRepository.findAll();
	}
	
	@GetMapping("/alltradesmen")
	public ArrayList<User> getAllTradesmens()
	{
		
		return (ArrayList<User>)userRepository.findAll();
	}
	
	// get employee by id rest api
	@GetMapping("/tradesmens/{id}")
	public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id)
	{
		Optional<User> tradesmen=userRepository.findById(id);
				//.orElseThrow(() -> new ResourceNotFoundException("Tradesmen not exist with id:"+id));
		return ResponseEntity.ok(tradesmen);
	}

	// get adress by tradesmen id rest api
	@GetMapping("/address/{id}")
	public ResponseEntity<Address> getAdressByTradesmenId(@PathVariable Long id)
	{
		Address address=adressRepository.findAdressOfTradesmen(id);
				//.orElseThrow(() -> new ResourceNotFoundException("Tradesmen not exist with id:"+id));
		return ResponseEntity.ok(address);
	}
	
	
	// get employee by id rest api
	@GetMapping("/rek/{id}")
	public ResponseEntity<Optional<Advert>> getAdvertById(@PathVariable Long id)
	{
		Optional<Advert> advert=advertRepository.findById(id);
				//.orElseThrow(() -> new ResourceNotFoundException("Tradesmen not exist with id:"+id));
		return ResponseEntity.ok(advert);
	}
	
	
	// get employee by id rest api
	@GetMapping("/rektradesmenid/{id}")
	public ArrayList<Advert> getAdvertByTradesmenId(@PathVariable Long id)
	{
		return advertRepository.findAllAdvertsOfTradesmen(id);
	}
	
	@GetMapping("/all")
	public String allAccess() {
		//burda esnaf listesi dönecek
		return "Esnaf Listesi";
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
