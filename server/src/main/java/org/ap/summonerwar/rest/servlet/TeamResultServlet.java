package org.ap.summonerwar.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.summonerwar.bean.TeamResultBean;
import org.ap.summonerwar.storage.TeamResultData;
import org.ap.summonerwar.storage.TeamResultCollection;
import org.ap.web.internal.APWebException;
import java.util.List;
import java.util.ArrayList;
import javax.annotation.security.RolesAllowed;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;

/* This class was auto-generated by the JavaWriter */
@Path("/teamresult")
public class TeamResultServlet extends APServletBase {

	public static final String PATH = "/teamresult";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getTeamresults(@Context SecurityContext sc) {
		try {
			List<TeamResultData> datas = TeamResultCollection.getAll();
			
			List<TeamResultBean> beanList = new ArrayList<TeamResultBean>();
			for (TeamResultData data : datas) {
				TeamResultBean bean = new TeamResultBean();
				bean.buildResultId = data.getBuildResultId();
				bean.userId = data.getUserId();
				bean.eval = data.getEval();
				bean.id = data.getId();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new TeamResultBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response postTeamresult(@Context SecurityContext sc, TeamResultBean teamResultBean) {
		try {
			TeamResultData data = new TeamResultData();
			data.setId(UUIDGenerator.nextId());
			data.setBuildResultId(teamResultBean.buildResultId);
			data.setUserId(teamResultBean.userId);
			data.setEval(teamResultBean.eval);
			TeamResultCollection.create(data);
			return Response.status(Status.CREATED).entity("{\"id\": \"" + data.id + "\"}").build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{teamResultId}")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getTeamresult(@Context SecurityContext sc, @PathParam("teamResultId") final String teamResultId) {
		try {
			TeamResultData data = TeamResultCollection.getById(teamResultId);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			TeamResultBean bean = new TeamResultBean();
			bean.buildResultId = data.getBuildResultId();
			bean.userId = data.getUserId();
			bean.eval = data.getEval();
			bean.id = data.getId();
			
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{teamResultId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response putTeamresult(@Context SecurityContext sc, @PathParam("teamResultId") final String teamResultId, TeamResultBean teamResultBean) {
		try {
			// Get actual data object
			TeamResultData data = TeamResultCollection.getById(teamResultId);
			// Check data exists
			if (data == null) {
				throw new APWebException("teamResult not found", "AP_TEAMRESULT_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setBuildResultId(teamResultBean.buildResultId);
			data.setUserId(teamResultBean.userId);
			data.setEval(teamResultBean.eval);
			// Store the updated data object
			TeamResultCollection.updateNull(data);
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{teamResultId}")
	@RolesAllowed("user")
	public Response deleteTeamresult(@Context SecurityContext sc, @PathParam("teamResultId") final String teamResultId) {
		try {
			// Try to delete the entity
			if (!TeamResultCollection.deleteById(teamResultId)) {
				throw new APWebException("teamResult not found", "AP_TEAMRESULT_NOTFOUND", Status.BAD_REQUEST);
			}
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}