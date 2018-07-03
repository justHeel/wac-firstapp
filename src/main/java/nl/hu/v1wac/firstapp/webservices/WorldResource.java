package nl.hu.v1wac.firstapp.webservices;

import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import nl.hu.v1wac.firstapp.model.Country;
import nl.hu.v1wac.firstapp.model.ServiceProvider;
import nl.hu.v1wac.firstapp.model.WorldService;

@Path("/countries")
public class WorldResource {
	
	@GET
	@Produces("application/json")
	public String getCountries() {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		
		for(Country countryVar : service.getAllCountries()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("code", countryVar.getCode());
			job.add("iso3", countryVar.getIso3());
			job.add("name", countryVar.getName());
			job.add("capital", countryVar.getCapital());
			job.add("continent", countryVar.getContinent());
			job.add("region", countryVar.getRegion());
			job.add("surface", countryVar.getSurface());
			job.add("population", countryVar.getPopulation());
			job.add("government", countryVar.getGovernment());
			job.add("latitude", countryVar.getLatitude());
			job.add("longitude", countryVar.getLongitude());
			
			jab.add(job);
		}
		
		JsonArray array = jab.build();
		return array.toString();
		}
	
	@GET
	@Path("{code}")
	@Produces("application/json")
	public String getCountryInfo(@PathParam("code") String code) {
		WorldService service = ServiceProvider.getWorldService();
		Country countryVar = service.getCountryByCode(code);
		
		JsonObjectBuilder job = Json.createObjectBuilder();
		job.add("code", countryVar.getCode());
		job.add("iso3", countryVar.getIso3());
		job.add("name", countryVar.getName());
		job.add("capital", countryVar.getCapital());
		job.add("continent", countryVar.getContinent());
		job.add("region", countryVar.getRegion());
		job.add("surface", countryVar.getSurface());
		job.add("population", countryVar.getPopulation());
		job.add("government", countryVar.getGovernment());
		job.add("latitude", countryVar.getLatitude());
		job.add("longitude", countryVar.getLongitude());
		
		return job.build().toString();
		

		
	}
	
	 @RolesAllowed("user")
	 @DELETE
	 @Path("delete/{code}")
	 @Produces("appslication/json")
	  public Response deleteCountry(@PathParam("code") String code) {
		 WorldService service = ServiceProvider.getWorldService();
	    if (!service.deleteCountry(code)) {
	      return Response.status(404).build();
	    }

	    return Response.ok().build();
	  }
	
	@GET
	@Path("/largestsurfaces")
	@Produces("application/json")
	public String getLargestSurfaces() {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		
		for(Country countryVar : service.get10LargestPopulations()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("code", countryVar.getCode());
			job.add("name", countryVar.getName());
			job.add("surface", countryVar.getSurface());
			
			jab.add(job);
			
		}
		
		JsonArray array = jab.build();
		return array.toString();
		}
	
	@GET
	@Path("/largestpopulations")
	@Produces("application/json")
	public String getLargestPopulations() {
			WorldService service = ServiceProvider.getWorldService();
			JsonArrayBuilder jab = Json.createArrayBuilder();
			
			for(Country countryVar : service.get10LargestPopulations()) {
				JsonObjectBuilder job = Json.createObjectBuilder();
				job.add("code", countryVar.getCode());
				job.add("name", countryVar.getName());
				job.add("population", countryVar.getPopulation());
				
				jab.add(job);
				
			}
			
			JsonArray array = jab.build();
			return array.toString();
			}
		
		
}

