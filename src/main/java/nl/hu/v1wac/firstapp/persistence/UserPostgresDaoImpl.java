package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import nl.hu.v1wac.firstapp.model.Country;

public class UserPostgresDaoImpl implements UserDao{
	private PostgresBaseDao pbd = new PostgresBaseDao();

	@Override
	public String findRoleForUser(String name, String pass) {
		String role = null;
		
		try(Connection con = pbd.getConnection()) {	
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT role FROM useraccount WHERE username = '" + name  + "' AND password = '" + pass + "'");
			
			while (rs.next()) {
				role = rs.getString("role");
			}
			
			rs.close();
			stmt.close();		
		}		
		 catch (Exception e) {
				System.out.println(e);
				role = null;
				
			} 
			return role;
	}

}
