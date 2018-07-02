package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import nl.hu.v1wac.firstapp.model.Country;


public class CountryPostgresDaoImpl implements CountryDao {
	private PostgresBaseDao pbd = new PostgresBaseDao();
	
	@Override
	public boolean save(Country country) {
		boolean isSaved = false;
		String query = "INSERT INTO country (code, iso3, name, continent, region, surfacearea, indepyear, population, lifeexpectancy, gnp, gnpold, localname, governmentform, headofstate, latitude,longitude, capital) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement statement = null;
		try (Connection con = pbd.getConnection()) {
			statement = con.prepareStatement(query);
			
			statement.setString(1, country.getCode());
			statement.setString(2,country.getIso3());
			statement.setString(3, country.getName());
			statement.setString(4, country.getCapital());
			statement.setString(5, country.getContinent());
			statement.setString(6, country.getRegion());
			statement.setDouble(7, country.getSurface());
			statement.setInt(8, country.getPopulation());
			statement.setString(9, country.getGovernment());
			statement.setDouble(10, country.getLatitude());
			statement.setDouble(11, country.getLongitude());
			
			statement.executeUpdate();
			statement.close();
			
			isSaved = true;
		} catch(SQLException ex) {
			ex.printStackTrace();
			isSaved = false;
			
		}
		return isSaved;
	}

	@Override
	public List<Country> findAll() {
		List<Country> countriesLijst = new ArrayList<Country>();
		Country country = null;
		
		try(Connection con = pbd.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM country");
			
			while (rs.next()) {
				country = new Country(rs.getString("CODE"), rs.getString("ISO3"), rs.getString("NAME"),rs.getString("CAPITAL"),rs.getString("CONTINENT"),rs.getString("REGION"),rs.getDouble("SURFACE"),rs.getInt("POPULATION"), rs.getString("GOVERNMENT"),rs.getDouble("LATITUDE"),rs.getDouble("LONGITUDE"));
				countriesLijst.add(country);
				
			}
			rs.close();
			stmt.close();
		}		
			 catch (Exception e) {
					System.out.println(e);
				} 
				return countriesLijst;
			}

	@Override
	public Country findByCode(String code) {
		Country country = null;
		
	try(Connection con = pbd.getConnection()) {	
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery("SELECT * FROM COUNTRY WHERE code = " + code);
		
		while (rs.next()) {
			country = new Country(rs.getString("CODE"), rs.getString("ISO3"), rs.getString("NAME"),rs.getString("CAPITAL"),rs.getString("CONTINENT"),rs.getString("REGION"),rs.getDouble("SURFACE"),rs.getInt("POPULATION"), rs.getString("GOVERNMENT"),rs.getDouble("LATITUDE"),rs.getDouble("LONGITUDE"));
			
		}
		
		rs.close();
		stmt.close();		
	}		
	 catch (Exception e) {
			System.out.println(e);
		} 
		return country;
	}

	@Override
	public List<Country> find10LargestPopulations() {
		List<Country> countriesLijst = new ArrayList<Country>();
		Country country = null;
		
		try(Connection con = pbd.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM country order by population DESC LIMIT 10");
			
			while (rs.next()) {
				country = new Country(rs.getString("CODE"), rs.getString("ISO3"), rs.getString("NAME"),rs.getString("CAPITAL"),rs.getString("CONTINENT"),rs.getString("REGION"),rs.getDouble("SURFACE"),rs.getInt("POPULATION"), rs.getString("GOVERNMENT"),rs.getDouble("LATITUDE"),rs.getDouble("LONGITUDE"));
				countriesLijst.add(country);
				
			}
			rs.close();
			stmt.close();
		}		
			 catch (Exception e) {
					System.out.println(e);
				} 
				return countriesLijst;
	}

	@Override
	public List<Country> find10LargestSurfaces() {
		List<Country> countriesLijst = new ArrayList<Country>();
		Country country = null;
		
		try(Connection con = pbd.getConnection()) {
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM country order by surface DESC LIMIT 10");
			
			while (rs.next()) {
				country = new Country(rs.getString("CODE"), rs.getString("ISO3"), rs.getString("NAME"),rs.getString("CAPITAL"),rs.getString("CONTINENT"),rs.getString("REGION"),rs.getDouble("SURFACE"),rs.getInt("POPULATION"), rs.getString("GOVERNMENT"),rs.getDouble("LATITUDE"),rs.getDouble("LONGITUDE"));
				countriesLijst.add(country);
				
			}
			rs.close();
			stmt.close();
		}		
			 catch (Exception e) {
					System.out.println(e);
				} 
				return countriesLijst;
	}

	@Override
	public boolean update(Country country) {
		boolean isUpdated = false;
		
		String s = "UPDATE COUNTRY SET code = ? , iso3 = ?, name = ?, capital = ?, continent = ? ,region = ? , surface = ?, population = ? , goverment = ? , latitude = ? , longitude = ? WHERE code = ?";
		
		try(Connection con = pbd.getConnection()){
		PreparedStatement pstmt = con.prepareStatement(s);
		pstmt.setString(1, country.getCode());
		pstmt.setString(2,country.getIso3());
		pstmt.setString(3, country.getName());
		pstmt.setString(4, country.getCapital());
		pstmt.setString(5, country.getContinent());
		pstmt.setString(6, country.getRegion());
		pstmt.setDouble(7, country.getSurface());
		pstmt.setInt(8, country.getPopulation());
		pstmt.setString(9, country.getGovernment());
		pstmt.setDouble(10, country.getLatitude());
		pstmt.setDouble(11, country.getLongitude());
		
		
		pstmt.executeUpdate();
		pstmt.close();
		
		isUpdated = true;
		
	}catch(SQLException ex) {
		ex.printStackTrace();
		isUpdated = false;
		
	}
	return isUpdated;
}
		
	

	@Override
	public boolean delete(Country country) {
	boolean isDeleted = false;
		String s = "DELETE FROM country WHERE code = ?";
		try(Connection con = pbd.getConnection()){
			PreparedStatement stmt = con.prepareStatement(s);
			stmt.setString(1, country.getCode());
		
			stmt.executeUpdate();
			stmt.close();
			isDeleted = true;
		
		
		}catch(SQLException ex) {
			ex.printStackTrace();
			isDeleted = false;
			
		}
		return isDeleted;
	}
}

