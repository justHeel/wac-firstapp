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
		
		
		return null;
	}

	public List<Country> get10LargestSurfaces() {
		
		
		return null;
	}
	
	public Country getCountryByCode(String code) {
		
		return null;
	}
}
