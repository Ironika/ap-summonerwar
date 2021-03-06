package org.ap.summonerwar.rest;

import org.ap.summonerwar.internal.EConfigProperties;
import org.ap.summonerwar.rest.filter.HeadersResponseFilter;
import org.ap.web.storage.Mongo;
import javax.ws.rs.ApplicationPath;
import java.io.IOException;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.ap.summonerwar.rest.filter.AuthorizationRequestFilter;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

/* This class was auto-generated by the JavaWriter */
@ApplicationPath("/rest")
public class APRestApplication extends ResourceConfig {

	public APRestApplication() {
		try {
			EConfigProperties.loadProperties();
		} catch (IOException e) {
			System.err.println(e);
		}
		
		packages("org.ap.summonerwar.rest");
		
		register(AuthorizationRequestFilter.class);
		register(RolesAllowedDynamicFeature.class);
		register(JacksonFeature.class);
		register(HeadersResponseFilter.class);
		register(MultiPartFeature.class);
		
		String host = EConfigProperties.DB_HOST.getValue();
		String port = EConfigProperties.DB_PORT.getValue();
		String name = EConfigProperties.DB_NAME.getValue();
		Mongo.setUp(host, port, name);
	}

}
