package nl.hu.v1wac.firstapp.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import nl.hu.v1wac.firstapp.persistence.CountryPostgresDaoImpl;

public class WorldService {
	CountryPostgresDaoImpl cpdi = new CountryPostgresDaoImpl();
	
	public WorldService() {
		
	}
	
	public List<Country> getAllCountries() {
		return cpdi.findAll();
	}
	
	public List<Country> get10LargestPopulations() {
		
		
		return cpdi.find10LargestPopulations();
	}

	public List<Country> get10LargestSurfaces() {
		
		
		return cpdi.find10LargestSurfaces();
	}
	
	public Country getCountryByCode(String code) {
		
		return cpdi.findByCode(code);
	}


	public boolean deleteCountry(Country country) {
		
		return cpdi.delete(country);
	}
}

