package org.ap.summonerwar.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.summonerwar.bean.BuildBean;
import org.ap.summonerwar.storage.BuildData;
import org.ap.summonerwar.storage.BuildCollection;
import org.ap.web.internal.APWebException;
import java.util.List;
import java.util.ArrayList;
import javax.annotation.security.RolesAllowed;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.summonerwar.bean.MonsterConfigBean;
import org.ap.summonerwar.storage.MonsterConfigData;
import org.ap.summonerwar.storage.MonsterConfigCollection;
import static com.mongodb.client.model.Filters.*;

/* This class was auto-generated by the JavaWriter */
@Path("/builds")
public class BuildServlet extends APServletBase {

	public static final String PATH = "/builds";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getBuilds(@Context SecurityContext sc) {
		try {
			List<BuildData> datas = BuildCollection.getAll();
			
			List<BuildBean> beanList = new ArrayList<BuildBean>();
			for (BuildData data : datas) {
				BuildBean bean = new BuildBean();
				bean.userId = data.getUserId();
				bean.name = data.getName();
				bean.state = data.getState();
				bean.id = data.getId();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new BuildBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response postBuild(@Context SecurityContext sc, BuildBean buildBean) {
		try {
			BuildData data = new BuildData();
			data.setId(UUIDGenerator.nextId());
			data.setUserId(buildBean.userId);
			data.setName(buildBean.name);
			data.setState(buildBean.state);
			BuildCollection.create(data);
			return Response.status(Status.CREATED).entity("{\"id\": \"" + data.id + "\"}").build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{buildId}")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getBuild(@Context SecurityContext sc, @PathParam("buildId") final String buildId) {
		try {
			BuildData data = BuildCollection.getById(buildId);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			BuildBean bean = new BuildBean();
			bean.userId = data.getUserId();
			bean.name = data.getName();
			bean.state = data.getState();
			bean.id = data.getId();
			
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{buildId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response putBuild(@Context SecurityContext sc, @PathParam("buildId") final String buildId, BuildBean buildBean) {
		try {
			// Get actual data object
			BuildData data = BuildCollection.getById(buildId);
			// Check data exists
			if (data == null) {
				throw new APWebException("build not found", "AP_BUILD_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setUserId(buildBean.userId);
			data.setName(buildBean.name);
			data.setState(buildBean.state);
			// Store the updated data object
			BuildCollection.updateNull(data);
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{buildId}")
	@RolesAllowed("user")
	public Response deleteBuild(@Context SecurityContext sc, @PathParam("buildId") final String buildId) {
		try {
			// Try to delete the entity
			if (!BuildCollection.deleteById(buildId)) {
				throw new APWebException("build not found", "AP_BUILD_NOTFOUND", Status.BAD_REQUEST);
			}
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{buildId}/monstersconfig")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getBuildMonstersconfigs(@Context SecurityContext sc, @PathParam("buildId") final String buildId) {
		try {
			List<MonsterConfigData> datas = MonsterConfigCollection.get(and(eq("buildId", buildId)));
			
			List<MonsterConfigBean> beanList = new ArrayList<MonsterConfigBean>();
			for (MonsterConfigData data : datas) {
				MonsterConfigBean bean = new MonsterConfigBean();
				bean.monsterId = data.getMonsterId();
				bean.buildId = data.getBuildId();
				bean.requiredDef = data.getRequiredDef();
				bean.notationDef = data.getNotationDef();
				bean.set3 = data.getSet3();
				bean.requiredRes = data.getRequiredRes();
				bean.notationSpd = data.getNotationSpd();
				bean.set2 = data.getSet2();
				bean.requiredAcc = data.getRequiredAcc();
				bean.notationHp = data.getNotationHp();
				bean.requiredSpd = data.getRequiredSpd();
				bean.requiredCrate = data.getRequiredCrate();
				bean.requiredHp = data.getRequiredHp();
				bean.notationCrate = data.getNotationCrate();
				bean.notationAtk = data.getNotationAtk();
				bean.set1 = data.getSet1();
				bean.id = data.getId();
				bean.requiredAtk = data.getRequiredAtk();
				bean.requiredCdmg = data.getRequiredCdmg();
				bean.notationRes = data.getNotationRes();
				bean.notationCdmg = data.getNotationCdmg();
				bean.notationAcc = data.getNotationAcc();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new MonsterConfigBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
