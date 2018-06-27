package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import nl.hu.v1wac.firstapp.model.Country;

public class CountryPostgresDaoImpl implements CountryDao {
	private PostgresBaseDao pbd = new PostgresBaseDao();
	
	@Override
	public boolean save(Country country) {
		boolean IsSaved = false;
		String query = "INSERT INTO country (code, iso3, name, continent, region, surfacearea, indepyear, population, lifeexpectancy, gnp, gnpold, localname, governmentform, headofstate, latitude,longitude, capital) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement statement = null;
		try (Connection con = pbd.getConnection()) {
			statement = con.prepareStatement(query);
			
			statement.setString(1, country.getCode());
			
			IsSaved = true;
		} catch(SQLException ex) {
			ex.printStackTrace();
			IsSaved = false;
			
		}
		return IsSaved;
	}

	@Override
	public List<Country> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Country findByCode(String code) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Country> find10LargestPopulations() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Country> find10LargestSurfaces() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean update(Country country) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean delete(Country country) {
		// TODO Auto-generated method stub
		return false;
	}

}
