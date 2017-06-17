package org.ap.summonerwar.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import org.bson.Document;
import javax.ws.rs.core.Response.*;
import org.ap.web.storage.Mongo;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.summonerwar.bean.RuneBean;
import java.util.ArrayList;
import java.util.List;
import com.mongodb.client.FindIterable;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.summonerwar.storage.RuneData;
import org.ap.summonerwar.storage.RuneCollection;
import static com.mongodb.client.model.Filters.*;

/* This class was auto-generated by the JavaWriter */
@Path("/runes")
public class RuneServlet extends APServletBase {

	public static final String PATH = "/runes";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getRunes(@Context SecurityContext sc) {
		try {
			FindIterable<Document> documents = Mongo.get().collection("rune").find();
			List<RuneBean> beanList = new ArrayList<RuneBean>();
			for (Document document: documents){
				RuneBean bean = new RuneBean();
				bean.lvl = document.getInteger("lvl");
				bean.set = document.getString("set");
				bean.stat4Type = document.getString("stat4Type");
				bean.star = document.getInteger("star");
				bean.stat2Type = document.getString("stat2Type");
				bean.statSub = document.getInteger("statSub");
				bean.statMain = document.getInteger("statMain");
				bean.stat4 = document.getInteger("stat4");
				bean.monster = document.getString("monster");
				bean.stat3Type = document.getString("stat3Type");
				bean.stat2 = document.getInteger("stat2");
				bean.pos = document.getString("pos");
				bean.stat3 = document.getInteger("stat3");
				bean.statSubType = document.getString("statSubType");
				bean.stat1 = document.getInteger("stat1");
				bean.stat1Type = document.getString("stat1Type");
				bean.statMainType = document.getString("statMainType");
				bean.id = document.getString("id");
				bean.user = document.getString("user");
				beanList.add(bean);
			}
			return Response.status(Status.OK).entity(beanList.toArray(new RuneBean[beanList.size()])).build();
			
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	public Response postRune(@Context SecurityContext sc, RuneBean runeBean) {
		try {
			RuneData data = new RuneData();
			data.id = UUIDGenerator.nextId();
			data.lvl = runeBean.lvl;
			data.set = runeBean.set;
			data.stat4Type = runeBean.stat4Type;
			data.star = runeBean.star;
			data.stat2Type = runeBean.stat2Type;
			data.statSub = runeBean.statSub;
			data.statMain = runeBean.statMain;
			data.stat4 = runeBean.stat4;
			data.monster = runeBean.monster;
			data.stat3Type = runeBean.stat3Type;
			data.stat2 = runeBean.stat2;
			data.pos = runeBean.pos;
			data.stat3 = runeBean.stat3;
			data.statSubType = runeBean.statSubType;
			data.stat1 = runeBean.stat1;
			data.stat1Type = runeBean.stat1Type;
			data.statMainType = runeBean.statMainType;
			data.user = runeBean.user;
			RuneCollection.create(data);
			return Response.status(Status.CREATED).entity("{\"id\": \"" + data.id + "\"}").build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{id}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getRune(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			Document document = Mongo.get().collection("rune").find(and(eq("id", id))).first();
			if(document == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			RuneBean bean = new RuneBean();
			bean.lvl = document.getInteger("lvl");
			bean.set = document.getString("set");
			bean.stat4Type = document.getString("stat4Type");
			bean.star = document.getInteger("star");
			bean.stat2Type = document.getString("stat2Type");
			bean.statSub = document.getInteger("statSub");
			bean.statMain = document.getInteger("statMain");
			bean.stat4 = document.getInteger("stat4");
			bean.monster = document.getString("monster");
			bean.stat3Type = document.getString("stat3Type");
			bean.stat2 = document.getInteger("stat2");
			bean.pos = document.getString("pos");
			bean.stat3 = document.getInteger("stat3");
			bean.statSubType = document.getString("statSubType");
			bean.stat1 = document.getInteger("stat1");
			bean.stat1Type = document.getString("stat1Type");
			bean.statMainType = document.getString("statMainType");
			bean.id = document.getString("id");
			bean.user = document.getString("user");
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{id}")
	@Consumes({MediaType.APPLICATION_JSON})
	public Response putRune(@Context SecurityContext sc, @PathParam("id") final String id, RuneBean runeBean) {
		try {
			Document document = new Document();
			if(runeBean.lvl != null)
				document.append("lvl", runeBean.lvl);
			if(runeBean.set != null)
				document.append("set", runeBean.set);
			if(runeBean.stat4Type != null)
				document.append("stat4Type", runeBean.stat4Type);
			if(runeBean.star != null)
				document.append("star", runeBean.star);
			if(runeBean.stat2Type != null)
				document.append("stat2Type", runeBean.stat2Type);
			if(runeBean.statSub != null)
				document.append("statSub", runeBean.statSub);
			if(runeBean.statMain != null)
				document.append("statMain", runeBean.statMain);
			if(runeBean.stat4 != null)
				document.append("stat4", runeBean.stat4);
			if(runeBean.monster != null)
				document.append("monster", runeBean.monster);
			if(runeBean.stat3Type != null)
				document.append("stat3Type", runeBean.stat3Type);
			if(runeBean.stat2 != null)
				document.append("stat2", runeBean.stat2);
			if(runeBean.pos != null)
				document.append("pos", runeBean.pos);
			if(runeBean.stat3 != null)
				document.append("stat3", runeBean.stat3);
			if(runeBean.statSubType != null)
				document.append("statSubType", runeBean.statSubType);
			if(runeBean.stat1 != null)
				document.append("stat1", runeBean.stat1);
			if(runeBean.stat1Type != null)
				document.append("stat1Type", runeBean.stat1Type);
			if(runeBean.statMainType != null)
				document.append("statMainType", runeBean.statMainType);
			if(runeBean.id != null)
				document.append("id", runeBean.id);
			if(runeBean.user != null)
				document.append("user", runeBean.user);
			Document result = Mongo.get().collection("rune").findOneAndUpdate(and(eq("id", id)), new Document("$set", document));
			if(result == null)
				return Response.status(Status.NOT_FOUND).build();
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{id}")
	public Response deleteRune(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			if (RuneCollection.deleteById(id)) {
			return Response.status(Status.OK).build();
			}
				return Response.status(Status.NOT_FOUND).build();
			
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
